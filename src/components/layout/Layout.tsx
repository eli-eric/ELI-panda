import {
  startTransition,
  useEffect,
  type FC,
  type PropsWithChildren
} from 'react'
import { SidebarNavigation } from './navigation/SideBarNavigation'
import { NavigationMobile } from './navigation/NavigationMobile'
import { useDarkModeStore } from '@/store/useDarkModeStore'

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
