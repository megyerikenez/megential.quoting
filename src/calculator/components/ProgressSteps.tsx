import { STEPS, isStepComplete } from '../../data/steps'
import { CheckIcon } from '../../components/icons'
import type { QuoteConfig } from '../../types/calculator'

interface StepRailProps {
  current: number
  config: QuoteConfig
  /** Whether jumping to a step is allowed. */
  canNavigateTo: (step: number) => boolean
  onNavigate: (step: number) => void
}

/** Desktop step rail: all seven steps with states and jump navigation. */
export function StepRail({ current, config, canNavigateTo, onNavigate }: StepRailProps) {
  return (
    <nav aria-label="A kalkulátor lépései">
      <ol className="flex items-start justify-between gap-2">
        {STEPS.map((step, i) => {
          const complete = isStepComplete(i, config) && i !== current
          const isCurrent = i === current
          const clickable = canNavigateTo(i) && i !== current

          return (
            <li key={step.id} className="flex min-w-0 flex-1 flex-col">
              <button
                type="button"
                onClick={() => clickable && onNavigate(i)}
                disabled={!clickable}
                aria-current={isCurrent ? 'step' : undefined}
                className={`group flex items-center gap-2 text-left ${
                  clickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-[11px] transition-colors duration-200 ${
                    isCurrent
                      ? 'border-ink bg-ink text-paper'
                      : complete
                        ? 'border-line-strong bg-paper text-ink group-hover:border-ink'
                        : 'border-line bg-paper text-ink-faint'
                  }`}
                  aria-hidden="true"
                >
                  {complete && !isCurrent ? <CheckIcon className="h-3 w-3" /> : i + 1}
                </span>
                <span
                  className={`truncate text-[12px] tracking-[0.02em] ${
                    isCurrent
                      ? 'font-semibold text-ink'
                      : clickable
                        ? 'font-medium text-ink-soft group-hover:text-ink'
                        : 'text-ink-faint'
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className={`ml-3 mt-2 h-px w-[calc(100%-0.75rem)] self-stretch ${
                    complete ? 'bg-ink' : 'bg-line'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

interface MobileProgressProps {
  current: number
}

/** Mobile progress: bar + „3 / 7 · Munkálatok”. */
export function MobileProgress({ current }: MobileProgressProps) {
  const pct = Math.round(((current + 1) / STEPS.length) * 100)

  return (
    <div className="flex items-center gap-3 border-t border-line px-5 py-2.5">
      <div
        className="h-[2px] flex-1 bg-line"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={current + 1}
        aria-label="A kalkulátor előrehaladása"
      >
        <div
          className="h-full bg-clay transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="whitespace-nowrap font-mono text-[11px] tracking-[0.06em] text-ink-soft">
        {current + 1} / {STEPS.length} · {STEPS[current].label}
      </p>
    </div>
  )
}
