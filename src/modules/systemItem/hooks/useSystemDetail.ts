import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { gql, useFragment } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useRouter } from 'next/router'
import {
  CatalogueItemFragment,
  SystemDetailFragment
} from '@/utils/graphql/fragments'
import { useEffect } from 'react'

const systemDetailQuery = gql(`
  query SystemDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
  }
   }
`)

export const useSystemDetail = (alias?: string, onSuccess?: (data) => void) => {
  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const { system: systemEndpoint } = useEndpoint({ uid })

  const { data, error, isLoading, refetch, status } = useGraphQL(
    systemDetailQuery,
    {
      where: { uid, systemCode: alias }
    },
    {
      enabled: !!uid
    }
  )

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch system detail')
    }
    if (status === 'success') {
      onSuccess?.(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, status, data])

  const systemDetail = useFragment(SystemDetailFragment, data?.systems[0])
  const physicalItem = systemDetail?.physicalItem
  const catalogueItem = useFragment(
    CatalogueItemFragment,
    physicalItem?.catalogueItem
  )

  return {
    systemDetail,
    physicalItem,
    catalogueItem,
    loading: isLoading,
    error,
    refetch,
    systemEndpoint
  }
}
