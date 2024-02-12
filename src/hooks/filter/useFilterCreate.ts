import { gql, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { useFormFilterState } from '../form/useFormFilters'

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
  const [createUserSettings, settings] = useMutation(CREATE_FILTER, {
    variables: {
      input: [
        {
          key: `filter-${tableId}-${name}`,
          value: JSON.stringify(storeFilters),
          user: {
            connect: {
              where: {
                node: {
                  uid: user?.uid
                }
              }
            }
          }
        }
      ]
    }
  })
  return { createUserSettings, settings }
}
