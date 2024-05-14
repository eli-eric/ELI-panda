import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { EmployeeType } from '@/modules/roomCard/types/form'
import type { PhysicalItem } from '@/modules/systems/types/responses'
import type { SystemLevel } from '@/types/gql/graphql'

export type SystemDetailFormType = {
  uid?: string | null
  name: string | null
  description?: string | null
  parentPath?: CodebookType[]
  isCritical: boolean | null
  location?: CodebookType | null
  responsibleTeam?: CodebookType | null
  minimalSpareParstCount: number | null
  zone?: CodebookType | null
  systemType?: CodebookType | null
  systemCode?: string | null
  systemAlias?: string | null
  responsible?: CodebookType | null
  importance?: CodebookType | null
  systemLevel: SystemLevel | null
  physicalItem?: PhysicalItem | null
  hasImageGalleryChanges?: boolean | null
  operators?: EmployeeType[] | null
  maintainedBy?: EmployeeType[] | null
}
