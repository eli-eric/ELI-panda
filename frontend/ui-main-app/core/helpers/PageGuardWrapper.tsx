import { signIn, useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { PATHS, RESTRICTED_PATHS } from 'types/constants/paths'
import { ROLES_CONFIG } from 'types/constants/roles-config'
import { useRouter } from 'next/router'
import LoaderComponent from 'core/components/ui/loader.comp'
import LoadingContext from 'core/store/loading-context'
import AuthFormContainer from 'core/components/auth/auth-form.cont'

interface Props {
  children: React.ReactNode
}
const PageGuardWrapper = ({ children }: Props) => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = router.pathname
  const requireAuth = RESTRICTED_PATHS.some(path => router.route.startsWith(path))
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    console.log('status:', status)

    if (status === 'authenticated') {
      setLoading(false)
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
  }, [status, router, data, pathname, requireAuth, loading, setLoading])

  if (status === 'authenticated') {
    setLoading(false)

    return <>{children}</>
  }

  if (status === 'unauthenticated') {
    setLoading(false)
    return <AuthFormContainer />
  }

  // Session is being fetched
  // If loading, useEffect() will redirect.
  return <LoaderComponent>{children}</LoaderComponent>
}

export default PageGuardWrapper
