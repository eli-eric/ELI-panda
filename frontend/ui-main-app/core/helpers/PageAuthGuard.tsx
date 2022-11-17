import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { PATHS } from 'types/constants/paths'
import { ROLES_CONFIG } from 'types/constants/roles-config'
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}
const PageAuthGuard = ({ children }: Props) => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = router.pathname
  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (status === 'unauthenticated') {
      signIn()
    } // If not authenticated, force log in

    if (status === 'authenticated') {
      if (pathname === PATHS.ROOT) {
        router.replace(PATHS.DASHBOARD)
      }
      const alowedPages = data?.user.roles.map(role => {
        return ROLES_CONFIG[role].toString()
      })
      let currentRootPage
      alowedPages.forEach(page => {
        if (pathname.startsWith(page)) {
          currentRootPage = page
        }
      })
      if (!alowedPages.includes(currentRootPage || pathname)) {
        router.replace(PATHS.DASHBOARD)
      }
    } // protecting pages based on user Roles
  }, [status, router, data, pathname])

  if (status === 'authenticated') {
    return <>{children}</>
  }
  // Session is being fetched
  // If loading, useEffect() will redirect.
  return <div>Loading...</div>
}

export default PageAuthGuard
