import type { LucideIcon } from 'lucide-react'

import type { NavigationItem } from '@/lib/navigation/types'
import type { ROLE } from '@/types/constants/roles'

export interface QuickNavItem {
    title: string
    url: string
    icon: LucideIcon
    category?: string
}

/**
 * Maps navigation configuration to quick navigation items
 * Filters by user permissions and flattens submenu items
 * @param navConfig - Navigation configuration from NAV_ITEMS
 * @param userRoles - Current user's roles
 * @returns Filtered and flattened quick navigation items
 */
export function mapNavBarToQuickNav(
    navConfig: NavigationItem[],
    userRoles?: ROLE[],
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

        // Skip items without icon (required for quick nav display)
        if (!navItem.icon) {
            continue
        }

        // If item has no subitems, add it as direct link
        if (!navItem.items || navItem.items.length === 0) {
            quickNavItems.push({
                title: navItem.title,
                url: navItem.url,
                icon: navItem.icon,
            })
        }

        // If item has submenu, add filtered sub-items
        if (navItem.items) {
            const filteredSubItems = navItem.items.filter(subItem =>
                userRoles.includes(subItem.role),
            )

            for (const subItem of filteredSubItems) {
                quickNavItems.push({
                    title: subItem.title,
                    url: subItem.url,
                    icon: navItem.icon,
                    category: navItem.title,
                })
            }
        }
    }

    return quickNavItems
}
