import type { ApolloCache, DefaultContext, MutationTuple, OperationVariables } from '@apollo/client'
import { gql, useMutation } from '@apollo/client'

import type { Mutation } from '../../../types/gql/graphql'

const UPDATE_ROOM_CARD = gql`
  mutation Mutation($where: RoomCardWhere, $update: RoomCardUpdateInput) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
      }
    }
  }
`

export const useRoomCardUpdate = (): MutationTuple<Mutation, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const mutate = useMutation<Mutation>(UPDATE_ROOM_CARD)

  return mutate
}
