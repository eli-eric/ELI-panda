import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import type { HierarchyTab, HierarchyView } from '../types/constants'
import { HIERARCHY_TABS, HIERARCHY_VIEWS } from '../types/constants'
import type { OptimisticSystemHint } from './queries/useSystemDetail'
import { primeSystemDetailCache } from './queries/useSystemDetail'

export const useHierarchyNavigation = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const selectedParentUid = (router.query.parent as string) ?? null
    const selectedLeafUid = (router.query.leaf as string) ?? null
    const activeTab = ((router.query.tab as string) ?? HIERARCHY_TABS.DETAIL) as HierarchyTab
    const activeView = ((router.query.view as string) ?? HIERARCHY_VIEWS.TREE) as HierarchyView

    const updateQuery = useCallback(
        (updates: Record<string, string | undefined>, options?: { replace?: boolean }) => {
            const current = { ...router.query }
            for (const [key, value] of Object.entries(updates)) {
                if (value === undefined) {
                    delete current[key]
                } else {
                    current[key] = value
                }
            }
            const navigate = options?.replace ? router.replace : router.push
            navigate({ pathname: router.pathname, query: current }, undefined, {
                shallow: true,
            })
        },
        [router],
    )

    const selectParent = useCallback(
        (uid: string, optimistic?: OptimisticSystemHint) => {
            if (optimistic) primeSystemDetailCache(queryClient, uid, optimistic)
            const inDetail = !!(router.query.leaf as string | undefined)
            const parentChanged = (router.query.parent as string | undefined) !== uid
            const pageReset = parentChanged ? { page: undefined } : {}
            updateQuery(
                inDetail
                    ? { parent: uid, leaf: uid, ...pageReset }
                    : { parent: uid, ...pageReset },
            )
        },
        [queryClient, router, updateQuery],
    )

    const selectLeaf = useCallback(
        (uid: string, optimistic?: OptimisticSystemHint) => {
            if (optimistic) primeSystemDetailCache(queryClient, uid, optimistic)
            const inDetail = !!(router.query.leaf as string | undefined)
            updateQuery(inDetail ? { leaf: uid } : { leaf: uid, tab: HIERARCHY_TABS.DETAIL })
        },
        [queryClient, router, updateQuery],
    )

    // replace (not push) so deep-link resolution does not add a history entry
    const resolveParentForLeaf = useCallback(
        (parentUid: string) => {
            updateQuery({ parent: parentUid }, { replace: true })
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

    const clearSelection = useCallback(() => {
        updateQuery({ parent: undefined, leaf: undefined, tab: undefined })
    }, [updateQuery])

    const setActiveView = useCallback(
        (view: HierarchyView) => {
            updateQuery({ view: view === HIERARCHY_VIEWS.TREE ? undefined : view })
        },
        [updateQuery],
    )

    return useMemo(
        () => ({
            selectedParentUid,
            selectedLeafUid,
            activeTab,
            activeView,
            selectParent,
            selectLeaf,
            resolveParentForLeaf,
            setActiveTab,
            setActiveView,
            goBackToLeaves,
            clearSelection,
        }),
        [
            selectedParentUid,
            selectedLeafUid,
            activeTab,
            activeView,
            selectParent,
            selectLeaf,
            resolveParentForLeaf,
            setActiveTab,
            setActiveView,
            goBackToLeaves,
            clearSelection,
        ],
    )
}
