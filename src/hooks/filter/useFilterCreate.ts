import { useFilterDetails } from './useFilterDetails'
import { useGraphQLMutation } from '../fetch/useGraphQL'
import { gql } from '@/types/gql'

const createFilterMutation = gql(`
  mutation CreateFilterMutation($input: [UserSettingsCreateInput!]!) {
    createUserSettings(input: $input) {
      userSettings {
        key
      }
    }
  }
`)
export const useFilterCreate = ({ tableId }: { tableId: string }) => {
  const { refetch } = useFilterDetails(tableId)
  const { mutate, isPending } = useGraphQLMutation(createFilterMutation, {
    onSuccess: () => {
      refetch()
    }
  })

  return { createUserSettings: mutate, loading: isPending }
}
