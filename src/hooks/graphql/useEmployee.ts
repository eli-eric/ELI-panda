import { gql } from '@/types/gql'
import { useGraphQL } from '../fetch/useGraphQL'

const GET_EMPLOYEE = gql(`
  query GetEmployee($uid: ID!) {
    employees(where: { uid: $uid }) {
      uid
      fullName
      firstName
      facility {
        code
        name
      }
      lastName
      phone1
      phone2
    }
  }
`)

export const useEmployee = (uid?: string | null) => {
  const { data, isLoading } = useGraphQL(GET_EMPLOYEE, {
    variables: { uid: uid || '' },
    enabled: !!uid
  })

  return { employee: data?.employees[0], isLoading }
}
