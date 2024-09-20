import { useMutation as useQueryMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { type MutableRefObject, useState } from 'react'
import { toast } from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { BASE_URL } from '@/types/constants/common'
import { gql } from '@/types/gql'
import type { PhysicalItemProperty } from '@/types/responses/systems'
import { navigateBack } from '@/utils'
import { connectAndDisconnectNode, whereN } from '@/utils/graphql/mutations'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'
import { useRecalculate } from './useRecalculate'
import { useSystemDetail } from './useSystemDetail'
import { makeSystemInputBody } from './utils'

const systemDetailMutation = gql(`
  mutation UpdateSystemMutation(
    $where: SystemWhere
    $update: SystemUpdateInput!
    $updateItemsWhere: ItemWhere
    $updateItem: ItemUpdateInput
    $node: String
    $nodeUid: String
    $action: String
    $itemUid: String
    $systemOriginatedUid: String
  ) {
    updateItems(where: $updateItemsWhere, update: $updateItem) {
      items {
        name
      }
    }
    updateSystems(where: $where, update: $update) {
      systems {
        ...SystemDetail
      }
    }
    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action)
    itemOriginatedResolver(
      itemUid: $itemUid
      systemOriginatedUid: $systemOriginatedUid
    )
  }
`)

const updateItemProperties = async (
  uid: string,
  body: PhysicalItemProperty[]
) => {
  const endpoint = `/physical-item/${uid}/properties`
  return axiosInstance.put(BASE_URL + endpoint, body).then(res => res.data)
}

const usePropertiesUpdate = uid => {
  return useQueryMutation({
    mutationFn: (body: PhysicalItemProperty[]) => {
      return updateItemProperties(uid, body)
    },
    onError: error => {
      toast.error('Failed to update physical Item properties: ' + error)
    }
  })
}

export const useSystemUpdate = (
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>,
  physicalItemUid?: string
) => {
  const router = useRouter()
  const { mutate: mutateProperties } = usePropertiesUpdate(physicalItemUid)
  const uid = router.query.uid as string
  const { systemDetail } = useSystemDetail()

  const [saveAndExit, setSaveAndExit] = useState(false)

  const onFinish = () => {
    setSelectedPhysicalSystem(undefined)
    if (saveAndExit) {
      navigateBack()
    } else {
      router.reload()
    }
    toast.success(`System saved successfully`)
  }

  const [recalculate] = useRecalculate({
    onSuccess: onFinish
  })

  const {
    newMaintainedBy,
    newOperators,
    disconnectOperators,
    disconnectMaintainedBy,
    selectedPhysicalSystem,
    setSelectedPhysicalSystem
  } = useSystemItemStore()

  const onCompleted = ({ updateSystems: { systems } }) => {
    const responseUid = systems[0].uid
    imageRef?.current?.submit(responseUid, () => {
      recalculate(null)
    })
  }

  const { mutate: update, isPending } = useGraphQLMutation(
    systemDetailMutation,
    {
      onError: error => {
        toast.error('Something went wrong: ' + error.message)
      }
    }
  )

  const updateSystemQuery = (
    systemForm: SystemDetailFormType,
    saveAndExit: boolean
  ) => {
    setSaveAndExit(saveAndExit)
    update(
      {
        where: { uid },
        update: {
          ...makeSystemInputBody({ systemForm, systemDetail }),
          operators: [
            {
              connect: newOperators.map(operator => whereN(operator.uid)),
              disconnect: disconnectOperators.map(operator =>
                whereN(operator.uid)
              )
            }
          ],
          maintainedBy: [
            {
              connect: newMaintainedBy.map(maintainedBy =>
                whereN(maintainedBy.uid)
              ),
              disconnect: disconnectMaintainedBy.map(maintainedBy =>
                whereN(maintainedBy.uid)
              )
            }
          ]
        },
        updateItemsWhere: {
          uid: selectedPhysicalSystem?.physicalItem?.uid
            ? selectedPhysicalSystem?.physicalItem?.uid
            : null
        },
        updateItem: {
          system: {
            connect: whereN(uid),
            disconnect: whereN(selectedPhysicalSystem?.uid)
          },
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
        },
        node: 'System',
        nodeUid: uid,
        action: 'UPDATE',
        itemUid: selectedPhysicalSystem?.physicalItem?.uid,
        systemOriginatedUid: selectedPhysicalSystem?.uid
      },
      {
        onSuccess: response => {
          onCompleted(response)
          if (systemForm.physicalItem?.properties) {
            mutateProperties(systemForm.physicalItem?.properties)
          }
        }
      }
    )
  }

  return { updateSystem: updateSystemQuery, loading: isPending, update }
}
