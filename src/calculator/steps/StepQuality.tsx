import { PRICING } from '../../data/pricing'
import { QUALITY_LEVELS } from '../../data/projects'
import { useCalculator } from '../useCalculator'
import { OptionRow } from '../components/OptionRow'

const CODES = ['A', 'B', 'C']

const decimals = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 2 })

export function StepQuality() {
  const { state, dispatch } = useCalculator()

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Válassz minőségi szintet</legend>
        <div className="flex flex-col gap-3">
          {QUALITY_LEVELS.map((option, i) => {
            const mult = PRICING.qualityMultipliers[option.id]
            return (
              <OptionRow
                key={option.id}
                name="quality"
                code={CODES[i]}
                title={option.label}
                description={option.description}
                meta={`×${decimals.format(mult.min)}–${decimals.format(mult.max)}`}
                selected={state.config.quality === option.id}
                onSelect={() => dispatch({ type: 'setQuality', value: option.id })}
              />
            )
          })}
        </div>
      </fieldset>
      <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-ink-faint">
        A szint a becslés kiindulópontja — a részletes ajánlatban anyagárakkal együtt
        pontosítjuk. Nem akarunk rábeszélni a prémium szintre: válaszd azt, ami a
        céljaidhoz illik.
      </p>
    </div>
  )
}
