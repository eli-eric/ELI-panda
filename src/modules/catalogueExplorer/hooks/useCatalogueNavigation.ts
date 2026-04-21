import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import type { CatalogueCategoryTab, CatalogueItemTab } from '../types'
import { CATALOGUE_CATEGORY_TABS, CATALOGUE_ITEM_TABS, CATALOGUE_VIEWS } from '../types'

type AnyTab = CatalogueItemTab | CatalogueCategoryTab

interface CategorySelectionPayload {
    uid: string
    name?: string
    code?: string
}

const parseCategoryParam = (raw: string | string[] | undefined): string | null => {
    if (!raw) return null
    const value = Array.isArray(raw) ? raw[0] : raw
    if (typeof value !== 'string' || value.length === 0) return null
    if (value.trim().startsWith('{')) {
        try {
            const parsed = JSON.parse(value) as { uid?: string }
            return parsed?.uid ?? null
        } catch {
            return null
        }
    }
    return value
}

const encodeCategoryParam = (input: string | CategorySelectionPayload): string => {
    if (typeof input === 'string') {
        return JSON.stringify({ uid: input, name: input })
    }
    return JSON.stringify({
        uid: input.uid,
        name: input.name ?? input.uid,
        ...(input.code ? { code: input.code } : {}),
    })
}

export const useCatalogueNavigation = () => {
    const router = useRouter()

    const selectedCategoryUid = parseCategoryParam(router.query.category)
    const selectedItemUid = (router.query.item as string) ?? null
    const activeTab = ((router.query.tab as string) ?? CATALOGUE_ITEM_TABS.DETAIL) as AnyTab
    const isCategoryDetailView = router.query.view === CATALOGUE_VIEWS.CATEGORY_DETAIL

    const updateQuery = useCallback(
        (updates: Record<string, string | undefined>) => {
            const current = { ...router.query }
            for (const [key, value] of Object.entries(updates)) {
                if (value === undefined) delete current[key]
                else current[key] = value
            }
            router.push({ pathname: router.pathname, query: current }, undefined, { shallow: true })
        },
        [router],
    )

    const selectCategory = useCallback(
        (uidOrCategory: string | CategorySelectionPayload) => {
            updateQuery({
                category: encodeCategoryParam(uidOrCategory),
                item: undefined,
                view: undefined,
                tab: undefined,
            })
        },
        [updateQuery],
    )

    const selectItem = useCallback(
        (uid: string) => {
            updateQuery({ item: uid, tab: CATALOGUE_ITEM_TABS.DETAIL })
        },
        [updateQuery],
    )

    const openCategoryDetail = useCallback(
        (uidOrCategory: string | CategorySelectionPayload) => {
            updateQuery({
                category: encodeCategoryParam(uidOrCategory),
                item: undefined,
                view: CATALOGUE_VIEWS.CATEGORY_DETAIL,
                tab: CATALOGUE_CATEGORY_TABS.DETAIL,
            })
        },
        [updateQuery],
    )

    const backToTable = useCallback(() => {
        updateQuery({ item: undefined, view: undefined, tab: undefined })
    }, [updateQuery])

    const setActiveTab = useCallback(
        (tab: AnyTab) => {
            updateQuery({ tab })
        },
        [updateQuery],
    )

    return useMemo(
        () => ({
            selectedCategoryUid,
            selectedItemUid,
            activeTab,
            isCategoryDetailView,
            selectCategory,
            selectItem,
            openCategoryDetail,
            backToTable,
            setActiveTab,
        }),
        [
            selectedCategoryUid,
            selectedItemUid,
            activeTab,
            isCategoryDetailView,
            selectCategory,
            selectItem,
            openCategoryDetail,
            backToTable,
            setActiveTab,
        ],
    )
}
