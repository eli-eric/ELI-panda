'use client'

import Image from 'next/image'
import * as React from 'react'
import { useIntl } from 'react-intl'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { useFilteredNavigation } from '@/hooks/useFilteredNavigation'
import { message } from '@/i18n/src/messages'
import { NAV_ITEMS, OTHERS_NAV_ITEMS } from '@/lib/navigation/config'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar()
  const { formatMessage: fm } = useIntl()

  const filteredNavMain = useFilteredNavigation(NAV_ITEMS)
  const filteredOthers = useFilteredNavigation(OTHERS_NAV_ITEMS)
  console.log('Filtered Nav Main:', filteredNavMain)
  console.log('Filtered Others:', filteredOthers)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          onClick={() => toggleSidebar()}
        >
          <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-orange-foreground">
            <Image
              src="/logo192.png"
              alt={fm({ id: message.common.ui.appName })}
              fill
              className="rounded-lg object-contain"
              sizes="32px"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {fm({ id: message.common.ui.appName })}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavProjects projects={filteredOthers} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
