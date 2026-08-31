import { TIMING_OPTIONS } from '../../data/projects'
import { useCalculator } from '../useCalculator'
import { OptionRow } from '../components/OptionRow'

const CODES = ['A', 'B', 'C', 'D']

export function StepTiming() {
  const { state, dispatch } = useCalculator()

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Mikor szeretnéd elkezdeni?</legend>
        <div className="flex flex-col gap-3">
          {TIMING_OPTIONS.map((option, i) => (
            <OptionRow
              key={option.id}
              name="timing"
              code={CODES[i]}
              title={option.label}
              selected={state.config.timing === option.id}
              onSelect={() => dispatch({ type: 'setTiming', value: option.id })}
            />
          ))}
        </div>
      </fieldset>
      <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-ink-faint">
        Az időzítés nem befolyásolja az árat — csak a folyamat tervezéséhez használjuk.
      </p>
    </div>
  )
}
