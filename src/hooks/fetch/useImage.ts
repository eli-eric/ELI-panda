import type { StaticImageData } from 'next/image'

import type { FileItem } from '@/modules/shared/fileManager/types'
import { fetcher } from '@/utils/fetcher'

import { useQuery } from '@tanstack/react-query'

//deprecated

const fallbackImage: FileItem = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png',
  size: 0
}
export const useImage = (
  endpoint?: string | null,
  useNoImage = true
): string | StaticImageData => {
  const { data: image } = useQuery<string>({
    queryKey: [endpoint],
    queryFn: () => fetcher(endpoint),
    enabled: !!endpoint
  })

  return image ? image : useNoImage ? fallbackImage.url : ''
}
