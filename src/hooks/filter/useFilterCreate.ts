import { gql, useMutation } from '@apollo/client'

import { useFilterDetails } from './useFilterDetails'

const CREATE_FILTER = gql`
  mutation Mutation($input: [UserSettingsCreateInput!]!) {
    createUserSettings(input: $input) {
      userSettings {
        key
      }
    }
  }
`
export const useFilterCreate = ({ tableId }: { tableId: string }) => {
  const { refetch } = useFilterDetails(tableId)
  const [createUserSettings, { loading }] = useMutation(CREATE_FILTER, {
    onCompleted: () => {
      refetch()
    }
  })
  return { createUserSettings, loading }
}
