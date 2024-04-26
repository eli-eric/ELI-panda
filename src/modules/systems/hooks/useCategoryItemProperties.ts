import { toast } from 'react-hot-toast'

import { getEndpoints } from '@/hooks/fetch/useEndpoint'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import { useQuery } from 'react-query'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

const getItemProperties = (uid?: string) => {
  const { cataloguePhysicalItemProperties } = getEndpoints(uid)

  return axiosInstance
    .get(BASE_URL + cataloguePhysicalItemProperties)
    .then(res => res.data)
}

export const useCategoryItemProperties = (uid?: string) => {
  return useQuery<CatalogueItemDetail[]>(
    ['properties', uid],
    () => getItemProperties(uid),
    {
      onError: error => {
        toast.error('Failed to fetch item properties: ' + error)
      },
      enabled: !!uid,
      keepPreviousData: true
    }
  )
}
