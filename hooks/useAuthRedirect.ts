import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { PATH } from 'types/constants/paths'
import { Role_CONFIG } from 'types/constants/roles'

export const useAuthRedirect = () => {
  const router = useRouter()
  const { status, data } = useSession()
  const pathname = router.pathname

  useEffect(() => {
    if (status === 'authenticated') {
      const alowedPages = data?.user.roles.map(role => {
        return Role_CONFIG[role]?.toString()
      })
      if (pathname === PATH.ROOT) {
        router.push(PATH.DASHBOARD)
      } // from root after auth redirect to dashboard
      // allowed pages by user roles
      let currentRootPage
      alowedPages.forEach(page => {
        if (pathname.startsWith(page)) {
          currentRootPage = page
        }
      })
      if (!alowedPages.includes(currentRootPage || pathname)) {
        router.push(PATH.DASHBOARD)
      } // protecting not allowed pages for user
    } // protecting pages based on user Roles

    if (status === 'unauthenticated') {
      if (pathname !== '/403') {
        if (pathname !== PATH.ROOT) {
          router.push('/403')
        }
      }
    }
  }, [status, router, data, pathname])
}
