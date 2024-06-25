import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { PATH } from '@/types/constants/paths'
import { navigateBack } from '@/utils'

const useItemSubmit = (
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>
) => {
  const { query, replace } = useRouter()
  const uid = query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })
  const { refetch } = useCatalogueItems()

  const { response, submit, loading } = useSubmit<string>({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    onSuccess: (responseUid, data, custom) => {
      imageRef?.current?.submit(responseUid, () => {
        toast.success('Item saved')
        if (custom?.saveAndExit) {
          navigateBack()
          refetch()
        } else {
          replace(PATH.CATALOGUE_ITEM + '/' + responseUid)
          refetch()
        }
      })
    },
    onError: () => {
      toast.error('Error saving item')
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
