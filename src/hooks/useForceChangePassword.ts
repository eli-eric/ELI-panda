import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { useUserDetail } from '@/modules/administration/user/hooks/useUserDetail'
import { PATH } from '@/types/constants/paths'

import useWarningModal from './useWarningModal'

export const useForceChangePassword = () => {
  const userUid = useSession().data?.user?.uid
  const router = useRouter()
  const { userDetail } = useUserDetail(userUid)
  const withWarningModal = useWarningModal('Your pre-generated password is about to expire. Please change it.')

  useEffect(() => {
    if (userDetail) {
      if (userDetail?.passwordToChange || userDetail?.passwordToChange === undefined) {
        withWarningModal(() => {
          router.push(PATH.PROFILE_SECURITY)
        })()
      }
    }
  }, [userDetail, router, withWarningModal])
}
