import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import type { HierarchyTab } from '../types/constants'
import { HIERARCHY_TABS } from '../types/constants'

export const useHierarchyNavigation = () => {
    const router = useRouter()

    const selectedParentUid = (router.query.parent as string) ?? null
    const selectedLeafUid = (router.query.leaf as string) ?? null
    const activeTab = ((router.query.tab as string) ?? HIERARCHY_TABS.DETAIL) as HierarchyTab

    const updateQuery = useCallback(
        (updates: Record<string, string | undefined>) => {
            const current = { ...router.query }
            for (const [key, value] of Object.entries(updates)) {
                if (value === undefined) {
                    delete current[key]
                } else {
                    current[key] = value
                }
            }
            router.push({ pathname: router.pathname, query: current }, undefined, {
                shallow: true,
            })
        },
        [router],
    )

    const selectParent = useCallback(
        (uid: string) => {
            updateQuery({ parent: uid, leaf: undefined, tab: undefined })
        },
        [updateQuery],
    )

    const selectLeaf = useCallback(
        (uid: string) => {
            updateQuery({ leaf: uid, tab: HIERARCHY_TABS.DETAIL })
        },
        [updateQuery],
    )

    const setActiveTab = useCallback(
        (tab: HierarchyTab) => {
            updateQuery({ tab })
        },
        [updateQuery],
    )

    const goBackToLeaves = useCallback(() => {
        updateQuery({ leaf: undefined, tab: undefined })
    }, [updateQuery])

    return useMemo(
        () => ({
            selectedParentUid,
            selectedLeafUid,
            activeTab,
            selectParent,
            selectLeaf,
            setActiveTab,
            goBackToLeaves,
        }),
        [
            selectedParentUid,
            selectedLeafUid,
            activeTab,
            selectParent,
            selectLeaf,
            setActiveTab,
            goBackToLeaves,
        ],
    )
}
