import { gql, useMutation } from '@apollo/client'

const deleteFilterMutation = gql`
  mutation DeleteFilterMutation($where: UserSettingsWhere) {
    deleteUserSettings(where: $where) {
      nodesDeleted
    }
  }
`
export const useFilterDelete = () => {
  const [deleteSavedFilter, { loading }] = useMutation(deleteFilterMutation)
  return { deleteSavedFilter, loading }
}
