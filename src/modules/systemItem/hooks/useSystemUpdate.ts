import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { mutate as mutateEndpoint } from 'swr'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { updateSubSystem, updateSystem } from '@/modules/systems/utils'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'
import type { Mutation } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'
import { connectAndDisconnectNode, whereN } from '@/utils/graphql/mutations'
import { makeSystemInputBody } from './utils'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'
import { navigateBack } from '@/utils'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import { useMutation as useQueryMutation } from 'react-query'
import type { PhysicalItemProperty } from '@/modules/systems/types/responses'

const UPDATE_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  mutation UpdateSystems(
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
`

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
  const { systemDetail, refetch } = useContext(SystemDetailContext)
  const { mutate } = useSystems('systems')
  const { systemSubsystems } = useEndpoint({
    uid: systemDetail?.parentSystem?.uid || ''
  })

  const {
    newMaintainedBy,
    newOperators,
    disconnectOperators,
    disconnectMaintainedBy,
    selectedPhysicalSystem,
    setSelectedPhysicalSystem
  } = useSystemItemStore()

  const onCompleted = (
    { updateSystems: { systems } },
    saveAndExit?: boolean
  ) => {
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
      mutateEndpoint(
        systemSubsystems,
        prev => prev && updateSubSystem(prev, body),
        { revalidate: false }
      )
      mutate(prev => prev && updateSystem(uid, body, prev), {
        revalidate: false
      })
      if (selectedPhysicalSystem) {
        mutateEndpoint(
          systemSubsystems,
          prev =>
            prev &&
            updateSubSystem(prev, {
              ...selectedPhysicalSystem,
              physicalItem: undefined
            }),
          { revalidate: false }
        )
        mutate(
          prev =>
            prev &&
            updateSystem(
              selectedPhysicalSystem?.uid,
              { ...selectedPhysicalSystem, physicalItem: undefined },
              prev
            ),
          { revalidate: false }
        )
      }
      refetch()
      setSelectedPhysicalSystem(undefined)
      if (saveAndExit) {
        navigateBack()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
      }
    })
  }

  const [update, { loading }] = useMutation<Mutation>(UPDATE_SYSTEM, {
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  const updateSystemQuery = (
    systemForm: SystemDetailFormType,
    saveAndExit?: boolean
  ) => {
    update({
      variables: {
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
      onCompleted: response => {
        onCompleted(response, saveAndExit)
        if (systemForm.physicalItem?.properties) {
          mutateProperties(systemForm.physicalItem?.properties)
        }
      }
    })
  }

  return { updateSystem: updateSystemQuery, loading, update }
}
