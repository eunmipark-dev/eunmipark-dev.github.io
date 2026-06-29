// Section registry — single source of truth for the nav menu + view outlet.

export type SectionId = 'about' | 'careers' | 'projects' | 'contact'

export interface SectionMeta {
  id: SectionId
  label: string
  index: string // HUD-style ordinal shown next to the label
}

export const SECTIONS: SectionMeta[] = [
  { id: 'about', label: 'ABOUT', index: '01' },
  { id: 'careers', label: 'CAREERS', index: '02' },
  { id: 'projects', label: 'PROJECTS', index: '03' },
  { id: 'contact', label: 'CONTACT', index: '04' },
]

export const DEFAULT_SECTION: SectionId = 'about'
