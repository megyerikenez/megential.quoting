import { PROJECT_TYPES } from '../../data/projects'
import { useCalculator } from '../useCalculator'
import { OptionRow } from '../components/OptionRow'

export function StepProject() {
  const { state, dispatch } = useCalculator()

  return (
    <fieldset>
      <legend className="sr-only">Milyen projektre van szükséged?</legend>
      <div className="flex flex-col gap-3">
        {PROJECT_TYPES.map((option, i) => (
          <OptionRow
            key={option.id}
            name="project-type"
            code={String(i + 1).padStart(2, '0')}
            title={option.label}
            description={option.description}
            selected={state.config.projectType === option.id}
            onSelect={() => dispatch({ type: 'setProjectType', value: option.id })}
          />
        ))}
      </div>
    </fieldset>
  )
}
