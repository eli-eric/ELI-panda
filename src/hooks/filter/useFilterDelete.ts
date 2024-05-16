import { gql } from '@/types/gql'

import { useGraphQLMutation } from '../fetch/useGraphQL'

const deleteFilterMutation = gql(`
  mutation DeleteFilterMutation($where: UserSettingsWhere) {
    deleteUserSettings(where: $where) {
      nodesDeleted
    }
  }
`)
export const useFilterDelete = () => {
  const { mutate, isPending } = useGraphQLMutation(deleteFilterMutation)
  return { deleteSavedFilter: mutate, loading: isPending }
}
