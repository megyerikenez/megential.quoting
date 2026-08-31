import { Button } from '../components/Button'
import { ArrowRightIcon } from '../components/icons'
import { Wordmark } from '../components/Wordmark'

const LINKS = [
  { href: '#szolgaltatasok', label: 'Szolgáltatások' },
  { href: '#folyamat', label: 'Hogyan dolgozunk' },
  { href: '#/kalkulator', label: 'Árkalkulátor' },
]

export function Footer() {
  return (
    <footer id="kapcsolat" className="scroll-mt-20 border-t border-line bg-cream">
      <div className="shell pt-14 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Wordmark withTagline />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Átlátható folyamat, tervezhető költségek, igényes kivitelezés. Kezdd a
              kalkulátorral, és percek alatt lásd a becsült költségtartományt.
            </p>
            <div className="mt-7">
              <Button href="#/kalkulator" variant="primary" size="lg">
                Ajánlatkérés indítása
                <ArrowRightIcon />
              </Button>
              <p className="mt-4 max-w-md font-mono text-[12px] leading-relaxed tracking-[0.02em] text-ink-faint">
                Közvetlen elérhetőségek nélkül dolgozunk: a kapcsolatfelvétel a
                kalkulátor ajánlatkérésén keresztül történik, a folyamat végén.
              </p>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Lábléc-navigáció">
            <p className="eyebrow">Navigáció</p>
            <ul className="mt-4 flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="-my-3 inline-block py-3 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow">Megjegyzés</p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              A MÉRTÉK egy fiktív márka, amely a Megential portfóliójához készült.
              A kalkulátor becslései tájékoztató jellegűek, és nem minősülnek valódi
              ajánlatnak.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              Tervezés és fejlesztés — <span className="font-semibold text-ink">Megential</span>
            </p>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-2 pt-6 font-mono text-[11px] tracking-[0.04em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MÉRTÉK — portfólió demó</p>
          <p>Minden adat a böngésződben marad.</p>
        </div>
      </div>
    </footer>
  )
}
