import { useEffect, useRef, type ComponentType } from 'react'
import { Button } from '../components/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons'
import { Wordmark } from '../components/Wordmark'
import { STEPS } from '../data/steps'
import { formatRangeBar, formatRangeCompact } from '../lib/format'
import type { StepId } from '../types/calculator'
import { useCalculator } from './useCalculator'
import { Confirmation } from './Confirmation'
import { MobileProgress, StepRail } from './components/ProgressSteps'
import { SummaryPanel } from './components/SummaryPanel'
import { StepContact } from './steps/StepContact'
import { StepEstimate } from './steps/StepEstimate'
import { StepProject } from './steps/StepProject'
import { StepProperty } from './steps/StepProperty'
import { StepQuality } from './steps/StepQuality'
import { StepTiming } from './steps/StepTiming'
import { StepWorks } from './steps/StepWorks'

const STEP_CONTENT: Record<StepId, ComponentType> = {
  project: StepProject,
  property: StepProperty,
  works: StepWorks,
  quality: StepQuality,
  timing: StepTiming,
  estimate: StepEstimate,
  contact: StepContact,
}

/** The calculator's fixed header — brand and exit. */
function CalculatorHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="shell flex h-16 items-center justify-between">
        <a href="#/" className="-ml-1 px-1 py-2" aria-label="MÉRTÉK — vissza a főoldalra">
          <Wordmark />
        </a>
        <a
          href="#/"
          className="hidden items-center gap-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink lg:inline-flex"
        >
          Főoldal
          <ArrowLeftIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  )
}

/** Sticky mobile bottom bar: back + live estimate + primary action. */
function MobileActionBar() {
  const { state, stepIndex, canGoNext, goNext, goBack, estimate } = useCalculator()

  if (state.submitted) return null
  const isContact = stepIndex === STEPS.length - 1

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            aria-label="Vissza az előző lépéshez"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-ink transition-colors hover:border-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
        )}
        <div className="min-w-0 flex-1" aria-live="polite">
          {estimate ? (
            <>
              <p className="eyebrow !text-[10px]">Becsült költség</p>
              <p
                key={`${estimate.range.min}-${estimate.range.max}`}
                title={formatRangeCompact(estimate.range)}
                className="animate-rise truncate font-mono text-[14px] font-medium leading-snug"
              >
                {formatRangeBar(estimate.range)}
              </p>
            </>
          ) : !canGoNext ? (
            <p className="truncate font-mono text-[12px] tracking-[0.02em] text-ink-soft">
              {STEPS[stepIndex].incompleteHint}
            </p>
          ) : (
            <p className="truncate font-mono text-[12px] tracking-[0.04em] text-ink-soft">
              {stepIndex + 1} / {STEPS.length} · {STEPS[stepIndex].label}
            </p>
          )}
        </div>
        {isContact ? (
          <Button type="submit" form="contact-form" variant="accent" size="md" className="shrink-0">
            Beküldés
          </Button>
        ) : (
          <Button
            type="button"
            variant="accent"
            size="md"
            onClick={goNext}
            disabled={!canGoNext}
            className="shrink-0"
          >
            {stepIndex === STEPS.length - 2 ? 'Ajánlatkérés' : 'Tovább'}
            <ArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  )
}

export function CalculatorApp() {
  const { state, stepIndex, canGoNext, canNavigateTo, goNext, goBack, goTo, estimate } =
    useCalculator()
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Focus the step heading on step change, so screen readers and
  // keyboard navigation follow along.
  useEffect(() => {
    headingRef.current?.focus()
  }, [stepIndex])

  const step = STEPS[stepIndex]
  const Content = STEP_CONTENT[step.id]

  return (
    <div className="flex min-h-screen flex-col">
      <CalculatorHeader />

      <main className="shell flex-1 pb-32 pt-6 lg:pb-20 lg:pt-10">
        {state.submitted ? (
          <Confirmation />
        ) : (
          <>
            <div className="lg:hidden">
              <MobileProgress current={stepIndex} />
            </div>
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 xl:gap-20">
              <div className="min-w-0">
                <div className="hidden lg:block">
                  <StepRail
                    current={stepIndex}
                    config={state.config}
                    canNavigateTo={canNavigateTo}
                    onNavigate={goTo}
                  />
                </div>

                <section
                  key={stepIndex}
                  aria-labelledby="step-heading"
                  className="animate-step-in mt-8 lg:mt-12"
                >
                  <p className="eyebrow">
                    Lépés {stepIndex + 1} — {step.label}
                  </p>
                  <h1
                    id="step-heading"
                    ref={headingRef}
                    tabIndex={-1}
                    className="mt-2 max-w-xl font-display text-[28px] font-medium leading-[1.15] tracking-tight outline-none sm:text-4xl"
                  >
                    {step.heading}
                  </h1>

                  <div className="mt-8">
                    <Content />
                  </div>

                  <div className="mt-12 hidden items-center justify-between border-t border-line pt-6 lg:flex">
                    {stepIndex > 0 ? (
                      <Button type="button" variant="ghost" onClick={goBack}>
                        <ArrowLeftIcon />
                        Vissza
                      </Button>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                    {stepIndex < STEPS.length - 1 && (
                      <Button type="button" onClick={goNext} disabled={!canGoNext}>
                        {stepIndex === STEPS.length - 2 ? 'Ajánlatkérés' : 'Tovább'}
                        <ArrowRightIcon />
                      </Button>
                    )}
                  </div>
                </section>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <SummaryPanel config={state.config} estimate={estimate} />
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <MobileActionBar />
    </div>
  )
}
