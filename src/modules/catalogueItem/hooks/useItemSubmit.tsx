import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'
import { mutate } from 'swr'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { PATH } from '@/types/constants/paths'

const useItemSubmit = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const { query, replace, back } = useRouter()
  const uid = query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })

  const { response, submit, loading } = useSubmit<string>({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    onSuccess: (responseUid, data, custom) => {
      imageRef?.current?.submit(responseUid, () => {
        toast.success('Item saved')
        if (custom?.saveAndExit) {
          back()
        } else {
          replace(PATH.CATALOGUE_ITEM + '/' + responseUid)
        }
      })
      mutate(
        key => typeof key === 'string' && key.startsWith('/catalogue/items'),
        prev => ({
          ...prev,
          data: prev.data.map(item => {
            if (item.uid === responseUid) {
              return { uid: uid, ...data }
            }
            return item
          })
        }),
        { revalidate: false }
      )
      mutate(catalogueItem, () => ({ uid: uid, ...data }), { revalidate: false })
    },
    onError: () => {
      toast.error('Error saving item')
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
