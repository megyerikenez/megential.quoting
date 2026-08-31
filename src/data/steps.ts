import type { QuoteConfig, StepDefinition } from '../types/calculator'
import { isWorkAvailable, WORKS } from './works'

export const STEPS: StepDefinition[] = [
  {
    id: 'project',
    label: 'Projekt',
    heading: 'Mit szeretnél felújítani?',
    incompleteHint: 'Válassz projekttípust a folytatáshoz',
  },
  {
    id: 'property',
    label: 'Ingatlan',
    heading: 'Milyen ingatlanról van szó?',
    incompleteHint: 'Töltsd ki az ingatlan adatait',
  },
  {
    id: 'works',
    label: 'Munkálatok',
    heading: 'Milyen munkálatokra van szükséged?',
    incompleteHint: 'Válassz legalább egy munkálatot',
  },
  {
    id: 'quality',
    label: 'Minőség',
    heading: 'Milyen szintben gondolkodsz?',
    incompleteHint: 'Válassz minőségi szintet',
  },
  {
    id: 'timing',
    label: 'Időzítés',
    heading: 'Mikor szeretnéd elkezdeni?',
    incompleteHint: 'Válassz időzítést',
  },
  { id: 'estimate', label: 'Becslés', heading: 'A becsült költség', incompleteHint: '' },
  { id: 'contact', label: 'Adatok', heading: 'Kérj részletes ajánlatot', incompleteHint: '' },
]

/**
 * Whether the step is complete for the current configuration.
 * The „Becslés” step is reachable once all five previous steps are complete.
 */
export function isStepComplete(stepIndex: number, config: QuoteConfig): boolean {
  const step = STEPS[stepIndex]
  switch (step.id) {
    case 'project':
      return config.projectType !== null
    case 'property':
      return (
        config.propertyType !== null &&
        config.area !== null &&
        config.location !== null &&
        config.propertyStatus !== null
      )
    case 'works':
      return config.works.length > 0
    case 'quality':
      return config.quality !== null
    case 'timing':
      return config.timing !== null
    case 'estimate':
    case 'contact':
      return isStepComplete(stepIndex - 1, config)
  }
}

/** Whether the configuration has invalid work dependencies. */
export function hasInvalidWorkDependencies(config: QuoteConfig): boolean {
  const projectType = config.projectType
  if (!projectType) return false
  return config.works.some((id) => {
    const work = WORKS.find((w) => w.id === id)
    return work ? !isWorkAvailable(work, projectType) : false
  })
}
