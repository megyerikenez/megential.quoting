import heroImage from '../assets/photos/hero-staircase.jpg'
import { Button } from '../components/Button'
import { ArrowRightIcon } from '../components/icons'

const STRIP = [
  { index: '01', label: 'Felmérés' },
  { index: '02', label: 'Tervezés' },
  { index: '03', label: 'Árazás' },
  { index: '04', label: 'Kivitelezés' },
  { index: '05', label: 'Átadás' },
]

export function Hero() {
  return (
    <section className="shell pt-12 pb-14 sm:pt-16 lg:pt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">Prémium lakásfelújítás — Budapest</p>
          <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.04] tracking-tight sm:text-6xl xl:text-[76px]">
            Felújítás, <em className="text-clay">kiszámíthatóbban.</em>
          </h1>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft sm:text-lg">
            Tervezhető folyamat, átlátható költségek és igényes kivitelezés az első
            felméréstől az átadásig — online becsléssel, percek alatt.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#/kalkulator" size="lg">
              Árkalkulátor indítása
              <ArrowRightIcon />
            </Button>
            <Button href="#szolgaltatasok" variant="outline" size="lg">
              Szolgáltatások
            </Button>
          </div>
          <p className="mt-7 font-mono text-[12px] tracking-[0.03em] text-ink-faint">
            Azonnali becslés · elköteleződés nélkül
          </p>
        </div>

        <figure className="relative lg:col-span-5">
          <div className="relative">
            <img
              src={heroImage}
              alt="Minimalista betonlépcső, a tetején vázával — felújított belső tér"
              width={1200}
              height={1500}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />

            {/* Dimension marks — the quiet language of architectural drawings */}
            <div className="absolute left-4 top-4" aria-hidden="true">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/80 font-mono text-[11px] text-paper">
                A
              </span>
              <span className="mx-auto block h-6 w-px bg-paper/70" />
              <span className="mx-auto block h-1.5 w-1.5 bg-paper/80" />
            </div>

            <div className="absolute right-4 top-6 bottom-6 flex flex-col items-center" aria-hidden="true">
              <span className="h-2 w-px bg-paper/80" />
              <span className="my-1 h-8 w-px bg-paper/80" />
              <span className="my-1 h-8 w-px bg-paper/80" />
              <span className="h-2 w-px bg-paper/80" />
              <span className="mt-3 rotate-90 font-mono text-[10px] tracking-[0.16em] text-paper">
                02,4 m
              </span>
            </div>

            <div className="absolute bottom-4 left-4" aria-hidden="true">
              <div className="flex h-2 items-center">
                <span className="h-px w-10 bg-paper/80" />
                <span className="h-2 w-px bg-paper/80" />
              </div>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.12em] text-paper/90">
                M 1:50
              </span>
            </div>
          </div>
          <figcaption className="dimline mt-3">
            Részlet — felújított belső tér, ház a budai oldalon
          </figcaption>
        </figure>
      </div>

      <div className="hairline mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 pt-5 lg:mt-20">
        {STRIP.map((item) => (
          <p key={item.index} className="flex items-baseline gap-2.5">
            <span className="font-mono text-[11px] text-clay" aria-hidden="true">
              {item.index}
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft">
              {item.label}
            </span>
          </p>
        ))}
      </div>
    </section>
  )
}
