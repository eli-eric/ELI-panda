import type { EmployeeType } from '@/modules/roomCard/types/form'
import type { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import type { PhysicalItem } from '@/types/responses/systems'

export type SystemDetailFormType = {
  uid?: string | null
  name: string | null
  description?: string | null
  parentPath?: CodebookType[]
  location?: CodebookType | null
  attribute?: CodebookType | null
  responsibleTeam?: CodebookType | null
  minimalSpareCoverage?: number | null
  sparePartsCoverage?: number | null
  zone?: CodebookType | null
  systemType?: CodebookType | null
  systemCode?: string | null
  responsible?: CodebookType | null
  importance?: CodebookType | null
  systemLevel: SystemLevel | null
  physicalItem?: PhysicalItem | null
  hasImageGalleryChanges?: boolean | null
  operators?: EmployeeType[] | null
  maintainedBy?: EmployeeType[] | null
}
