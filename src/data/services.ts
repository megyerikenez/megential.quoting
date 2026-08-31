import type { ProjectType, WorkCategory } from '../types/calculator'
import imgFullReno from '../assets/photos/service-full-reno.jpg'
import imgBathroom from '../assets/photos/service-bathroom.jpg'
import imgKitchen from '../assets/photos/service-kitchen.jpg'
import imgPainting from '../assets/photos/service-painting.jpg'
import imgTiling from '../assets/photos/service-tiling.jpg'
import imgRooms from '../assets/photos/service-rooms.jpg'

/**
 * Selecting a service pre-fills the calculator with the project type and
 * typical works — the user can change anything afterwards.
 */
export interface ServicePreset {
  projectType: ProjectType
  works: WorkCategory[]
}

export interface Service {
  id: string
  index: string
  title: string
  description: string
  image: string
  imageAlt: string
  preset: ServicePreset
}

export const SERVICES: Service[] = [
  {
    id: 'full',
    index: '01',
    title: 'Teljes lakásfelújítás',
    description:
      'Komplett megújulás a bontástól a burkolatokig: gépészet, elektromos hálózat, felületképzés és befejező munkák egyetlen összehangolt folyamatban.',
    image: imgFullReno,
    imageAlt: 'Meleg tónusú, természetes fa anyagokkal kialakított étkezőtér',
    preset: {
      projectType: 'full',
      works: ['demolition', 'electrical', 'plumbing', 'painting', 'tiling', 'drywall'],
    },
  },
  {
    id: 'bathroom',
    index: '02',
    title: 'Fürdőszoba felújítás',
    description:
      'Víz- és villanyszerelés, burkolás, szaniterek beszerelése és igényes befejező munkák — gondos vízszigeteléssel és tiszta átadással.',
    image: imgBathroom,
    imageAlt: 'Modern, márvány felületű fürdőszoba',
    preset: {
      projectType: 'bathroom',
      works: ['demolition', 'plumbing', 'electrical', 'tiling', 'sanitary'],
    },
  },
  {
    id: 'kitchen',
    index: '03',
    title: 'Konyhafelújítás',
    description:
      'Gépészeti és elektromos előkészítés, burkolatok és felületek, valamint minden, ami a konyhabútor beépítéséhez szükséges.',
    image: imgKitchen,
    imageAlt: 'Világos konyha márvány munkalappal és fa padlóval',
    preset: {
      projectType: 'kitchen',
      works: ['demolition', 'plumbing', 'electrical', 'tiling', 'painting', 'kitchen-prep'],
    },
  },
  {
    id: 'painting',
    index: '04',
    title: 'Festés és felületképzés',
    description:
      'Fal- és mennyezetelőkészítés, glettelés, festés és dekoratív felületek — gondos takarással és precíz munkavégzéssel.',
    image: imgPainting,
    imageAlt: 'Festő munkás fehér falat fest hengerrel',
    preset: {
      projectType: 'rooms',
      works: ['painting', 'drywall'],
    },
  },
  {
    id: 'tiling',
    index: '05',
    title: 'Burkolás',
    description:
      'Padló- és falburkolás kerámia, kő vagy nagyformátumú lapok felhasználásával — precíz fugázással és részletmegoldásokkal.',
    image: imgTiling,
    imageAlt: 'Burkoló mester csempéket helyez fel a falra',
    preset: {
      projectType: 'rooms',
      works: ['tiling', 'demolition'],
    },
  },
  {
    id: 'rooms',
    index: '06',
    title: 'Egy vagy több helyiség',
    description:
      'Kijelölt helyiségek megújítása a te igényeid szerint — a kalkulátorban pontosan összeállíthatod a munkálatokat.',
    image: imgRooms,
    imageAlt: 'Világos, felújított nappali enteriőr',
    preset: {
      projectType: 'rooms',
      works: ['electrical', 'painting', 'tiling'],
    },
  },
]

export function getServiceByPresetId(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}
