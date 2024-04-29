import { toast } from 'react-hot-toast'

import { getEndpoints } from '@/hooks/fetch/useEndpoint'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

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
