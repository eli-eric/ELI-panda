import { useMutation as useQueryMutation } from '@tanstack/react-query'
import { type MutableRefObject } from 'react'
import { useIntl } from 'react-intl'

import axiosInstance from '@/core/axios/axiosInstance'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { BASE_URL } from '@/types/constants/common'
import { gql } from '@/types/gql'
import type { PhysicalItemProperty } from '@/types/responses/systems'
import { connectAndDisconnectNode, whereN } from '@/utils/graphql/mutations'

import { useRecalculate } from '../../../../systemItem/hooks/useRecalculate'
import { makeSystemInputBody } from '../../../../systemItem/hooks/utils'
import { useSystemItemStore } from '../../../../systemItem/store/useSystemItemStore'
import type { SystemDetailFormType } from '../../../../systemItem/types/form'
import { showErrorToast, showSuccessToast } from '../../../../systemItem/utils/hookHelpers'

// Identical to useSystemUpdate, but can be further customized for sheet edit if needed
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
  const intl = useIntl()

  return useQueryMutation({
    mutationFn: (body: PhysicalItemProperty[]) => {
      return updateItemProperties(uid, body)
    },
    onError: error => {
      showErrorToast(
        intl,
        message.systemsPage.systemDetail.updateModal.onPropertiesError,
        { error: error.toString() }
      )
    }
  })
}

// Sheet update hook: uid is always passed explicitly, never from router
interface UseSystemSheetUpdateProps {
  uid: string
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>
  physicalItemUid?: string
}

export const useSystemSheetUpdate = ({
  uid,
  imageRef,
  physicalItemUid
}: UseSystemSheetUpdateProps) => {
  const intl = useIntl()
  const { mutate: mutateProperties } = usePropertiesUpdate(physicalItemUid)
  const { systemDetail, refetch, physicalItem } = useSuspenseSystemDetail({
    uid
  })

  const { selectedPhysicalSystem, setSelectedPhysicalSystem } =
    useSystemItemStore()

  const onFinish = () => {
    setSelectedPhysicalSystem(undefined)
    showSuccessToast(
      intl,
      message.systemsPage.systemDetail.updateModal.onSuccess
    )
  }
  const { closeModal } = useDynamicModalStore()

  const [recalculate] = useRecalculate({
    onSuccess: onFinish
  })
  const onCompleted = ({ updateSystems: { systems } }) => {
    const responseUid = systems[0].uid
    imageRef?.current?.submit(responseUid, () => {
      recalculate(null)
      // NOTE: Modal is opened with ID `system-edit-${uid}` in useSystemEditSheet.tsx
      closeModal(`system-edit-${uid}`)
      refetch()
    })
  }

  const { mutate: update, isPending } = useGraphQLMutation(
    systemDetailMutation,
    {
      onError: error => {
        console.error('Update system error:', error)
        showErrorToast(
          intl,
          message.systemsPage.systemDetail.updateModal.onError,
          { error: error.message }
        )
      }
    }
  )

  function updateSystemQuery(systemForm: SystemDetailFormType) {
    // Note: operators and maintainedBy are now handled separately via
    // useAddSystemEmployee and useRemoveSystemEmployee hooks.
    // They are no longer part of the main system update mutation.

    const updatePayload = {
      where: { uid },
      update: {
        ...makeSystemInputBody({ systemForm, systemDetail, physicalItem })
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
        onCompleted(response)
        if (systemForm.physicalItem?.properties) {
          mutateProperties(systemForm.physicalItem?.properties)
        }
      }
    })
  }

  return { updateSystem: updateSystemQuery, loading: isPending, update }
}
