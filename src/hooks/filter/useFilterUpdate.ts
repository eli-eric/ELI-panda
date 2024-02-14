import { gql, useMutation } from '@apollo/client'

const UPDATE_FILTER = gql`
  mutation Mutation($where: UserSettingsWhere, $update: UserSettingsUpdateInput) {
    updateUserSettings(where: $where, update: $update) {
      userSettings {
        name
        uid
      }
    }
  }
`
export const useFilterUpdate = (uid, value) => {
  const [updateSavedFilter, { loading }] = useMutation(UPDATE_FILTER, {
    variables: {
      input: {
        where: {
          uid
        },
        update: {
          value: JSON.stringify(value)
        }
      }
    }
  })
  return { updateSavedFilter, loading }
}
