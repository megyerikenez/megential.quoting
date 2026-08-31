import { PRICING, ROUNDING_STEP, WORK_GROUPS } from '../data/pricing'
import { getWork } from '../data/works'
import type {
  EstimateLine,
  EstimateResult,
  PriceRange,
  QuoteConfig,
} from '../types/calculator'

/**
 * Deterministic estimation engine.
 *
 * Identical configurations always produce identical results — no
 * randomness, no shared state. All rules live in the `PRICING` config.
 */

/** Whether the fields required for an estimate are present. */
export function canEstimate(config: QuoteConfig): config is QuoteConfig & {
  projectType: NonNullable<QuoteConfig['projectType']>
  area: number
  quality: NonNullable<QuoteConfig['quality']>
  works: NonNullable<QuoteConfig['works']>
} {
  return (
    config.projectType !== null &&
    config.area !== null &&
    config.quality !== null &&
    config.works.length > 0
  )
}

function roundDown(value: number): number {
  return Math.floor(value / ROUNDING_STEP) * ROUNDING_STEP
}

function roundUp(value: number): number {
  return Math.ceil(value / ROUNDING_STEP) * ROUNDING_STEP
}

function roundWeekDown(weeks: number): number {
  return Math.floor(weeks)
}

function roundWeekUp(weeks: number): number {
  return Math.ceil(weeks)
}

export function calculateEstimate(config: QuoteConfig): EstimateResult | null {
  if (!canEstimate(config)) return null

  const { projectType, area, quality, works } = config

  // Small rooms still produce a realistic amount: calculate with the
  // minimum area, which is also surfaced in the UI.
  const effectiveArea = Math.max(area, PRICING.minAreas[projectType])

  // Base + works, before multipliers.
  const base = PRICING.baseRates[projectType]
  const rawMin = base.min * effectiveArea + sumWorks(works, effectiveArea, 'min')
  const rawMax = base.max * effectiveArea + sumWorks(works, effectiveArea, 'max')

  // Multipliers.
  const qualityMult = PRICING.qualityMultipliers[quality]
  const locationMult = config.location ? PRICING.locationMultipliers[config.location] : 1
  const propertyTypeMult = config.propertyType
    ? PRICING.propertyTypeMultipliers[config.propertyType]
    : 1
  const statusMult = config.propertyStatus
    ? PRICING.propertyStatusMultipliers[config.propertyStatus]
    : 1

  const range: PriceRange = {
    min: roundDown(rawMin * qualityMult.min * locationMult * propertyTypeMult * statusMult),
    max: roundUp(rawMax * qualityMult.max * locationMult * propertyTypeMult * statusMult),
  }

  const durationWeeks = calculateDuration(config, effectiveArea)

  const lines = buildBreakdown(projectType, works, effectiveArea, range)

  return {
    range,
    durationWeeks,
    lines,
    effectiveArea,
    applied: {
      quality: { level: quality, multiplier: qualityMult },
      location: {
        key: config.location ?? 'budapest',
        multiplier: locationMult,
      },
      propertyType: {
        key: config.propertyType ?? 'apartment',
        multiplier: propertyTypeMult,
      },
      propertyStatus: {
        key: config.propertyStatus ?? 'empty',
        multiplier: statusMult,
      },
    },
  }
}

function sumWorks(works: QuoteConfig['works'], area: number, edge: 'min' | 'max'): number {
  return works.reduce((sum, id) => {
    const rate = PRICING.workRates[id]
    if (rate.perM2) return sum + rate.perM2[edge] * area
    if (rate.flat) return sum + rate.flat[edge]
    return sum
  }, 0)
}

function calculateDuration(
  config: QuoteConfig,
  effectiveArea: number,
): PriceRange {
  const base = PRICING.baseWeeks[config.projectType!]
  const workWeeks = config.works.reduce((sum, id) => sum + PRICING.workWeeks[id], 0)
  const areaWeeks = effectiveArea / PRICING.areaWeeksDivisor
  const total = base + workWeeks + areaWeeks

  return {
    min: roundWeekDown(total * 0.85),
    max: Math.max(roundWeekUp(total * 1.25), 1),
  }
}

function buildBreakdown(
  projectType: NonNullable<QuoteConfig['projectType']>,
  works: QuoteConfig['works'],
  effectiveArea: number,
  totalRange: PriceRange,
): EstimateLine[] {
  const lines: EstimateLine[] = []

  // Base line.
  const base = PRICING.baseRates[projectType]
  lines.push({
    id: 'base',
    label: 'Alapdíj — projektvezetés és általános munkálatok',
    range: {
      min: roundDown(base.min * effectiveArea),
      max: roundUp(base.max * effectiveArea),
    },
    works: [],
  })

  // Grouped work lines.
  for (const group of WORK_GROUPS) {
    const selected = group.works.filter((id) => works.includes(id))
    if (selected.length === 0) continue

    const range: PriceRange = { min: 0, max: 0 }
    for (const id of selected) {
      const rate = PRICING.workRates[id]
      if (rate.perM2) {
        range.min += rate.perM2.min * effectiveArea
        range.max += rate.perM2.max * effectiveArea
      }
      if (rate.flat) {
        range.min += rate.flat.min
        range.max += rate.flat.max
      }
    }

    lines.push({
      id: group.id,
      label: group.label,
      range: {
        min: roundDown(range.min),
        max: roundUp(range.max),
      },
      works: selected,
    })
  }

  // Line sums would not necessarily equal the rounded total, so lines are
  // scaled by the ratio of the total to the sum of the line midpoints,
  // keeping the breakdown additive. (Multipliers apply to the total;
  // lines are raw values.)
  const mid = (totalRange.min + totalRange.max) / 2
  const linesMid = lines.reduce((sum, l) => sum + (l.range.min + l.range.max) / 2, 0)
  const factor = mid / linesMid

  return lines.map((line) => ({
    ...line,
    range: {
      min: Math.round(line.range.min * factor),
      max: Math.round(line.range.max * factor),
    },
  }))
}

/** A line's share of the total (0–1), for the breakdown display. */
export function lineShare(line: EstimateLine, result: EstimateResult): number {
  const lineMid = (line.range.min + line.range.max) / 2
  const totalMid = (result.range.min + result.range.max) / 2
  return totalMid > 0 ? lineMid / totalMid : 0
}

/** Hungarian labels of the selected works — for the summary. */
export function worksSummary(works: QuoteConfig['works']): string {
  if (works.length === 0) return '—'
  if (works.length === 1) return getWork(works[0]).label
  return `${works.length} munkálat kiválasztva`
}
