import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'

type ItemSubmitConfig = {
  onSuccess?: Function
  onError?: Function
}

const useItemSubmit = (config: ItemSubmitConfig) => {
  const uid = useRouter().query.uid as string | undefined
  const { catalogueItem } = useEndpoint({ uid: uid })

  const { response, submit, loading } = useSubmit({
    endpoint: catalogueItem,
    method: uid ? 'put' : 'post',
    mutateList: [catalogueItem],
    onSuccess: response => {
      toast.success('Item saved')
      config.onSuccess && config.onSuccess(response)
    },
    onError: response => {
      toast.error('Error saving item')
      config.onError && config.onError(response)
    }
  })

  return { response, submit, loading }
}

export default useItemSubmit
