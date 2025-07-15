'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AccessControl } from '@/components/auth/AccesControl'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NavigationItem } from '@/lib/navigation/types'

interface NavItemProps {
  item: NavigationItem
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()
  const isActive = pathname?.startsWith(item.url)
  const isSubItemActive = item.items?.some(subItem =>
    pathname?.startsWith(subItem.url)
  )

  return (
    <AccessControl roles={[item.role]}>
      {item.items ? (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={isActive || isSubItemActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isSubItemActive}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map(subItem => (
                  <AccessControl key={subItem.title} roles={[subItem.role]}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname?.startsWith(subItem.url)}
                      >
                        <Link
                          href={subItem.url}
                          onClick={() => isMobile && toggleSidebar()}
                        >
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </AccessControl>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
            <Link href={item.url} onClick={() => isMobile && toggleSidebar()}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </AccessControl>
  )
}
