import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { updateSystem } from '@/modules/systems/utils'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'
import type { Mutation, MutationUpdateSystemsArgs } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'
import { connectAndDisconnectNode, whereN } from '@/utils/graphql/mutations'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'

const UPDATE_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  mutation UpdateSystems($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        ...SystemDetail
      }
    }
  }
`

const systemInput = ({ systemForm, systemDetail }: { systemForm; systemDetail }) => ({
  name: systemForm.name,
  description: systemForm.description,
  systemCode: systemForm.systemCode,
  systemAlias: systemForm.systemAlias,
  isCritical: systemForm.isCritical,
  minimalSpareParstCount: !systemForm.minimalSpareParstCount ? null : Number(systemForm.minimalSpareParstCount),
  systemType: connectAndDisconnectNode(systemForm?.systemType?.uid, systemDetail?.systemType?.uid),
  location: connectAndDisconnectNode(systemForm?.location?.uid, systemDetail?.location?.uid),
  zone: connectAndDisconnectNode(systemForm?.zone?.uid, systemDetail?.zone?.uid),
  responsible: connectAndDisconnectNode(systemForm?.responsible?.uid, systemDetail?.responsible?.uid),
  systemLevel: systemForm?.systemLevel,
  physicalItem: {
    update: systemDetail?.physicalItem && {
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

export const useSystemUpdate = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { systemDetail, refetch } = useContext(SystemDetailContext)
  const { mutate } = useSystems('systems')
  const onCompleted = ({ updateSystems: { systems } }) => {
    const responseUid = systems[0].uid
    const body = {
      ...systems[0],
      physicalItem: systems[0]?.physicalItem && {
        ...systems[0]?.physicalItem,
        catalogueItem: systems[0]?.physicalItem?.catalogueItem && {
          ...systems[0]?.physicalItem?.catalogueItem,
          category: systems[0]?.physicalItem?.catalogueItem?.catalogueCategory
        }
      },
      responsible: systems[0]?.responsible && {
        uid: systems[0].responsible.uid,
        name: systems[0].responsible.fullName
      }
    }
    imageRef?.current?.submit(responseUid, () => {
      toast.success(`System saved successfully`)
      if (uid) {
        router.back()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
      }
      mutate(prev => prev && updateSystem(uid, body, prev), { revalidate: false })
      refetch()
    })
  }

  const [update, { loading }] = useMutation<Mutation, MutationUpdateSystemsArgs>(UPDATE_SYSTEM, {
    onCompleted,
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  const { newMaintainedBy, newOperators, disconnectOperators, disconnectMaintainedBy } = useSystemItemStore()

  const updateSystemQuery = (systemForm: SystemDetailFormType) => {
    update({
      variables: {
        where: { uid },
        update: {
          ...systemInput({ systemForm, systemDetail }),
          operators: [
            {
              connect: newOperators.map(operator => whereN(operator.uid)),
              disconnect: disconnectOperators.map(operator => whereN(operator.uid))
            }
          ],
          maintainedBy: [
            {
              connect: newMaintainedBy.map(maintainedBy => whereN(maintainedBy.uid)),
              disconnect: disconnectMaintainedBy.map(maintainedBy => whereN(maintainedBy.uid))
            }
          ]
        }
      }
    })
  }

  return { updateSystem: updateSystemQuery, loading, update }
}
