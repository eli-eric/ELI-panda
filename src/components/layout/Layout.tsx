import {
  type FC,
  type PropsWithChildren,
  startTransition,
  useEffect
} from 'react'

import { useDarkModeStore } from '@/store/useDarkModeStore'

import { NavigationMobile } from './navigation/NavigationMobile'
import { SidebarNavigation } from './navigation/SideBarNavigation'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { setStoredTheme } = useDarkModeStore()

  useEffect(() => {
    let mounted = true
    startTransition(() => {
      if (mounted) {
        setStoredTheme()
      }
    })
    return () => {
      mounted = false
    }
  }, [setStoredTheme])
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <NavigationMobile />
      <SidebarNavigation />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

// const Original Layout = <div className="flex flex-col lg:flex-row min-h-screen">
// <NavigationMobile />
// <SidebarNavigation />
// <main className="flex-1 overflow-auto min-h-screen z-10">{<Component {...pageProps} />}</main>
// </div>
