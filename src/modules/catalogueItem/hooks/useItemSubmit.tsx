import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/components/ImageGallery'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import { PATH } from '@/types/constants/paths'

const useItemSubmit = (gallery?: ImageGalleryRef) => {
  const { back, replace, query } = useRouter()
  const uid = query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })

  const { response, submit, loading } = useSubmit<string>({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    mutateList: [catalogueItem],
    onSuccess: async response => {
      toast.success('Item saved')
      await gallery?.submit(uid || response)
      if (uid) {
        back()
      } else {
        replace(PATH.CATALOGUE_ITEM + '/' + uid)
      }
    },
    onError: response => {
      toast.error('Error saving item')
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
