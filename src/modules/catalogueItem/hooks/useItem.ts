import { useRouter } from 'next/router'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useImage } from '@/hooks/fetch/useImage'
import type { CatalogueItem } from '@/types/responses'

const useItem = () => {
  const router = useRouter()
  const catalogueUid = router.query.uid as string
  const { catalogueItem, catalogueItemImage } = useEndpoint({
    uid: catalogueUid
  })
  const { response: item, loading, error, mutate } = useFetch<CatalogueItem>({ url: catalogueUid && catalogueItem })
  const image = useImage(catalogueItemImage)

  return { item, loading, error, mutate, image }
}

export default useItem
