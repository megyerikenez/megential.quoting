import { PRICING } from '../../data/pricing'
import { PROJECT_TYPES, PROPERTY_STATUSES, PROPERTY_TYPES, QUALITY_LEVELS, LOCATIONS, TIMING_OPTIONS } from '../../data/projects'
import { formatArea, formatRangeCompact, formatWeeks } from '../../lib/format'
import { worksSummary } from '../../lib/estimate'
import type { EstimateResult, QuoteConfig } from '../../types/calculator'

interface SummaryPanelProps {
  config: QuoteConfig
  estimate: EstimateResult | null
}

interface RowProps {
  label: string
  value: string
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[13px] text-ink-soft">{label}</dt>
      <dd className="text-right text-[13px] font-medium leading-snug">{value}</dd>
    </div>
  )
}

function findLabel<T extends { id: string; label: string }>(options: T[], id: string | null): string {
  if (!id) return '—'
  return options.find((o) => o.id === id)?.label ?? '—'
}

/** The calculator's sticky project summary panel (right column). */
export function SummaryPanel({ config, estimate }: SummaryPanelProps) {
  const projectType = PROJECT_TYPES.find((p) => p.id === config.projectType)

  return (
    <aside className="border border-line bg-paper" aria-label="Projektösszefoglaló">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="eyebrow !text-ink">Projektösszefoglaló</h2>
        <span className="font-mono text-[11px] text-ink-faint" aria-hidden="true">
          ⁄⁄
        </span>
      </div>

      <dl className="px-5">
        <Row label="Projekt" value={findLabel(PROJECT_TYPES, config.projectType)} />
        <Row
          label="Alapterület"
          value={config.area !== null ? formatArea(config.area) : '—'}
        />
        <Row label="Ingatlan" value={findLabel(PROPERTY_TYPES, config.propertyType)} />
        <Row label="Állapot" value={findLabel(PROPERTY_STATUSES, config.propertyStatus)} />
        <Row label="Helyszín" value={findLabel(LOCATIONS, config.location)} />
        <Row label="Munkálatok" value={worksSummary(config.works)} />
        <Row label="Minőség" value={findLabel(QUALITY_LEVELS, config.quality)} />
        <Row label="Időzítés" value={findLabel(TIMING_OPTIONS, config.timing)} />
      </dl>

      <div className="border-t border-line bg-cream px-5 py-5" aria-live="polite">
        <p className="eyebrow">Becsült költség</p>
        {estimate ? (
          <div key={`${estimate.range.min}-${estimate.range.max}`} className="animate-rise">
            <p className="mt-2 font-mono text-[22px] font-medium leading-tight tracking-tight">
              {formatRangeCompact(estimate.range)}
            </p>
            <p className="mt-2 text-[13px] leading-snug text-ink-soft">
              Várható kivitelezési idő:
              <br />
              <span className="font-medium text-ink">{formatWeeks(estimate.durationWeeks)}</span>
            </p>
          </div>
        ) : (
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            A becslés a válaszaid alapján, lépésről lépésre alakul.
          </p>
        )}
        {projectType && config.area !== null && (
          <p className="mt-3 border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-ink-faint">
            A számításnál legalább {PRICING.minAreas[projectType.id]} m²-rel számolunk.
          </p>
        )}
      </div>
    </aside>
  )
}
