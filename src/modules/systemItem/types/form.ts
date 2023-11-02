import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { PhysicalItem } from '@/modules/systems/types/responses'

export type SystemDetailFormType = {
  uid?: string // from router
  name: string // input
  description?: string // textarea
  parentPath?: CodebookType[]
  location?: CodebookType // combobox - CODEBOOK.LOCATION
  zone?: CodebookType // combobox
  systemType?: CodebookType // ListBox
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  owner?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  responsible?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  importance?: CodebookType // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  systemLevel?: CodebookType
  physicalItem?: PhysicalItem
  hasImageGalleryChanges?: boolean
}
