import type { ProjectType, WorkCategory } from '../types/calculator'

export interface WorkOption {
  id: WorkCategory
  /** Short code — part of the editorial presentation. */
  code: string
  label: string
  description: string
  /** Project types where this work does not apply. */
  unavailableFor: ProjectType[]
}

export const WORKS: WorkOption[] = [
  {
    id: 'demolition',
    code: 'W01',
    label: 'Bontás',
    description: 'Meglévő burkolatok, válaszfalak és szerelvények visszabontása.',
    unavailableFor: [],
  },
  {
    id: 'electrical',
    code: 'W02',
    label: 'Villanyszerelés',
    description: 'Hálózatfelújítás, új elosztó, szerelvények és világítási pontok.',
    unavailableFor: [],
  },
  {
    id: 'plumbing',
    code: 'W03',
    label: 'Víz- és csatornaszerelés',
    description: 'Víz- és csatornahálózat kiépítése, szerelvények bekötése.',
    unavailableFor: [],
  },
  {
    id: 'painting',
    code: 'W04',
    label: 'Festés',
    description: 'Fal- és mennyezetelőkészítés, glettelés és festés.',
    unavailableFor: [],
  },
  {
    id: 'tiling',
    code: 'W05',
    label: 'Burkolás',
    description: 'Padló- és falburkolás kerámia, kő vagy nagyformátumú lapokkal.',
    unavailableFor: [],
  },
  {
    id: 'drywall',
    code: 'W06',
    label: 'Gipszkarton',
    description: 'Válaszfalak, álmennyezetek és gipszkarton borítások.',
    unavailableFor: [],
  },
  {
    id: 'sanitary',
    code: 'W07',
    label: 'Szaniterek',
    description: 'Fürdőszobai berendezések beszerelése és bekötése.',
    unavailableFor: ['kitchen'],
  },
  {
    id: 'kitchen-prep',
    code: 'W08',
    label: 'Konyhai előkészítés',
    description: 'Gépészeti és elektromos előkészítés konyhabútor beépítéséhez.',
    unavailableFor: ['bathroom', 'kitchen'],
  },
  {
    id: 'joinery',
    code: 'W09',
    label: 'Asztalos előkészítés',
    description: 'Beépített bútorok, ajtók és asztalos szerkezetek előkészítése.',
    unavailableFor: [],
  },
]

/** Whether a work is available for the given project type. */
export function isWorkAvailable(work: WorkOption, projectType: ProjectType): boolean {
  return !work.unavailableFor.includes(projectType)
}

export function getWork(id: WorkCategory): WorkOption {
  const work = WORKS.find((w) => w.id === id)
  if (!work) throw new Error(`Ismeretlen munkálat: ${id}`)
  return work
}

export const ALL_WORK_IDS: WorkCategory[] = WORKS.map((w) => w.id)
