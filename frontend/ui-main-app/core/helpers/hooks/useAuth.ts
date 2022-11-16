import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PATHS } from 'types/constants/paths'
import { ROLES_CONFIG } from 'types/constants/roles-config'

/* Hook wrapping next-auth that provides protection for pages
based on ROLES_CONFIG and possible redirect to an allowed page.
It must be called on every page.
Returns status from next-auth and the logged user roles. */

export const useAuth = () => {
  const router = useRouter()
  const pathname = router.pathname

  const { status, data } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      // after sign in redirect to dashboard and protecting loging page for auth users
      if (pathname === PATHS.AUTH || pathname === PATHS.ROOT) {
        router.replace(PATHS.DASHBOARD)
      }

      // logic based on ROLES_CONFIG a protecting pages based on user roles
      const alowedPages = data.user.roles.map(role => {
        return ROLES_CONFIG[role].toString()
      })

      // protecting all sub pages
      let currentRootPage
      alowedPages.forEach(page => {
        if (pathname.startsWith(page)) {
          currentRootPage = page
        }
      })

      if (!alowedPages.includes(currentRootPage || pathname)) {
        router.replace(PATHS.DASHBOARD)
      }
    }

    //protecting all pages exept /auth for unauthorized acces
    if (status === 'unauthenticated') {
      if (pathname !== PATHS.AUTH) {
        router.replace(PATHS.AUTH)
      }
    }
  }, [status])

  return { status: status, userRoles: data?.user.roles }
}
