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
 * Values reflect 2026 Budapest renovation market orders of magnitude, for
 * indicative purposes. Price calculation:
 *
 *   (base fee + selected works) × multipliers
 *
 * Multipliers: quality level, location, property type and status.
 *
 * Scope rules: works are priced per affected m² (except flat items like
 * sanitary fittings). To keep both small and oversized rooms realistic,
 * the effective area is clamped between `minAreas` and `maxAreas` per
 * project type — a kitchen never prices like a whole apartment.
 */

export interface RateConfig {
  /** Flat base fee (project management and general labour) per project type. */
  baseFees: Record<ProjectType, PriceRange>
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
  /** Maximum floor area used in the calculation (m²). */
  maxAreas: Record<ProjectType, number>
  /** Base construction weeks per project type. */
  baseWeeks: Record<ProjectType, number>
  /** Additional weeks per selected work. */
  workWeeks: Record<WorkCategory, number>
  /** Area-based time factor: m² / areaWeeksDivisor. */
  areaWeeksDivisor: number
}

export const PRICING: RateConfig = {
  baseFees: {
    full: { min: 1_200_000, max: 2_000_000 },
    bathroom: { min: 350_000, max: 550_000 },
    kitchen: { min: 250_000, max: 450_000 },
    rooms: { min: 250_000, max: 450_000 },
    other: { min: 150_000, max: 300_000 },
  },

  workRates: {
    demolition: { perM2: { min: 15_000, max: 25_000 } },
    electrical: { perM2: { min: 28_000, max: 45_000 } },
    plumbing: { perM2: { min: 25_000, max: 40_000 } },
    painting: { perM2: { min: 8_000, max: 15_000 } },
    tiling: { perM2: { min: 20_000, max: 35_000 } },
    drywall: { perM2: { min: 12_000, max: 20_000 } },
    sanitary: { flat: { min: 250_000, max: 450_000 } },
    'kitchen-prep': { perM2: { min: 15_000, max: 25_000 } },
    joinery: { perM2: { min: 15_000, max: 28_000 } },
  },

  qualityMultipliers: {
    basic: { min: 0.85, max: 1 },
    standard: { min: 1, max: 1.22 },
    premium: { min: 1.25, max: 1.45 },
  },

  locationMultipliers: {
    budapest: 1,
    pest: 0.96,
    other: 0.92,
  },

  propertyTypeMultipliers: {
    apartment: 1,
    house: 1.06,
  },

  propertyStatusMultipliers: {
    empty: 1,
    occupied: 1.04,
  },

  minAreas: {
    full: 30,
    bathroom: 5,
    kitchen: 6,
    rooms: 12,
    other: 10,
  },

  maxAreas: {
    full: 150,
    bathroom: 12,
    kitchen: 15,
    rooms: 150,
    other: 150,
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
