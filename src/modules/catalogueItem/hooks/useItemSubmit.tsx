import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { PATH } from '@/types/constants/paths'

const useItemSubmit = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const { query, back, push } = useRouter()
  const uid = query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })
  const { mutate } = useCatalogueItems()

  const { response, submit, loading } = useSubmit<string>({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    mutateList: [catalogueItem],
    onSuccess: responseUid => {
      imageRef?.current?.submit(responseUid, () => {
        toast.success('Item saved')
        if (uid) {
          back()
        } else {
          push(PATH.CATALOGUE_ITEM + '/' + responseUid)
        }
      })
      mutate()
    },
    onError: () => {
      toast.error('Error saving item')
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
