import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import useTableStateStore from '@/store/useTableStateStore'
import type { Query } from '@/types/gql/graphql'

const GET_SYSTEM_TYPE_GROUPS = gql`
  query SystemTypeQuery(
    $systemTypesWhere: SystemTypeWhere
    $where: SystemTypeGroupWhere
  ) {
    systemTypeGroups(where: $where, options: { sort: [{ name: ASC }] }) {
      name
      uid
      systemTypes(
        where: $systemTypesWhere
        options: { sort: [{ name: ASC }] }
      ) {
        name
        code
        uid
      }
    }
  }
`

export const useSystemTypeGroups = () => {
  const { instances } = useTableStateStore()
  const columnFilter = instances['systemType-tree']?.columnFilter

  const filterCode = columnFilter?.find(item => item.id === 'code')?.value
  const filterName = columnFilter?.find(item => item.id === 'name')?.value

  const { data, loading, error } = useQuery<Query>(GET_SYSTEM_TYPE_GROUPS, {
    onError: err => {
      toast.error(err.message)
    }
  })
  return {
    systemTypeGroups: data?.systemTypeGroups,
    loading,
    error,
    filter: {
      name: filterName,
      code: filterCode
    }
  }
}
