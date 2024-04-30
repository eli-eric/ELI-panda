import toast from 'react-hot-toast'

import useTableStateStore from '@/store/useTableStateStore'
import { gql } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useEffect } from 'react'

const GET_SYSTEM_TYPE_GROUPS = gql(`
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
`)

export const useSystemTypeGroups = () => {
  const { instances } = useTableStateStore()
  const columnFilter = instances['systemType-tree']?.columnFilter

  const filterCode = columnFilter?.find(item => item.id === 'code')?.value
  const filterName = columnFilter?.find(item => item.id === 'name')?.value

  const { data, isLoading, error } = useGraphQL(GET_SYSTEM_TYPE_GROUPS)

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch system type groups')
    }
  }, [error])

  return {
    systemTypeGroups: data?.systemTypeGroups,
    loading: isLoading,
    error,
    filter: {
      name: filterName,
      code: filterCode
    }
  }
}
