import { gql, useMutation } from '@apollo/client'

const UPDATE_FILTER = gql`
  mutation UpdateFilters($input: [FilterUpdateInput!]!) {
    updateFilters(input: $input) {
      filters {
        uid
      }
    }
  }
`
export const useFilterUpdate = () => {
  const [, B] = useMutation(UPDATE_FILTER)
  return {}
}
