import { Button } from '../components/Button'
import { ArrowRightIcon } from '../components/icons'
import { calculateEstimate } from '../lib/estimate'
import { formatRange, formatWeeks } from '../lib/format'

// The example is produced by the real estimation engine — the same one the calculator uses.
const EXAMPLE = calculateEstimate({
  projectType: 'full',
  propertyType: 'apartment',
  area: 68,
  location: 'budapest',
  propertyStatus: 'empty',
  works: ['demolition', 'electrical', 'plumbing', 'painting', 'tiling', 'drywall'],
  quality: 'standard',
  timing: 'asap',
})

export function CalculatorTeaser() {
  return (
    <section className="bg-ink text-paper">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow !text-paper/60">03 — Árkalkulátor</p>
          <h2 className="mt-4 font-display text-[32px] font-medium leading-[1.08] tracking-tight sm:text-5xl">
            Tudd meg, mennyibe kerülhet a felújításod.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-paper/75 sm:text-base">
            Öt rövid lépésben becsüljük meg a költségtartományt és a várható
            kivitelezési időt — részletes bontással, kötelezettség nélkül.
          </p>
          <div className="mt-9">
            <Button href="#/kalkulator" variant="accent" size="lg">
              Árkalkulátor indítása
              <ArrowRightIcon />
            </Button>
          </div>
        </div>

        {EXAMPLE && (
          <div className="lg:col-span-5">
            <figure className="border border-paper/20 bg-paper/[0.04] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/55">
                Példa — 68 m² · teljes lakás · standard
              </p>
              <p className="mt-5 font-mono text-[21px] font-medium leading-snug tracking-tight sm:text-[24px]">
                {formatRange(EXAMPLE.range)}
              </p>
              <div className="mt-6 border-t border-paper/20 pt-5">
                <p className="flex items-baseline justify-between gap-4 text-[13px]">
                  <span className="text-paper/60">Várható kivitelezési idő</span>
                  <span className="font-mono font-medium">{formatWeeks(EXAMPLE.durationWeeks)}</span>
                </p>
                <p className="mt-3 flex items-baseline justify-between gap-4 text-[13px]">
                  <span className="text-paper/60">A becslés tájékoztató jellegű</span>
                  <span className="font-mono text-paper/60">—</span>
                </p>
              </div>
            </figure>
          </div>
        )}
      </div>
    </section>
  )
}
