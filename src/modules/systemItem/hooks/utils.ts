import type {
  PhysicalItemFragment,
  SystemDetailFragment
} from '@/types/gql/graphql'
import type { SystemDetail } from '@/types/responses/systems'
import { connectAndDisconnectNode } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'

export const makeSystemInputBody = ({
  systemForm,
  systemDetail,
  physicalItem
}: {
  systemForm: SystemDetailFormType
  systemDetail?: SystemDetailFragment | null
  physicalItem?: PhysicalItemFragment | null
}) => ({
  name: systemForm.name,
  description: systemForm.description,
  systemCode: systemForm.systemCode === '' ? null : systemForm.systemCode,
  attribute: connectAndDisconnectNode(
    systemForm?.attribute?.uid,
    systemDetail?.attribute?.uid
  ),
  minimalSpareParstCount: !systemForm.minimalSpareParstCount
    ? null
    : Number(systemForm.minimalSpareParstCount),
  systemType: connectAndDisconnectNode(
    systemForm?.systemType?.uid,
    systemDetail?.systemType?.uid
  ),
  responsibleTeam: connectAndDisconnectNode(
    systemForm?.responsibleTeam?.uid,
    systemDetail?.responsibleTeam?.uid
  ),
  location: connectAndDisconnectNode(
    systemForm?.location?.uid,
    systemDetail?.location?.uid
  ),
  zone: connectAndDisconnectNode(
    systemForm?.zone?.uid,
    systemDetail?.zone?.uid
  ),
  responsible: connectAndDisconnectNode(
    systemForm?.responsible?.uid,
    systemDetail?.responsible?.uid
  ),
  systemLevel: systemForm?.systemLevel,
  physicalItem: {
    update: systemForm?.physicalItem && {
      node: {
        notes: systemForm?.physicalItem?.notes,
        serialNumber: systemForm?.physicalItem?.serialNumber,
        itemUsage: connectAndDisconnectNode(
          systemForm?.physicalItem?.itemUsage?.uid,
          physicalItem?.itemUsage?.uid
        ),
        conditionStatus: connectAndDisconnectNode(
          systemForm?.physicalItem?.conditionStatus?.uid,
          physicalItem?.conditionStatus?.uid
        )
      }
    }
  }
})

export type PruneSystemDetail = {
  uid: string
  children?: PruneSystemDetail[]
}

export function pruneSystemDetail(system: SystemDetail): PruneSystemDetail {
  const { uid } = system
  const children = system.subSystems?.map(pruneSystemDetail)
  return {
    uid,
    children
  }
}
