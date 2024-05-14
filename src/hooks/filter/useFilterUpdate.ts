import { gql } from '@/types/gql'
import { useGraphQLMutation } from '../fetch/useGraphQL'

const UPDATE_FILTER = gql(`
  mutation UpdateFilterMutation(
    $where: UserSettingsWhere
    $update: UserSettingsUpdateInput
  ) {
    updateUserSettings(where: $where, update: $update) {
      userSettings {
        name
        uid
        value
      }
    }
  }
`)
export const useFilterUpdate = () => {
  const { mutate, isPending } = useGraphQLMutation(UPDATE_FILTER)

  return { updateSavedFilter: mutate, loading: isPending }
}
