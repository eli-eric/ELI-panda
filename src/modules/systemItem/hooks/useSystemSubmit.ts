import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { PATH } from '@/types/constants/paths'

export const useSystemSubmit = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { system: systemEndpoint } = useEndpoint({ uid })
  //const { mutate } = useSystems()
  //const { mutate: mutateDetail } = useSystemDetail()

  const { submit, loading: loadingSubmit } = useSubmit<string>({
    endpoint: systemEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: responseUid => {
      imageRef?.current?.submit(responseUid, () => {
        toast.success(`System ${responseUid} saved successfully`)
        if (uid) {
          router.back()
        } else {
          router.replace(PATH.SYSTEM + '/' + responseUid)
        }
      })
    },
    onError: e => toast.error(e.message)
  })

  return { submit, loadingSubmit }
}
