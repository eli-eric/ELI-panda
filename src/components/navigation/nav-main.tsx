'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from '@/components/ui/sidebar'
import type { NavigationItem } from '@/lib/navigation/types'

import { NavItem } from './nav-item'

interface NavMainProps {
  items: NavigationItem[]
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <NavItem key={item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
