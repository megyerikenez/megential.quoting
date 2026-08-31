import { Button } from '../components/Button'
import { ArrowLeftIcon } from '../components/icons'
import { formatRangeCompact, formatWeeks } from '../lib/format'
import { useCalculator } from './useCalculator'

export function Confirmation() {
  const { state, estimate, reset } = useCalculator()

  const firstName = state.contact.name.trim().split(/\s+/)[0]

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start py-4 sm:py-10">
      <p className="font-mono text-[13px] tracking-[0.14em] text-ink-soft">
        Ajánlatkérés-azonosító
      </p>
      <p className="mt-2 border border-line bg-cream px-4 py-2 font-mono text-lg font-medium tracking-[0.08em] text-ink">
        {state.reference}
      </p>

      <h2 className="mt-8 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
        Köszönjük az ajánlatkérést{firstName ? `, ${firstName}` : ''}!
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Ez a weboldal portfólió demó: a kérésed nem került elküldésre, és az adataid
        nem hagyták el a böngésződet. Egy valódi projekt esetén itt kezdődne az
        igényfelmérés — munkatársunk egy munkanapon belül keresne a helyszíni
        felmérés egyeztetéséhez.
      </p>

      {estimate && (
        <dl className="mt-8 w-full border-t border-line pt-6">
          <div className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-[13px] text-ink-soft">A becslésed</dt>
            <dd className="font-mono text-[15px] font-medium">{formatRangeCompact(estimate.range)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-[13px] text-ink-soft">Várható kivitelezési idő</dt>
            <dd className="font-mono text-[15px] font-medium">{formatWeeks(estimate.durationWeeks)}</dd>
          </div>
        </dl>
      )}

      <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button href="#/" variant="primary" size="lg" className="w-full sm:w-auto">
          <ArrowLeftIcon />
          Vissza a főoldalra
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={reset} className="w-full sm:w-auto">
          Kalkuláció újrakezdése
        </Button>
      </div>
    </div>
  )
}
