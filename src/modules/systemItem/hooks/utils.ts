import type { SystemDetailFragment } from '@/types/gql/graphql'
import type { SystemDetailFormType } from '../types/form'
import { connectAndDisconnectNode } from '@/utils/graphql/mutations'

export const makeSystemInputBody = ({
  systemForm,
  systemDetail
}: {
  systemForm: SystemDetailFormType
  systemDetail?: SystemDetailFragment | null
}) => ({
  name: systemForm.name,
  description: systemForm.description,
  systemCode: systemForm.systemCode === '' ? null : systemForm.systemCode,
  systemAlias: systemForm.systemAlias,
  isCritical: systemForm.isCritical,
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
          systemDetail?.physicalItem?.itemUsage?.uid
        ),
        conditionStatus: connectAndDisconnectNode(
          systemForm?.physicalItem?.conditionStatus?.uid,
          systemDetail?.physicalItem?.conditionStatus?.uid
        )
      }
    }
  }
})
