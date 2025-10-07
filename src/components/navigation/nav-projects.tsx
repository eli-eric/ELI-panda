'use client'

import { useIntl } from 'react-intl'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'
import type { NavigationItem } from '@/lib/navigation/types'

import { NavItem } from './nav-item'

interface NavProjectsProps {
  projects: NavigationItem[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { formatMessage: fm } = useIntl()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {fm({ id: message.common.navigation.administration })}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(item => (
          <NavItem key={item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
