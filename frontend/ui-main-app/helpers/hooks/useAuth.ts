import { ROLES_CONFIG } from 'helpers/roles-config'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PATHS } from 'types/constants/paths'

export const useAuth = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { status, data } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      if (pathname === PATHS.AUTH || pathname === PATHS.ROOT) {
        router.replace(PATHS.DASHBOARD)
        console.log('dashboard')
      }
      const alowedPages = data.user.roles.map(role => {
        return ROLES_CONFIG[role].toString()
      })
      console.log(alowedPages)
      if (!alowedPages.includes(pathname)) {
        router.replace(PATHS.DASHBOARD)
      }
    }
    if (status === 'unauthenticated') {
      if (pathname !== PATHS.AUTH) {
        router.replace(PATHS.AUTH)
        console.log('auth')
      }
    }
  }, [status])

  return { status: status, userRoles: data?.user.roles }
}
