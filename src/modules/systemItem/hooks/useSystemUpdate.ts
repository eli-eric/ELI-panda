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
  const { systemDetail, refetch, physicalItem } = useSystemDetail()

  const [saveAndExit, setSaveAndExit] = useState(false)

  const onFinish = () => {
    setSelectedPhysicalSystem(undefined)
    refetch()

    if (saveAndExit) {
      toast.success('Would navigate back, but staying on page to see payload')
      navigateBack()
    } else {
      toast.success('Would reload page, but staying to see payload')
      //router.reload()
    }
    toast.success(`System saved successfully`)
  }

  const [recalculate] = useRecalculate({
    onSuccess: onFinish
  })

  const {
    selectedPhysicalSystem,
    setSelectedPhysicalSystem,
    clear: clearStore
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
        // eslint-disable-next-line no-console
        console.log('Error:', error)
        toast.error('Something went wrong: ' + error.message)
      }
    }
  )

  function updateSystemQuery(
    systemForm: SystemDetailFormType,
    saveAndExit: boolean
  ) {
    setSaveAndExit(saveAndExit)

    // Get latest data directly from the store to avoid stale closure values
    const storeData = useSystemItemStore.getState()
    const {
      newOperators,
      newMaintainedBy,
      disconnectOperators,
      disconnectMaintainedBy
    } = storeData

    // Get operators from both form and store
    const formOperators = systemForm?.operators || []
    const allOperators = [...formOperators, ...newOperators]
    const uniqueOperators = [
      ...new Map(allOperators.map(op => [op.uid, op])).values()
    ]

    // Get maintainedBy from both form and store
    const formMaintainedBy = systemForm?.maintainedBy || []
    const allMaintainedBy = [...formMaintainedBy, ...newMaintainedBy]
    const uniqueMaintainedBy = [
      ...new Map(allMaintainedBy.map(emp => [emp.uid, emp])).values()
    ]

    // Extract UIDs from disconnect arrays to prevent duplicate node connections
    const disconnectOperatorUids = disconnectOperators.map(op => op.uid)
    const disconnectMaintainedByUids = disconnectMaintainedBy.map(
      emp => emp.uid
    )

    // Make sure we don't try to connect and disconnect the same node
    const filteredOperators = uniqueOperators.filter(
      op => !disconnectOperatorUids.includes(op.uid)
    )
    const filteredMaintainedBy = uniqueMaintainedBy.filter(
      emp => !disconnectMaintainedByUids.includes(emp.uid)
    )

    const updatePayload = {
      where: { uid },
      update: {
        ...makeSystemInputBody({ systemForm, systemDetail, physicalItem }),
        operators: [
          {
            connect: filteredOperators.map(operator => whereN(operator.uid)),
            disconnect: disconnectOperators.map(operator =>
              whereN(operator.uid)
            )
          }
        ],
        maintainedBy: [
          {
            connect: filteredMaintainedBy.map(maintainedBy =>
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
          physicalItem?.itemUsage?.uid
        ),
        conditionStatus: connectAndDisconnectNode(
          systemForm?.physicalItem?.conditionStatus?.uid,
          physicalItem?.conditionStatus?.uid
        )
      },
      node: 'System',
      nodeUid: uid,
      action: 'UPDATE',
      itemUid: selectedPhysicalSystem?.physicalItem?.uid,
      systemOriginatedUid: selectedPhysicalSystem?.uid
    }

    update(updatePayload, {
      onSuccess: response => {
        clearStore()
        onCompleted(response)
        if (systemForm.physicalItem?.properties) {
          mutateProperties(systemForm.physicalItem?.properties)
        }
      }
    })
  }

  return { updateSystem: updateSystemQuery, loading: isPending, update }
}
