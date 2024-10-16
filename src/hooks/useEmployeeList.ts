import { gql } from '@/types/gql'

import { useGraphQL } from './fetch/useGraphQL'

const eployeeQuery = gql(`
query Query($where: EmployeeWhere) {
  employees(where: $where) {
    fullName
    jobPosition
    email
    phone1
    workplaceName
    facility {
      name
    }
  }
}
`)

export const useEmployeeList = (locationCode?: string) => {
  const employeeQuery = useGraphQL(eployeeQuery, {
    variables: {
      where: {
        workplaceName_CONTAINS: locationCode
      }
    }
  })

  return employeeQuery
}
