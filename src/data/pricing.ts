import type {
  Location,
  PriceRange,
  ProjectType,
  PropertyStatus,
  PropertyType,
  QualityLevel,
  WorkCategory,
} from '../types/calculator'

/**
 * The estimate's central pricing configuration.
 *
 * Values reflect 2026 Budapest renovation market orders of magnitude,
 * for indicative purposes. Price calculation:
 *
 *   (base + selected works) × multipliers
 *
 * Multipliers: quality level, location, property type and status.
 */

export interface RateConfig {
  /** Base rate in HUF/m², per project type. */
  baseRates: Record<ProjectType, PriceRange>
  /** Per-work rate: per m² or a flat amount. */
  workRates: Record<WorkCategory, { perM2?: PriceRange; flat?: PriceRange }>
  /** Quality-level multipliers. */
  qualityMultipliers: Record<QualityLevel, PriceRange>
  /** Location multiplier (a simple constant across the range). */
  locationMultipliers: Record<Location, number>
  /** Property-type multiplier. */
  propertyTypeMultipliers: Record<PropertyType, number>
  /** Property-status multiplier. */
  propertyStatusMultipliers: Record<PropertyStatus, number>
  /** Minimum floor area used in the calculation (m²). */
  minAreas: Record<ProjectType, number>
  /** Base construction weeks per project type. */
  baseWeeks: Record<ProjectType, number>
  /** Additional weeks per selected work. */
  workWeeks: Record<WorkCategory, number>
  /** Area-based time factor: m² / areaWeeksDivisor. */
  areaWeeksDivisor: number
}

export const PRICING: RateConfig = {
  baseRates: {
    full: { min: 220_000, max: 275_000 },
    bathroom: { min: 380_000, max: 470_000 },
    kitchen: { min: 310_000, max: 390_000 },
    rooms: { min: 265_000, max: 330_000 },
    other: { min: 210_000, max: 270_000 },
  },

  workRates: {
    demolition: { perM2: { min: 18_000, max: 26_000 } },
    electrical: { perM2: { min: 30_000, max: 42_000 } },
    plumbing: { perM2: { min: 26_000, max: 38_000 } },
    painting: { perM2: { min: 12_000, max: 17_500 } },
    tiling: { perM2: { min: 26_000, max: 36_000 } },
    drywall: { perM2: { min: 15_000, max: 22_000 } },
    sanitary: { flat: { min: 320_000, max: 580_000 } },
    'kitchen-prep': { perM2: { min: 20_000, max: 30_000 } },
    joinery: { perM2: { min: 22_000, max: 32_000 } },
  },

  qualityMultipliers: {
    basic: { min: 0.8, max: 0.92 },
    standard: { min: 0.92, max: 1.15 },
    premium: { min: 1.2, max: 1.55 },
  },

  locationMultipliers: {
    budapest: 1,
    pest: 0.95,
    other: 0.9,
  },

  propertyTypeMultipliers: {
    apartment: 1,
    house: 1.07,
  },

  propertyStatusMultipliers: {
    empty: 1,
    occupied: 1.05,
  },

  minAreas: {
    full: 30,
    bathroom: 5,
    kitchen: 6,
    rooms: 12,
    other: 10,
  },

  baseWeeks: {
    full: 6,
    bathroom: 2,
    kitchen: 2.5,
    rooms: 2.5,
    other: 2,
  },

  workWeeks: {
    demolition: 0.5,
    electrical: 1,
    plumbing: 1,
    painting: 0.5,
    tiling: 1,
    drywall: 0.5,
    sanitary: 0.5,
    'kitchen-prep': 1,
    joinery: 1,
  },

  areaWeeksDivisor: 60,
}

/** Selected works grouped for display and the estimate. */
export const WORK_GROUPS: { id: string; label: string; works: WorkCategory[] }[] = [
  { id: 'demolition', label: 'Bontási munkák', works: ['demolition'] },
  { id: 'mechanical', label: 'Gépészet', works: ['plumbing', 'sanitary'] },
  { id: 'electrical', label: 'Villanyszerelés', works: ['electrical'] },
  { id: 'finishing', label: 'Felületképzés', works: ['painting', 'drywall'] },
  { id: 'tiling', label: 'Burkolás', works: ['tiling'] },
  { id: 'furnishing', label: 'Konyha és asztalos', works: ['kitchen-prep', 'joinery'] },
]

export const AREA_MIN = 4
export const AREA_MAX = 400

/** Rounding step for amounts (HUF). */
export const ROUNDING_STEP = 50_000
