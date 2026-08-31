import { Button } from '../../components/Button'
import { ArrowRightIcon } from '../../components/icons'
import { LOCATIONS, PROPERTY_STATUSES, PROPERTY_TYPES, QUALITY_LEVELS } from '../../data/projects'
import { formatArea, formatRange, formatWeeks } from '../../lib/format'
import { lineShare } from '../../lib/estimate'
import type { EstimateResult } from '../../types/calculator'
import { useCalculator } from '../useCalculator'

const huf = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 })
const decimals = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 2 })

function formatMultiplier(mult: { min: number; max: number } | number): string {
  if (typeof mult === 'number') return `×${decimals.format(mult)}`
  return `×${decimals.format(mult.min)}–${decimals.format(mult.max)}`
}

function labelOf<T extends { id: string; label: string }>(options: T[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? '—'
}

function Breakdown({ result }: { result: EstimateResult }) {
  return (
    <div className="border-t border-line">
      <h3 className="eyebrow pt-6">Miből áll össze?</h3>
      <ol className="mt-4 flex flex-col">
        {result.lines.map((line) => {
          const share = lineShare(line, result)
          return (
            <li key={line.id} className="border-b border-line py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="text-[15px] font-medium">{line.label}</p>
                <p className="font-mono text-[13px] text-ink-soft">
                  {huf.format(line.range.min)} – {huf.format(line.range.max)} Ft
                </p>
              </div>
              <div className="mt-3 h-[3px] w-full bg-line" aria-hidden="true">
                <div
                  className="h-full bg-ink"
                  style={{ width: `${Math.max(share * 100, 2)}%` }}
                />
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-ink-faint">
                a becslés ~{Math.round(share * 100)}%-a
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function HowItWorks({ result }: { result: EstimateResult }) {
  return (
    <details className="group border-t border-line pt-6">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <span className="eyebrow">Hogyan készült a becslés?</span>
        <span
          className="font-mono text-[13px] text-ink-soft transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <dl className="mt-4 flex flex-col gap-2 text-[14px] leading-relaxed">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Számítási alapterület</dt>
          <dd className="text-right font-medium">{formatArea(result.effectiveArea)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">
            Minőségi szint · {labelOf(QUALITY_LEVELS, result.applied.quality.level)}
          </dt>
          <dd className="text-right font-medium">
            {formatMultiplier(result.applied.quality.multiplier)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Település · {labelOf(LOCATIONS, result.applied.location.key)}</dt>
          <dd className="text-right font-medium">
            {formatMultiplier(result.applied.location.multiplier)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">
            Ingatlan típusa · {labelOf(PROPERTY_TYPES, result.applied.propertyType.key)}
          </dt>
          <dd className="text-right font-medium">
            {formatMultiplier(result.applied.propertyType.multiplier)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">
            Állapot · {labelOf(PROPERTY_STATUSES, result.applied.propertyStatus.key)}
          </dt>
          <dd className="text-right font-medium">
            {formatMultiplier(result.applied.propertyStatus.multiplier)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink-faint">
        A projekt alapdíja és a kiválasztott munkálatok m²-re vetített egységárakból állnak
        össze; a fenti szorzókat a teljes összegre alkalmazzuk. A tartomány az anyag- és
        kivitelezési árak természetes szórását fedi le.
      </p>
    </details>
  )
}

export function StepEstimate() {
  const { estimate, goNext } = useCalculator()

  if (!estimate) return null

  return (
    <div className="flex flex-col">
      <div className="border-b border-line pb-8">
        <p className="eyebrow">Becsült költség — tájékoztató jellegű</p>
        <p
          key={`${estimate.range.min}-${estimate.range.max}`}
          className="mt-3 animate-rise font-display text-[34px] font-medium leading-[1.08] tracking-tight sm:text-[44px]"
        >
          {formatRange(estimate.range)}
        </p>
        <p className="mt-4 flex items-baseline gap-3 text-[15px] text-ink-soft">
          <span className="font-mono text-[12px] uppercase tracking-[0.12em]">Várható kivitelezési idő</span>
          <span className="font-medium text-ink">{formatWeeks(estimate.durationWeeks)}</span>
        </p>
      </div>

      <Breakdown result={estimate} />
      <HowItWorks result={estimate} />

      <div className="mt-8 border border-line bg-cream px-5 py-5">
        <p className="text-[13px] leading-relaxed text-ink-soft">
          A becslés <strong className="font-semibold text-ink">nem minősül kötelező ajánlatnak</strong>.
          A pontos árat a helyszíni felmérés után, tételes ajánlatban határozzuk meg —
          a válaszaid alapján ezt már most előkészítjük.
        </p>
      </div>

      <div className="mt-8">
        <Button variant="accent" size="lg" onClick={goNext} className="w-full sm:w-auto">
          Kérj részletes ajánlatot
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}
