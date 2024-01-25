import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

export const useCategoryProperties = (uid?: string) => {
  const { catalogueCategoryProperties } = useEndpoint({ uid })

  const { response } = useFetch<CatalogueItemDetail[]>({
    url: uid && catalogueCategoryProperties,
    onError: () => {
      toast.error('Failed to load group details')
    },
    onSuccess: data => {
      toast.success('Group details loaded')
      console.log(data)
    },
    config: {
      suspense: false
    }
  })

  return { catalogueCategoryProperties: response }
}
