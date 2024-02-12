import { gql, useMutation } from '@apollo/client'

const CREATE_FILTER = gql`
  mutation CreateFilters($input: [FilterCreateInput!]!) {
    createFilters(input: $input) {
      filters {
        uid
      }
    }
  }
`
export const useFilterCreate = () => {
  const [, B] = useMutation(CREATE_FILTER)
  return {}
}
