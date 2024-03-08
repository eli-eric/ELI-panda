import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { EmployeeType } from '@/modules/roomCard/types/form'
import type { PhysicalItem } from '@/modules/systems/types/responses'
import type { SystemLevel } from '@/types/gql/graphql'

export type SystemDetailFormType = {
  uid?: string // from router
  name: string // input
  description?: string // textarea
  parentPath?: CodebookType[]
  isCritical: boolean // checkbox
  location?: CodebookType // combobox - CODEBOOK.LOCATION
  responsibleTeam?: CodebookType // listbox - graphql
  minimalSpareParstCount: number
  zone?: CodebookType // combobox
  systemType?: CodebookType // ListBox
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  responsible?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  importance?: CodebookType // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  systemLevel: SystemLevel
  physicalItem?: PhysicalItem
  hasImageGalleryChanges?: boolean
  operators?: EmployeeType[]
  maintainedBy?: EmployeeType[]
}
