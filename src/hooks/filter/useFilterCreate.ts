import { gql, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { useFormFilterState } from '../form/useFormFilters'
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
export const useFilterCreate = ({ tableId, name }: { tableId: string; name: string }) => {
  const { storeFilters } = useFormFilterState({ tableId })
  const user = useSession().data?.user
  const { refetch } = useFilterDetails(tableId)
  const [createUserSettings, settings] = useMutation(CREATE_FILTER, {
    onCompleted: () => {
      refetch()
    }
  })
  return { createUserSettings, settings }
}
