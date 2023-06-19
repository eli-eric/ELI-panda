import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useSubmit from '@/hooks/fetch/useSubmit'
import useSystems from '@/modules/systems/hooks/useSystems'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { SystemDetailFormType } from '../types/form'

const useSystemDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { system: systemEndpoint } = useEndpoint({ uid })
  const { mutate } = useSystems()

  const {
    response,
    loading,
    error,
    mutate: mutateDetail
  } = useFetch<SystemDetailFormType>({
    url: uid && systemEndpoint,
    config: {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      revalidateIfStale: true
    }
  })
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.SYSTEM_EDIT)

  const { submit, loading: loadingSubmit } = useSubmit({
    endpoint: systemEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`System ${uid} saved successfully`)
      router.push(uid ? PATH.SYSTEM + '/' + uid : PATH.SYSTEMS)
      mutate()
      mutateDetail()
    },
    onError: e => toast.error(e.message)
  })

  return {
    systemDetail: response,
    loading: loading || loadingSubmit,
    error,
    mutate,
    disabledEdit,
    uid,
    systemEndpoint,
    submit
  }
}

export default useSystemDetail
