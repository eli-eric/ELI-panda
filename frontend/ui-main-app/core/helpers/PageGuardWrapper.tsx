import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { PATHS, RESTRICTED_PATHS } from 'types/constants/paths'
import { ROLES_CONFIG } from 'types/constants/roles-config'
import { useRouter } from 'next/router'
import AuthFormContainer from 'core/components/auth/auth-form.cont'
import ComponentLoader from 'core/components/loaders/component-loader.comp'

interface Props {
  children: React.ReactNode
}
const PageGuardWrapper = ({ children }: Props) => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = router.pathname
  const requireAuth = RESTRICTED_PATHS.some(path => router.route.startsWith(path))

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated') {
      if (pathname === PATHS.ROOT) {
        router.push(PATHS.DASHBOARD)
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
        router.push(PATHS.DASHBOARD)
      }
    } // protecting pages based on user Roles
  }, [status, router, data, pathname, requireAuth])

  if (status === 'authenticated') {
    return <>{children}</>
  }

  if (status === 'unauthenticated') {
    return <AuthFormContainer />
  }

  return <ComponentLoader />
}

export default PageGuardWrapper
