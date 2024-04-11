import type { FC, PropsWithChildren } from 'react'
import { SidebarNavigation } from './navigation/SideBarNavigation'
import { NavigationMobile } from './navigation/NavigationMobile'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
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
