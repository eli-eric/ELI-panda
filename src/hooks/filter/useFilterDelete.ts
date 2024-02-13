import { gql, useMutation } from '@apollo/client'

const DELETE_FILTER = gql`
  mutation Mutation($where: UserSettingsWhere) {
    deleteUserSettings(where: $where) {
      nodesDeleted
    }
  }
`
export const useFilterDelete = () => {
  const [deleteSavedFilter, { loading }] = useMutation(DELETE_FILTER)
  return { deleteSavedFilter, loading }
}
