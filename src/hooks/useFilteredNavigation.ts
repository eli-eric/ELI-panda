import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import type { NavigationItem } from '@/lib/navigation/types'
import { filterNavigationByPermission } from '@/lib/navigation/utils'

/**
 * Hook to filter navigation items based on current user's permissions
 * @param items - Navigation items to filter
 * @returns Filtered navigation items that user has access to
 */
export function useFilteredNavigation(items: NavigationItem[]) {
    const { data } = useSession()

    return useMemo(
        () => filterNavigationByPermission(items, data?.user?.roles),
        [items, data?.user?.roles],
    )
}
