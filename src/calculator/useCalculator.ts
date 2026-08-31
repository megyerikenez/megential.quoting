import { useContext } from 'react'
import { CalculatorContext, type CalculatorContextValue } from './CalculatorContext'

/** Calculator state and actions — only inside CalculatorProvider. */
export function useCalculator(): CalculatorContextValue {
  const ctx = useContext(CalculatorContext)
  if (!ctx) throw new Error('A useCalculator csak CalculatorProvider alatt használható.')
  return ctx
}
