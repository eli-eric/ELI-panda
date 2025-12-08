import type { ElementType } from 'react'

import type { NavigationType } from '@/types/constants/paths'
import type { ROLE } from '@/types/constants/roles'

export interface QuickNavItem {
  title: string
  url: string
  icon: ElementType
  category?: string
}

/**
 * Maps navigation configuration to quick navigation items
 * Filters by user permissions and flattens submenu items
 * @param navConfig - Navigation configuration from NAV_BAR_CONFIG
 * @param userRoles - Current user's roles
 * @returns Filtered and flattened quick navigation items
 */
export function mapNavBarToQuickNav(
  navConfig: NavigationType[],
  userRoles?: ROLE[]
): QuickNavItem[] {
  if (!userRoles || userRoles.length === 0) {
    return []
  }

  const quickNavItems: QuickNavItem[] = []

  for (const navItem of navConfig) {
    // Skip if user doesn't have permission for this section
    if (!userRoles.includes(navItem.role)) {
      continue
    }

    // If item has direct link, add it
    if (navItem.link) {
      quickNavItems.push({
        title: navItem.name,
        url: navItem.link,
        icon: navItem.Icon
      })
    }

    // If item has submenu, add filtered sub-items
    if (navItem.links) {
      const filteredSubItems = navItem.links.filter(subItem =>
        userRoles.includes(subItem.role)
      )

      for (const subItem of filteredSubItems) {
        quickNavItems.push({
          title: subItem.name || navItem.name,
          url: subItem.path,
          icon: navItem.Icon,
          category: navItem.name
        })
      }
    }
  }

  return quickNavItems
}
