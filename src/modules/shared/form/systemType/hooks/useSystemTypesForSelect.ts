import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemTypeGroupTreeItem, SystemTypeTreeRow } from '../types/system-type-select.types'

/**
 * Fetches system type groups with their children for selection modal.
 *
 * Uses useQueryManager to integrate with SearchBar component.
 * When used with SearchBar's `useQuery={false}`, search state is stored
 * in table state store without URL pollution.
 *
 * @param tableId - Table ID for state management (search)
 */
export const useSystemTypesForSelect = (tableId: string) => {
    const { query } = useQueryManager(tableId)
    const search = (query.search as string) || ''

    const { data, isLoading } = useQuery({
        queryKey: ['system-type-groups-tree', { query }],
        queryFn: queryFetcher<SystemTypeGroupTreeItem[]>('systemTypeGroupsTree'),
        placeholderData: keepPreviousData,
    })

    // Transform API response to tree structure for table
    const treeData = useMemo((): SystemTypeTreeRow[] => {
        if (!data) return []

        return data.map(group => ({
            uid: group.uid,
            name: group.name,
            code: group.code,
            isGroup: true,
            isExpandable: group.children && group.children.length > 0,
            children: group.children.map(type => ({
                uid: type.uid,
                name: type.name,
                code: type.code,
                isGroup: false,
                isExpandable: false,
            })),
        }))
    }, [data])

    return {
        data: treeData,
        isLoading,
        search,
    }
}
