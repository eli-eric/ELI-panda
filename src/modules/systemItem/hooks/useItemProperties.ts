import axiosInstance from '@/core/axios/axiosInstance'
import type { PhysicalItemProperty } from '@/modules/systems/types/responses'
import { BASE_URL } from '@/types/constants/common'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

const getItemProperties = async (uid?: string) => {
  const endpoint = `/physical-item/${uid}/properties`
  return axiosInstance.get(BASE_URL + endpoint).then(res => res.data)
}

export const useItemProperties = (uid?: string) => {
  return useQuery<PhysicalItemProperty[]>(
    ['physical-item', uid, 'properties'],
    () => getItemProperties(uid),
    {
      enabled: !!uid,
      retry: false,
      onError: error => {
        toast.error('Failed to fetch item properties: ' + error)
      }
    }
  )
}
