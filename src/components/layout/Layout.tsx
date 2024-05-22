import { type FC, type PropsWithChildren } from 'react'

import { NavigationMobile } from './navigation/NavigationMobile'
import { SidebarNavigation } from './navigation/SideBarNavigation'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <NavigationMobile />
      <SidebarNavigation />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
