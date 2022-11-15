import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PATHS } from 'types/paths'

export const useAuth = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      if (pathname === PATHS.AUTH || pathname === PATHS.ROOT) {
        router.replace(PATHS.DASHBOARD)
        console.log('dashboard')
      }
    }
    if (status === 'unauthenticated') {
      if (pathname !== PATHS.AUTH) {
        router.replace(PATHS.AUTH)
        console.log('auth')
      }
    }
  }, [status])

  return { status: status }
}
