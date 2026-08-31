/** The renovation type — calculator step 1. */
export type ProjectType = 'full' | 'bathroom' | 'kitchen' | 'rooms' | 'other'

/** Property type — step 2. */
export type PropertyType = 'apartment' | 'house'

/** Location category — step 2. */
export type Location = 'budapest' | 'pest' | 'other'

/** Property status — step 2. */
export type PropertyStatus = 'empty' | 'occupied'

/** Work categories — step 3. */
export type WorkCategory =
  | 'demolition'
  | 'electrical'
  | 'plumbing'
  | 'painting'
  | 'tiling'
  | 'drywall'
  | 'sanitary'
  | 'kitchen-prep'
  | 'joinery'

/** Quality level — step 4. */
export type QualityLevel = 'basic' | 'standard' | 'premium'

/** Timing — step 5. */
export type Timing = 'asap' | 'in-1-3-months' | 'in-3-6-months' | 'planning'

/** The calculator's full configuration. */
export interface QuoteConfig {
  projectType: ProjectType | null
  propertyType: PropertyType | null
  /** Affected floor area, in m². */
  area: number | null
  location: Location | null
  propertyStatus: PropertyStatus | null
  works: WorkCategory[]
  quality: QualityLevel | null
  timing: Timing | null
}

export type ContactPreference = 'phone' | 'email'

export interface ContactInfo {
  name: string
  email: string
  phone: string
  preference: ContactPreference
  message: string
}

/** Price range (HUF). */
export interface PriceRange {
  min: number
  max: number
}

/** A single line in the estimate breakdown. */
export interface EstimateLine {
  id: string
  label: string
  range: PriceRange
  /** Work categories that make up the line. */
  works: WorkCategory[]
}

export interface EstimateResult {
  range: PriceRange
  durationWeeks: PriceRange
  lines: EstimateLine[]
  /** The floor area used in the calculation (m²). */
  effectiveArea: number
  /** Applied multipliers — for estimate transparency. */
  applied: {
    quality: { level: QualityLevel; multiplier: PriceRange }
    location: { key: Location; multiplier: number }
    propertyType: { key: PropertyType; multiplier: number }
    propertyStatus: { key: PropertyStatus; multiplier: number }
  }
}

/** Identifiers for the seven steps. */
export type StepId =
  | 'project'
  | 'property'
  | 'works'
  | 'quality'
  | 'timing'
  | 'estimate'
  | 'contact'

export interface StepDefinition {
  id: StepId
  /** Short label, e.g. for the mobile progress indicator. */
  label: string
  /** The step's main question. */
  heading: string
  /** What the mobile bottom bar shows while the step is incomplete. */
  incompleteHint: string
}
