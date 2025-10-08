import type { ROLE } from '@/types/constants/roles'

import type { NavigationItem } from './types'

/**
 * Filters navigation items based on user roles
 * @param items - Navigation items to filter
 * @param userRoles - User's roles
 * @returns Filtered navigation items that user has access to
 */
export function filterNavigationByPermission(
  items: NavigationItem[],
  userRoles?: ROLE[]
): NavigationItem[] {
  if (!userRoles || userRoles.length === 0) {
    return []
  }

  return items
    .filter(item => userRoles.includes(item.role))
    .map(item => {
      if (item.items) {
        const filteredSubItems = item.items.filter(subItem =>
          userRoles.includes(subItem.role)
        )

        return {
          ...item,
          items: filteredSubItems.length > 0 ? filteredSubItems : undefined
        }
      }

      return item
    })
}
