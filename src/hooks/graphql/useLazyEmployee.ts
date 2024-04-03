import type { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { gql, useLazyQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'

import type { Employee, Query } from '@/types/gql/graphql'

const GET_EMPLOYEE = gql`
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
`

export const useLazyEmployee = (): [LazyQueryExecFunction<Query, OperationVariables>, Employee | undefined] => {
  const [getEployee, { data }] = useLazyQuery<Query>(GET_EMPLOYEE, {
    onError: () => {
      toast.error(`Something went wrong with fetch employee!`)
    }
  })

  return [getEployee, data?.employees[0]]
}
