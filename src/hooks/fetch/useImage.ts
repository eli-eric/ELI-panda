import type { StaticImageData } from 'next/image'
import noImage from 'public/no-image.png'

import useFetch from './useFetch'
export const useImage = (endpoint?: string, useNoImage = true): string | StaticImageData => {
  const { response: image } = useFetch<string>({ url: endpoint, config: { suspense: false } })
  return useNoImage ? image || noImage : image
}
