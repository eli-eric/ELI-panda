import { StaticImageData } from 'next/image'
import noImage from 'public/no-image.png'
import useSWR from 'swr'

import { fetcher } from '@/helpers/fetcher'
export const useImage = (endpoint?: string, useNoImage = true): string | StaticImageData => {
  const { data: image } = useSWR(endpoint, fetcher, { suspense: false })
  return useNoImage ? image || noImage : image
}
