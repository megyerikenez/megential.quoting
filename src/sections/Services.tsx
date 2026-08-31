import { useState } from 'react'
import { ArrowUpRightIcon } from '../components/icons'
import { SERVICES } from '../data/services'

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="szolgaltatasok" className="shell scroll-mt-20 border-t border-line py-16 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">01 — Szolgáltatások</p>
          <h2 className="mt-4 max-w-xl font-display text-[32px] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Teljes körű felújítás, egy kézből.
          </h2>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
          Válassz szolgáltatást — a kalkulátor azonnal elindul a megfelelő
          projekttípussal és a jellemző munkálatokkal.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <ul className="lg:col-span-7">
          {SERVICES.map((service, i) => (
            <li key={service.id} className="border-t border-line last:border-b">
              <a
                href={`#/kalkulator?svc=${service.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-6 sm:py-7 lg:grid-cols-[auto_1fr_auto_auto] lg:gap-x-6"
              >
                <span
                  className="font-mono text-[12px] tracking-[0.1em] text-clay"
                  aria-hidden="true"
                >
                  {service.index}
                </span>
                <span>
                  <span className="block font-display text-[22px] font-medium leading-tight tracking-tight transition-colors duration-200 group-hover:text-clay-deep sm:text-[26px]">
                    {service.title}
                  </span>
                  <span className="mt-2 block max-w-lg text-[14px] leading-relaxed text-ink-soft">
                    {service.description}
                  </span>
                </span>
                <img
                  src={service.image}
                  alt=""
                  width={88}
                  height={88}
                  loading="lazy"
                  className="hidden h-[72px] w-[72px] object-cover lg:block"
                />
                <span className="hidden text-[13px] font-medium text-ink-soft sm:flex sm:items-center sm:gap-2 lg:flex lg:flex-col lg:items-end">
                  <span className="transition-colors duration-200 group-hover:text-ink">
                    Becslés indítása
                  </span>
                  <ArrowUpRightIcon className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-cream" aria-hidden="true">
              {SERVICES.map((service, i) => (
                <img
                  key={service.id}
                  src={service.image}
                  alt=""
                  width={900}
                  height={1125}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-4 left-4">
                <span className="bg-paper px-2.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-ink">
                  {SERVICES[active].index} — {SERVICES[active].title.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
