import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { PATH } from '@/types/constants/paths'

import useSystemDetail from './useSystemDetail'

type ItemSubmitConfig = {
  onSuccess?: Function
  onError?: Function
}

export const useSystemSubmit = (config: ItemSubmitConfig) => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { system: systemEndpoint } = useEndpoint({ uid })
  const { mutate } = useSystems()
  const { mutate: mutateDetail } = useSystemDetail()

  const { submit, loading: loadingSubmit } = useSubmit({
    endpoint: systemEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`System ${uid} saved successfully`)
      router.push(uid ? PATH.SYSTEM + '/' + uid : PATH.SYSTEMS)
      config.onSuccess && config.onSuccess(uid)
      mutate()
      mutateDetail()
    },
    onError: e => toast.error(e.message)
  })

  return { submit, loadingSubmit }
}
