import {
  useMutation as useQueryMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { updateSubSystem, updateSystem } from '@/modules/systems/utils'
import { BASE_URL } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import { gql } from '@/types/gql'
import type {
  PhysicalItemProperty,
  SystemDetail,
  SystemsResponse
} from '@/types/responses/systems'
import { navigateBack } from '@/utils'
import { connectAndDisconnectNode, whereN } from '@/utils/graphql/mutations'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'
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
  const { systemDetail, refetch } = useSystemDetail()
  const { queryKey } = useSystems('systems')

  const queryClient = useQueryClient()

  const queryKeySubsystems = [
    'subsystems',
    {
      uid: systemDetail?.parentSystem?.uid || ''
    }
  ]

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
    refetch()
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
      queryClient.setQueriesData<SystemDetail[]>(
        { queryKey: ['subsystems'], exact: false },
        prev => {
          if (prev) {
            return updateSubSystem(prev, body)
          }
          return prev
        }
      )

      if (selectedPhysicalSystem) {
        queryClient.setQueryData<SystemDetail[]>(queryKeySubsystems, prev => {
          if (prev) {
            return updateSubSystem(prev, {
              ...selectedPhysicalSystem,
              physicalItem: undefined
            })
          }
          return prev
        })

        queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
          if (prev) {
            return updateSystem(
              selectedPhysicalSystem?.uid,
              { ...selectedPhysicalSystem, physicalItem: undefined },
              prev
            )
          }
          return prev
        })
      } else {
        //TODO: fix mutation in deeper hierarchy
        queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
          console.log('prev', prev)
          if (prev) {
            return updateSystem(uid, body, prev)
          }
          return prev
        })
      }
      setSelectedPhysicalSystem(undefined)
      if (saveAndExit) {
        navigateBack()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
      }
      toast.success(`System saved successfully`)
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
    saveAndExit?: boolean
  ) => {
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
          onCompleted(response, saveAndExit)
          if (systemForm.physicalItem?.properties) {
            mutateProperties(systemForm.physicalItem?.properties)
          }
        }
      }
    )
  }

  return { updateSystem: updateSystemQuery, loading: isPending, update }
}
