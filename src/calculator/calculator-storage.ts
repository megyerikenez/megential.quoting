import { ALL_WORK_IDS } from '../data/works'
import type {
  ContactInfo,
  Location,
  ProjectType,
  PropertyStatus,
  PropertyType,
  QualityLevel,
  QuoteConfig,
  Timing,
  WorkCategory,
} from '../types/calculator'
import type { CalculatorState } from './calculator-state'
import { INITIAL_STATE } from './calculator-state'

const STORAGE_KEY = 'mertek:calculator:v1'

export interface LoadedState {
  state: CalculatorState
  /** Whether a saved state existed (used to decide about resuming). */
  existed: boolean
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function oneOf<T extends string>(value: unknown, options: readonly T[]): T | null {
  return typeof value === 'string' && (options as readonly string[]).includes(value)
    ? (value as T)
    : null
}

/** Validates a saved state — unknown formats are discarded. */
function sanitize(value: unknown): CalculatorState | null {
  if (!isRecord(value)) return null
  const configRaw = value.config
  const contactRaw = value.contact
  if (!isRecord(configRaw) || !isRecord(contactRaw)) return null

  const config: QuoteConfig = {
    projectType: oneOf<ProjectType>(configRaw.projectType, [
      'full',
      'bathroom',
      'kitchen',
      'rooms',
      'other',
    ]),
    propertyType: oneOf<PropertyType>(configRaw.propertyType, ['apartment', 'house']),
    area: typeof configRaw.area === 'number' ? configRaw.area : null,
    location: oneOf<Location>(configRaw.location, ['budapest', 'pest', 'other']),
    propertyStatus: oneOf<PropertyStatus>(configRaw.propertyStatus, ['empty', 'occupied']),
    works: Array.isArray(configRaw.works)
      ? configRaw.works.filter((w): w is WorkCategory =>
          ALL_WORK_IDS.includes(w as WorkCategory),
        )
      : [],
    quality: oneOf<QualityLevel>(configRaw.quality, ['basic', 'standard', 'premium']),
    timing: oneOf<Timing>(configRaw.timing, ['asap', 'in-1-3-months', 'in-3-6-months', 'planning']),
  }

  const contact: ContactInfo = {
    name: typeof contactRaw.name === 'string' ? contactRaw.name : '',
    email: typeof contactRaw.email === 'string' ? contactRaw.email : '',
    phone: typeof contactRaw.phone === 'string' ? contactRaw.phone : '',
    preference: contactRaw.preference === 'email' ? 'email' : 'phone',
    message: typeof contactRaw.message === 'string' ? contactRaw.message : '',
  }

  return {
    config,
    contact,
    currentStep:
      typeof value.currentStep === 'number' && value.currentStep >= 0 && value.currentStep <= 6
        ? value.currentStep
        : 0,
    furthestStep:
      typeof value.furthestStep === 'number' &&
      value.furthestStep >= 0 &&
      value.furthestStep <= 6
        ? value.furthestStep
        : 0,
    submitted: typeof value.submitted === 'boolean' ? value.submitted : false,
    reference: typeof value.reference === 'string' ? value.reference : null,
  }
}

export function loadState(): LoadedState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { state: INITIAL_STATE, existed: false }
    const parsed = JSON.parse(raw) as unknown
    const state = sanitize(parsed)
    return state ? { state, existed: true } : { state: INITIAL_STATE, existed: false }
  } catch {
    return { state: INITIAL_STATE, existed: false }
  }
}

export function saveState(state: CalculatorState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // The demo keeps working even if the browser blocks storage.
  }
}
