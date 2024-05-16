import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import type { PhysicalItemProperty } from '@/types/responses/systems'

const getItemProperties = async (uid?: string) => {
  const endpoint = `/physical-item/${uid}/properties`
  return axiosInstance.get(BASE_URL + endpoint).then(res => res.data)
}

export const useItemProperties = (uid?: string) => {
  const response = useQuery<PhysicalItemProperty[]>({
    queryKey: ['physical-item', uid, 'properties'],
    queryFn: () => getItemProperties(uid),
    enabled: !!uid,
    retry: false
  })

  useEffect(() => {
    if (response.isError) {
      toast.error('Failed to fetch item properties')
    }
  }, [response.isError])

  return response
}
