import type { SystemDetail } from '@/types/responses/systems'

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
