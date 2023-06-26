import type { StaticImageData } from 'next/image'
import noImage from 'public/no-image.png'
import useSWR from 'swr'

import { uniFetcher } from '@/helpers/fetcher'
import type { FileItem } from '@/modules/shared/fileManager/types'
import { FILE_TYPE } from '@/types/constants/files'

import { getEndpoint } from './../../modules/shared/imageManager/utils/index'
import useFetch from './useFetch'

//deprecated

const fallbackImage: FileItem = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png'
}
export const useImage = (endpoint?: string | null, useNoImage = true): string | StaticImageData => {
  const { response: image } = useFetch<string>({ url: endpoint, config: { suspense: false } })
  return useNoImage ? image || noImage : image
}

export const useCatalogueImage = uid => {
  const ep = getEndpoint(FILE_TYPE.CATALOGUE, uid, 'image')
  const { data } = useSWR<FileItem[]>(ep, uniFetcher, {
    suspense: false,
    revalidateOnMount: true
  })
  return data && data.length > 0 ? data[0] : fallbackImage
}
