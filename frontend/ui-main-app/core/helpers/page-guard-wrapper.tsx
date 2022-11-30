import ComponentLoader from 'core/components/loaders/component-loader.cont'
import AuthFormContainer from 'core/components/modules/auth/auth-form.cont'
import { PATHS } from 'core/types/constants/paths'
import { ROLES_CONFIG } from 'core/types/constants/roles-config'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

/*
Component wrapping next-auth that provides protection for pages
based on ROLES_CONFIG and possible redirect to an allowed page.
Its wrapping all components after LayoutComponent
 */

const PageGuardWrapper = ({ children }: Props) => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = router.pathname

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'authenticated') {
      if (pathname === PATHS.ROOT) {
        router.push(PATHS.DASHBOARD)
      } // from root after auth redirect to dashboard
      const alowedPages = data?.user.roles.map(role => {
        return ROLES_CONFIG[role]?.toString()
      }) // allowed pages by user roles
      let currentRootPage
      alowedPages.forEach(page => {
        if (pathname.startsWith(page)) {
          currentRootPage = page
        }
      })
      if (!alowedPages.includes(currentRootPage || pathname)) {
        router.push(PATHS.DASHBOARD)
      } // protecting not allowed pages for user
    } // protecting pages based on user Roles
  }, [status, router, data, pathname])

  if (status === 'authenticated') {
    return <>{children}</>
  } // return children components for auth user

  if (status === 'unauthenticated') {
    return <AuthFormContainer />
  } // no depends on url, if unauthenticated user show login form, url doesnt change

  return <ComponentLoader />
}

export default PageGuardWrapper
