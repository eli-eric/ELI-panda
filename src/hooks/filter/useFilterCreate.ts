import { gql } from '@/types/gql'

import { useGraphQLMutation } from '../fetch/useGraphQL'
import { useFilterDetails } from './useFilterDetails'

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
