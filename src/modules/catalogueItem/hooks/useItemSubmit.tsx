import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'

const useItemSubmit = () => {
  const uid = useRouter().query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })

  const { response, submit, loading } = useSubmit({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    mutateList: [catalogueItem],
    onSuccess: () => {
      toast.success('Item saved')
    },
    onError: () => {
      toast.error('Error saving item')
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
