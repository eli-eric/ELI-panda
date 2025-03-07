import type { System } from '@/types/gql/graphql'
import type { SystemDetail } from '@/types/responses/systems'

export type TableSystem = {
  uid: string
  name: string
  systemLevel?: System['systemLevel']
  physicalItem?: SystemDetail['physicalItem']
  location?: SystemDetail['location']
  parentPath?: SystemDetail['parentPath']
  statistics?: {
    sp_coverage?: number
  }
}
