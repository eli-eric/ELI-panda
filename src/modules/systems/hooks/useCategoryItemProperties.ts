import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import axiosInstance from '@/core/axios/axiosInstance'
import { getEndpoints } from '@/hooks/fetch/useEndpoint'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { BASE_URL } from '@/types/constants/common'

const getItemProperties = props => {
  const { queryKey } = props
  const { cataloguePhysicalItemProperties } = getEndpoints(queryKey[1])

  return axiosInstance
    .get(BASE_URL + cataloguePhysicalItemProperties)
    .then(res => res.data)
}

export const useCategoryItemProperties = (uid?: string) => {
  const response = useQuery<CatalogueItemDetail[]>({
    queryKey: ['properties', uid],
    queryFn: getItemProperties,
    placeholderData: keepPreviousData,
    enabled: !!uid
  })

  useEffect(() => {
    if (response.isError) {
      toast.error('Failed fetch properties')
    }
  }, [response.isError])

  return response
}
