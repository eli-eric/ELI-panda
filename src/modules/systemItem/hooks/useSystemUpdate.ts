import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { systemsRefresh } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'
import type { Mutation, MutationUpdateSystemsArgs } from '@/types/gql/graphql'
import { connectAndDisconnectNode } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'
import { useSystemDetail } from './useSystemDetail'

const UPDATE_SYSTEM = gql`
  mutation UpdateSystems($where: SystemWhere, $update: SystemUpdateInput!) {
    updateSystems(where: $where, update: $update) {
      systems {
        name
        uid
      }
    }
  }
`

const systemInput = ({ systemForm, systemDetail }: { systemForm; systemDetail }) => ({
  name: systemForm.name,
  description: systemForm.description,
  systemCode: systemForm.systemCode,
  systemAlias: systemForm.systemAlias,
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
  const { systemDetail, refetch } = useSystemDetail()
  const { mutate } = useSystems('systems')

  const onCompleted = ({ updateSystems: { systems } }) => {
    const responseUid = systems[0].uid
    imageRef?.current?.submit(responseUid, () => {
      toast.success(`System ${responseUid} saved successfully`)
      if (uid) {
        router.back()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
      }
      mutate(systemsRefresh, { revalidate: false })

      refetch()
    })
  }

  const [update, { loading }] = useMutation<Mutation, MutationUpdateSystemsArgs>(UPDATE_SYSTEM, {
    onCompleted
  })

  const updateSystemQuery = (systemForm: SystemDetailFormType) => {
    update({
      variables: {
        where: { uid },
        update: systemInput({ systemForm, systemDetail })
      }
    })
  }

  return { updateSystem: updateSystemQuery, loading }
}
