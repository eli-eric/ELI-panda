import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PATHS, RESTRICTED_PATHS } from 'types/constants/paths'
import { ROLES_CONFIG } from 'types/constants/roles-config'
import { useRouter } from 'next/router'
import EliLoaderComponent from 'core/components/ui/eli-loader.comp'

interface Props {
  children: React.ReactNode
}
const PageGuardWrapper = ({ children }: Props) => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = router.pathname
  const requireAuth = RESTRICTED_PATHS.some(path => router.route.startsWith(path))

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (status === 'unauthenticated') {
      if (requireAuth) {
        router.replace(PATHS.ROOT)
      }
    } // If not authenticated and some restricted path, force log in

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
  }, [status, router, data, pathname, requireAuth])

  if (status === 'authenticated') {
    return <>{children}</>
  }

  if (status === 'unauthenticated' && !requireAuth) {
    return <>{children}</>
  }

  // Session is being fetched
  // If loading, useEffect() will redirect.
  return <EliLoaderComponent />
}

export default PageGuardWrapper
