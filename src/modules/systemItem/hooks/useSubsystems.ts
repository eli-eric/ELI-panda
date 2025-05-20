import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const SUBSYSTEMS_QUERY = gql(`
  query SubSystemDetail($where: SystemWhere) {
    systems(where: $where) {
      uid
      name
      location {
        uid
        name
      }
      physicalItem {
        uid
        name
        itemUsage {
          uid
          name
        }
      }
      sp_coverage
      minimalSpareParstCount
  }
   }
`)

export const useSystemSubsystems = () => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const { data, error, isLoading, status } = useGraphQL(SUBSYSTEMS_QUERY, {
    variables: {
      where: {
        deleted: false,
        parentSystem: {
          uid
        }
      }
    },
    refetchOnMount: 'always',
    refetchOnReconnect: 'always'
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch system detail')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, status, data])

  return {
    subsystems: data?.systems,
    loading: isLoading,
    error
  }
}
