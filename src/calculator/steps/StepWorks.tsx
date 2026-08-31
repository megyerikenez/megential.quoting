import { WORKS, isWorkAvailable } from '../../data/works'
import { useCalculator } from '../useCalculator'
import { WorkCard } from '../components/WorkCard'

export function StepWorks() {
  const { state, dispatch } = useCalculator()
  const { config } = state
  const projectType = config.projectType

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Válaszd ki a szükséges munkálatokat</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WORKS.map((work) => {
            const available = projectType ? isWorkAvailable(work, projectType) : true
            const selected = config.works.includes(work.id)
            return (
              <WorkCard
                key={work.id}
                code={work.code}
                title={work.label}
                description={work.description}
                selected={selected}
                disabled={!available}
                disabledReason={available ? undefined : 'Ennél a projekttípusnál nem releváns'}
                onToggle={() => dispatch({ type: 'toggleWork', id: work.id })}
              />
            )
          })}
        </div>
      </fieldset>
      <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-ink-soft" aria-live="polite">
        Kiválasztva: {config.works.length} / {WORKS.length}
      </p>
    </div>
  )
}
