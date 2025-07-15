'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from '@/components/ui/sidebar'
import type { NavigationItem } from '@/lib/navigation/types'

import { NavItem } from './nav-item'

interface NavProjectsProps {
  projects: NavigationItem[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(item => (
          <NavItem key={item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
