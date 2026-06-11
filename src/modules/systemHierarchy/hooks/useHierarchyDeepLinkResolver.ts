import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { useHierarchyStore } from '../store/useHierarchyStore'
import { useSystemDetail } from './queries/useSystemDetail'
import { useHierarchyNavigation } from './useHierarchyNavigation'

/**
 * Resolves the missing parent context for deep links that carry only
 * `?leaf=<uid>` (see getSystemHierarchyDetailPath): derives the immediate
 * parent from the system's parentPath, expands the ancestor tree nodes and
 * replaces the URL (no extra history entry) so the leaves panel and
 * breadcrumb get full context. Root systems (empty parentPath) resolve to
 * parent === leaf, which is already a legitimate state (see selectParent).
 */
export const useHierarchyDeepLinkResolver = (): void => {
    const router = useRouter()
    const { selectedLeafUid, selectedParentUid, resolveParentForLeaf } = useHierarchyNavigation()
    const needsResolution = !!selectedLeafUid && !selectedParentUid
    const { system } = useSystemDetail(needsResolution ? selectedLeafUid : null)
    const expandNodes = useHierarchyStore(state => state.expandNodes)
    // router.replace is async — the ref keeps resolution idempotent per leaf
    // until the parent param lands in the URL
    const resolvedLeafRef = useRef<string | null>(null)

    useEffect(() => {
        if (!router.isReady) return
        if (!needsResolution) {
            resolvedLeafRef.current = null
            return
        }
        // keepPreviousData can momentarily serve the previous leaf's detail
        if (!system || system.uid !== selectedLeafUid) return
        if (resolvedLeafRef.current === selectedLeafUid) return
        resolvedLeafRef.current = selectedLeafUid

        const ancestorUids = (system.parentPath ?? []).map(p => p.uid).filter(Boolean)
        expandNodes(ancestorUids.length > 0 ? ancestorUids : [system.uid])
        resolveParentForLeaf(
            ancestorUids.length > 0 ? ancestorUids[ancestorUids.length - 1] : system.uid,
        )
    }, [
        router.isReady,
        needsResolution,
        selectedLeafUid,
        system,
        expandNodes,
        resolveParentForLeaf,
    ])
}
