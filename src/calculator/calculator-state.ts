import type { ServicePreset } from '../data/services'
import { isWorkAvailable, WORKS } from '../data/works'
import type { ContactInfo, QuoteConfig, WorkCategory } from '../types/calculator'

export interface CalculatorState {
  config: QuoteConfig
  contact: ContactInfo
  /** Current step index (0–6). */
  currentStep: number
  /** Furthest step the user has reached. */
  furthestStep: number
  submitted: boolean
  reference: string | null
}

export const EMPTY_CONFIG: QuoteConfig = {
  projectType: null,
  propertyType: null,
  area: null,
  location: null,
  propertyStatus: null,
  works: [],
  quality: null,
  timing: null,
}

export const EMPTY_CONTACT: ContactInfo = {
  name: '',
  email: '',
  phone: '',
  preference: 'phone',
  message: '',
}

export const INITIAL_STATE: CalculatorState = {
  config: EMPTY_CONFIG,
  contact: EMPTY_CONTACT,
  currentStep: 0,
  furthestStep: 0,
  submitted: false,
  reference: null,
}

export type CalculatorAction =
  | { type: 'setProjectType'; value: QuoteConfig['projectType'] }
  | { type: 'setPropertyType'; value: QuoteConfig['propertyType'] }
  | { type: 'setArea'; value: number | null }
  | { type: 'setLocation'; value: QuoteConfig['location'] }
  | { type: 'setPropertyStatus'; value: QuoteConfig['propertyStatus'] }
  | { type: 'toggleWork'; id: WorkCategory }
  | { type: 'setQuality'; value: QuoteConfig['quality'] }
  | { type: 'setTiming'; value: QuoteConfig['timing'] }
  | { type: 'setContact'; field: keyof ContactInfo; value: string }
  | { type: 'goToStep'; step: number }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'submit'; reference: string }
  | { type: 'reset' }
  | { type: 'seed'; preset: ServicePreset }

/**
 * When the project type changes, works that no longer apply are dropped —
 * all other selections remain untouched.
 */
function pruneWorksForProject(works: WorkCategory[], projectType: QuoteConfig['projectType']): WorkCategory[] {
  if (projectType === null) return works
  return works.filter((id) => {
    const work = WORKS.find((w) => w.id === id)
    return work ? isWorkAvailable(work, projectType) : false
  })
}

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'setProjectType':
      return {
        ...state,
        config: {
          ...state.config,
          projectType: action.value,
          works: pruneWorksForProject(state.config.works, action.value),
        },
      }
    case 'setPropertyType':
      return { ...state, config: { ...state.config, propertyType: action.value } }
    case 'setArea':
      return { ...state, config: { ...state.config, area: action.value } }
    case 'setLocation':
      return { ...state, config: { ...state.config, location: action.value } }
    case 'setPropertyStatus':
      return { ...state, config: { ...state.config, propertyStatus: action.value } }
    case 'toggleWork': {
      const has = state.config.works.includes(action.id)
      return {
        ...state,
        config: {
          ...state.config,
          works: has
            ? state.config.works.filter((id) => id !== action.id)
            : [...state.config.works, action.id],
        },
      }
    }
    case 'setQuality':
      return { ...state, config: { ...state.config, quality: action.value } }
    case 'setTiming':
      return { ...state, config: { ...state.config, timing: action.value } }
    case 'setContact':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } }
    case 'goToStep':
      return { ...state, currentStep: action.step }
    case 'next': {
      const step = Math.min(state.currentStep + 1, 6)
      return { ...state, currentStep: step, furthestStep: Math.max(state.furthestStep, step) }
    }
    case 'back':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) }
    case 'submit':
      return { ...state, submitted: true, reference: action.reference }
    case 'reset':
      return INITIAL_STATE
    case 'seed':
      return {
        ...INITIAL_STATE,
        config: {
          ...EMPTY_CONFIG,
          projectType: action.preset.projectType,
          works: action.preset.works.filter((id) => {
            const work = WORKS.find((w) => w.id === id)
            return work ? isWorkAvailable(work, action.preset.projectType) : false
          }),
        },
      }
    default:
      return state
  }
}
