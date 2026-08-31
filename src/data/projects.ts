import type {
  Location,
  ProjectType,
  PropertyStatus,
  PropertyType,
  QualityLevel,
  Timing,
} from '../types/calculator'

export interface ProjectTypeOption {
  id: ProjectType
  label: string
  description: string
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'full',
    label: 'Teljes lakás',
    description: 'A teljes ingatlan megújítása a bontástól a befejező munkákig.',
  },
  {
    id: 'bathroom',
    label: 'Fürdőszoba',
    description: 'Vizes helyiség felújítása gépészettel, burkolással és szaniterekkel.',
  },
  {
    id: 'kitchen',
    label: 'Konyha',
    description: 'Konyhafelújítás gépészeti előkészítéssel és felületképzéssel.',
  },
  {
    id: 'rooms',
    label: 'Egy vagy több helyiség',
    description: 'Kijelölt helyiségek megújítása, teljes körű munkákkal.',
  },
  {
    id: 'other',
    label: 'Egyéb',
    description: 'Kisebb vagy vegyes munkálatok, egyedi igények szerint.',
  },
]

export interface PropertyTypeOption {
  id: PropertyType
  label: string
  description: string
}

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    id: 'apartment',
    label: 'Lakás',
    description: 'Társasházi lakás, társasházi szabályokkal.',
  },
  {
    id: 'house',
    label: 'Családi ház',
    description: 'Önálló ingatlan, saját szerkezetekkel és gépészettel.',
  },
]

export interface LocationOption {
  id: Location
  label: string
}

export const LOCATIONS: LocationOption[] = [
  { id: 'budapest', label: 'Budapest' },
  { id: 'pest', label: 'Pest vármegye' },
  { id: 'other', label: 'Egyéb' },
]

export interface PropertyStatusOption {
  id: PropertyStatus
  label: string
  description: string
}

export const PROPERTY_STATUSES: PropertyStatusOption[] = [
  {
    id: 'empty',
    label: 'Üres',
    description: 'Az ingatlan jelenleg nem lakott.',
  },
  {
    id: 'occupied',
    label: 'Lakott',
    description: 'A felújítás lakott ingatlanban zajlik majd.',
  },
]

export interface QualityOption {
  id: QualityLevel
  label: string
  description: string
}

export const QUALITY_LEVELS: QualityOption[] = [
  {
    id: 'basic',
    label: 'Alap',
    description: 'Praktikus, költségtudatos megoldások.',
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Tartós anyagok és kiegyensúlyozott ár-érték arány.',
  },
  {
    id: 'premium',
    label: 'Prémium',
    description: 'Magasabb kategóriás anyagok és részletgazdag kivitelezés.',
  },
]

export interface TimingOption {
  id: Timing
  label: string
}

export const TIMING_OPTIONS: TimingOption[] = [
  { id: 'asap', label: 'Minél hamarabb' },
  { id: 'in-1-3-months', label: '1–3 hónapon belül' },
  { id: 'in-3-6-months', label: '3–6 hónapon belül' },
  { id: 'planning', label: 'Később / még tervezés alatt' },
]
