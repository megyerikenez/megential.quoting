import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from 'react'
import { STEPS, isStepComplete } from '../data/steps'
import type { ServicePreset } from '../data/services'
import { calculateEstimate, canEstimate } from '../lib/estimate'
import { generateReference } from '../lib/reference'
import type { EstimateResult } from '../types/calculator'
import type { CalculatorAction, CalculatorState } from './calculator-state'
import { INITIAL_STATE, calculatorReducer } from './calculator-state'
import { loadState, saveState } from './calculator-storage'

export interface CalculatorContextValue {
  state: CalculatorState
  dispatch: Dispatch<CalculatorAction>
  estimate: EstimateResult | null
  /** Current step index. */
  stepIndex: number
  /** Whether the user can advance from the current step. */
  canGoNext: boolean
  /** Whether jumping to a step is allowed (all prior steps complete). */
  canNavigateTo: (step: number) => boolean
  goNext: () => void
  goBack: () => void
  goTo: (step: number) => void
  /** Submits the lead form and generates a reference. */
  submitLead: () => void
  reset: () => void
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null)

interface CalculatorProviderProps {
  /** Service preset — always wins over any stored session. */
  preset?: ServicePreset
  children: ReactNode
}

export function CalculatorProvider({ preset, children }: CalculatorProviderProps) {
  // A service preset always overrides any earlier project — choosing a
  // service starts a fresh estimate instead of resuming the old session.
  const [state, dispatch] = useReducer(
    calculatorReducer,
    preset,
    (p: ServicePreset | undefined) => {
      if (p) return calculatorReducer(INITIAL_STATE, { type: 'seed', preset: p })
      return loadState().state
    },
  )

  // If the preset changes while already inside the calculator route
  // (e.g. via a direct link), apply it too.
  const appliedPreset = useRef(preset)
  useEffect(() => {
    if (preset && preset !== appliedPreset.current) {
      appliedPreset.current = preset
      dispatch({ type: 'seed', preset })
    }
  }, [preset])

  useEffect(() => {
    saveState(state)
  }, [state])

  const estimate = useMemo(
    () => (canEstimate(state.config) ? calculateEstimate(state.config) : null),
    [state.config],
  )

  const canGoNext = isStepComplete(state.currentStep, state.config)

  const canNavigateTo = useCallback(
    (step: number) => {
      if (step > state.furthestStep) return false
      for (let i = 0; i < step; i++) {
        if (!isStepComplete(i, state.config)) return false
      }
      return true
    },
    [state.furthestStep, state.config],
  )

  const goNext = useCallback(() => dispatch({ type: 'next' }), [])
  const goBack = useCallback(() => dispatch({ type: 'back' }), [])
  const goTo = useCallback(
    (step: number) => {
      const clamped = Math.min(Math.max(step, 0), STEPS.length - 1)
      dispatch({ type: 'goToStep', step: clamped })
    },
    [],
  )

  const submitLead = useCallback(() => {
    const result = canEstimate(state.config) ? calculateEstimate(state.config) : null
    const reference = generateReference({
      name: state.contact.name,
      email: state.contact.email,
      min: result?.range.min ?? 0,
      max: result?.range.max ?? 0,
    })
    dispatch({ type: 'submit', reference })
  }, [state.config, state.contact])

  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  const value = useMemo<CalculatorContextValue>(
    () => ({
      state,
      dispatch,
      estimate,
      stepIndex: state.currentStep,
      canGoNext,
      canNavigateTo,
      goNext,
      goBack,
      goTo,
      submitLead,
      reset,
    }),
    [state, dispatch, estimate, canGoNext, canNavigateTo, goNext, goBack, goTo, submitLead, reset],
  )

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>
}

export { CalculatorContext }
