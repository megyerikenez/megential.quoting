import blueprintImage from '../assets/photos/process-blueprint.jpg'

const STEPS = [
  {
    index: '01',
    title: 'Igényfelmérés',
    description: 'Röviden átbeszéljük, mire van szükséged — a kalkulátorral már most előkészítheted.',
    duration: '1 munkanap',
  },
  {
    index: '02',
    title: 'Helyszíni felmérés',
    description: 'Felmérjük az ingatlant, pontosítjuk a műszaki részleteket és az igényeket.',
    duration: '2–3 munkanapon belül',
  },
  {
    index: '03',
    title: 'Részletes ajánlat',
    description: 'Tételes, átlátható ajánlatot kapsz határidővel, ütemezéssel és anyagkijelöléssel.',
    duration: '1 hét',
  },
  {
    index: '04',
    title: 'Kivitelezés',
    description: 'Egyeztetett ütemterv szerint dolgozunk, rendszeres státusszal és egy kapcsolattartóval.',
    duration: 'megállapodás szerint',
  },
  {
    index: '05',
    title: 'Átadás',
    description: 'Közös bejárás, átadási dokumentáció és a jótállási feltételek rögzítése.',
    duration: 'átadás napján',
  },
]

export function Process() {
  return (
    <section id="folyamat" className="scroll-mt-20 border-t border-line">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow">02 — Hogyan dolgozunk</p>
              <h2 className="mt-4 font-display text-[32px] font-medium leading-[1.1] tracking-tight sm:text-5xl">
                Kiszámítható folyamat, az első választól az átadásig.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                Nincsenek homályos ígéretek: minden lépésnek ütemezése, felelőse és
                dokumentációja van.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {STEPS.map((step) => (
              <li
                key={step.index}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-t border-line py-6 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-8 lg:py-7"
              >
                <span className="font-mono text-[12px] text-clay" aria-hidden="true">
                  {step.index}
                </span>
                <span>
                  <span className="block font-display text-[20px] font-medium leading-tight tracking-tight sm:text-[23px]">
                    {step.title}
                  </span>
                  <span className="mt-1.5 block max-w-xl text-[14px] leading-relaxed text-ink-soft">
                    {step.description}
                  </span>
                </span>
                <span className="col-start-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint sm:col-start-3 sm:text-right">
                  {step.duration}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figure className="relative">
        <img
          src={blueprintImage}
          alt="Építészeti tervdokumentáció vonalzóval és ceruzákkal"
          width={1600}
          height={1074}
          loading="lazy"
          className="h-56 w-full object-cover saturate-[0.82] sm:h-72"
        />
        <figcaption className="absolute bottom-3 left-5 font-mono text-[11px] tracking-[0.12em] text-paper/90 sm:left-8">
          Tervdokumentáció — a műszaki tartalom pontos rögzítése
        </figcaption>
      </figure>
    </section>
  )
}
