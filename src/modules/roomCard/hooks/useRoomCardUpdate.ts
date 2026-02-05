import { useQueryClient } from '@tanstack/react-query'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { navigateBack } from '@/utils'

import type { RoomCardFormType } from '../types/form'
import { hasOperationalStateChanged, updateRoomCardVariables } from '../utils'
import { useRoomCard } from './useRoomCard'

const updateRoomCardMutation = gql(`
  mutation UpdateRoomCardMutation(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
    $node: String
    $nodeUid: String
    $action: String
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
        purityClass
        name
        status
        operationalState {
          name
          uid
          code
        }
        operationalStateLastUpdated
        prescribedClothing
        entryToHvacTent
        cleaningScheduleDate
        cleaningScheduleDays
        additionalRequirements
        coolingWater
        indoorEnvironmentQuality
        compressedAirDistribution
        nitrogenCentralDistribution
        maxPressureInColdDistribution
        coolingWaterClient
        indoorEnvironmentQualityClient
        compressedAirDistributionClient
        nitrogenCentralDistributionClient
        maxPressureInColdDistributionClient
        locations {
          uid
          code
          name
        }
        contactPersonsHall {
          uid
          role {
            uid
            name
          }
          employee {
            uid
            fullName
            phone1
            phone2
          }
        }
        contactPersonsDept {
          uid
          fullName
          phone1
          phone2
        }
        teams {
          name
          uid
        }
      }
    }
    updatedByResolver(
      node: $node
      nodeUid: $nodeUid
      action: $action
    )
  }
`)

const updateOperationalStateMutation = gql(`
  mutation UpdateOperationalStateMutation(
    $node: String
    $nodeUid: String
    $action: String
    $previousState: String
    $newState: String
  ) {
    updatedByResolver(
      node: $node
      nodeUid: $nodeUid
      action: $action
      previousState: $previousState
      newState: $newState
    )
  }
`)

export const useRoomCardUpdate = (roomCardUid?: string) => {
    const queryClient = useQueryClient()
    const { mutateAsync: update } = useGraphQLMutation(updateRoomCardMutation)
    const { mutateAsync: updateOpState } = useGraphQLMutation(updateOperationalStateMutation)
    const { roomCard: roomCardOrigin } = useRoomCard(roomCardUid)

    const updateRoomCard = (roomCardForm: RoomCardFormType, saveAndExit: boolean) => {
        // Contacts and Locations are now handled separately via direct mutations
        const variables = updateRoomCardVariables({
            uid: roomCardUid,
            roomCard: roomCardForm,
            originalOperationalState: roomCardOrigin?.operationalState,
        })

        // Prepare data for UPDATE action (without previousState/newState)
        const updateData = {
            node: 'RoomCard',
            nodeUid: roomCardUid || '',
            action: 'UPDATE',
        }

        return update(
            {
                ...variables,
                ...updateData,
            },
            {
                onSuccess: async data => {
                    const updatedRoomCard = data.updateRoomCards.roomCards[0]

                    // Update RoomCardQuery cache with server response
                    queryClient.setQueriesData({ queryKey: ['RoomCardQuery'] }, (old: any) => {
                        if (!old?.roomCards?.[0]) return old
                        return {
                            ...old,
                            roomCards: [{ ...old.roomCards[0], ...updatedRoomCard }],
                        }
                    })

                    // Update RoomCardsQuery cache with server response
                    queryClient.setQueriesData({ queryKey: ['RoomCardsQuery'] }, (old: any) => {
                        if (!old?.roomCards) return old
                        return {
                            ...old,
                            roomCards: old.roomCards.map((rc: any) =>
                                rc.uid === roomCardUid ? { ...rc, ...updatedRoomCard } : rc,
                            ),
                        }
                    })

                    // Invalidate to trigger background refetch for fresh data
                    queryClient.invalidateQueries({
                        queryKey: ['RoomCardsQuery'],
                        refetchType: 'none',
                    })

                    // If operational state changed, create a separate history entry
                    if (
                        hasOperationalStateChanged(
                            roomCardOrigin?.operationalState,
                            roomCardForm.operationalState,
                        )
                    ) {
                        await updateOpState({
                            node: 'RoomCard',
                            nodeUid: roomCardUid || '',
                            action: 'OPERATION_STATE',
                            previousState: roomCardOrigin?.operationalState?.code || '',
                            newState: roomCardForm.operationalState?.code || '',
                        })
                    }

                    if (saveAndExit) {
                        navigateBack()
                    }
                },
            },
        )
    }

    return { updateRoomCard }
}
