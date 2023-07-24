import type { SystemDetail } from '@/modules/systems/types/responses'

export type SystemsForRelResponse = {
  data: SystemDetail[]
  totalCount: number
}

export type SystemRelationshipResponse = {
  direction: string
  relationTypeCode: string
  foreignSystemName: string
  relationUid: string
}
