import type { PhysicalItemProperty } from '@/modules/systems/types/responses'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryFetcher } from '@/utils/fetcher'

export const useItemProperties = (uid?: string) => {
  const response = useQuery<PhysicalItemProperty[]>({
    queryKey: ['physical-item', { uid }, 'properties'],
    queryFn: queryFetcher('physicalItemProperties'),
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
