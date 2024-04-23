import { gql, useMutation } from '@apollo/client'

import { useFilterDetails } from './useFilterDetails'

const createFilterMutation = gql`
  mutation CreateFilterMutation($input: [UserSettingsCreateInput!]!) {
    createUserSettings(input: $input) {
      userSettings {
        key
      }
    }
  }
`
export const useFilterCreate = ({ tableId }: { tableId: string }) => {
  const { refetch } = useFilterDetails(tableId)
  const [createUserSettings, { loading }] = useMutation(createFilterMutation, {
    onCompleted: () => {
      refetch()
    }
  })
  return { createUserSettings, loading }
}
