import { act, renderHook } from '@testing-library/react'

const pushMock = jest.fn()
let mockQuery: Record<string, string | undefined> = {}

jest.mock('next/router', () => ({
    useRouter: () => ({
        pathname: '/catalogue',
        query: mockQuery,
        push: pushMock,
    }),
}))

import { useCatalogueNavigation } from '../useCatalogueNavigation'

const lastPushQuery = (): Record<string, string | undefined> => {
    const lastCall = pushMock.mock.calls[pushMock.mock.calls.length - 1]
    return lastCall[0].query
}

const categoryUidFromPush = (): string | null => {
    const raw = lastPushQuery().category
    if (!raw) return null
    if (raw.startsWith('{')) {
        try {
            return (JSON.parse(raw) as { uid?: string }).uid ?? null
        } catch {
            return null
        }
    }
    return raw
}

describe('useCatalogueNavigation', () => {
    beforeEach(() => {
        pushMock.mockClear()
        mockQuery = {}
    })

    it('selectCategory sets ?category JSON and clears item/view/tab', () => {
        mockQuery = { item: 'i1', view: 'categoryDetail', tab: 'detail' }
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.selectCategory('cat-1'))
        const q = lastPushQuery()
        expect(categoryUidFromPush()).toBe('cat-1')
        expect(q.item).toBeUndefined()
        expect(q.view).toBeUndefined()
        expect(q.tab).toBeUndefined()
    })

    it('selectCategory accepts a CodebookType-like object and encodes name/code', () => {
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.selectCategory({ uid: 'cat-1', name: 'Widgets', code: 'WID' }))
        const raw = lastPushQuery().category!
        expect(JSON.parse(raw)).toEqual({ uid: 'cat-1', name: 'Widgets', code: 'WID' })
    })

    it('selectItem sets ?item and tab=detail, keeps category', () => {
        mockQuery = { category: '{"uid":"cat-1","name":"Cat 1"}' }
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.selectItem('item-1'))
        const q = lastPushQuery()
        expect(q.item).toBe('item-1')
        expect(q.tab).toBe('detail')
        expect(categoryUidFromPush()).toBe('cat-1')
    })

    it('openCategoryDetail sets category + view=categoryDetail + tab=detail', () => {
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.openCategoryDetail('cat-2'))
        const q = lastPushQuery()
        expect(categoryUidFromPush()).toBe('cat-2')
        expect(q.view).toBe('categoryDetail')
        expect(q.tab).toBe('detail')
    })

    it('backToTable clears item and view but keeps category', () => {
        mockQuery = {
            category: '{"uid":"cat-1","name":"Cat 1"}',
            item: 'i1',
            view: 'categoryDetail',
        }
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.backToTable())
        const q = lastPushQuery()
        expect(q.item).toBeUndefined()
        expect(q.view).toBeUndefined()
        expect(categoryUidFromPush()).toBe('cat-1')
    })

    it('selectedCategoryUid reads uid from JSON category param', () => {
        mockQuery = { category: '{"uid":"cat-abc","name":"X"}' }
        const { result } = renderHook(() => useCatalogueNavigation())
        expect(result.current.selectedCategoryUid).toBe('cat-abc')
    })

    it('selectedCategoryUid tolerates legacy plain-string category param', () => {
        mockQuery = { category: 'plain-uid' }
        const { result } = renderHook(() => useCatalogueNavigation())
        expect(result.current.selectedCategoryUid).toBe('plain-uid')
    })

    it('setActiveTab updates only ?tab', () => {
        mockQuery = { item: 'i1' }
        const { result } = renderHook(() => useCatalogueNavigation())
        act(() => result.current.setActiveTab('parameters'))
        expect(lastPushQuery().tab).toBe('parameters')
    })

    it('isCategoryDetailView reflects ?view=categoryDetail', () => {
        mockQuery = { category: '{"uid":"cat-1","name":"Cat 1"}', view: 'categoryDetail' }
        const { result } = renderHook(() => useCatalogueNavigation())
        expect(result.current.isCategoryDetailView).toBe(true)
    })

    it('activeTab defaults to detail when tab missing', () => {
        const { result } = renderHook(() => useCatalogueNavigation())
        expect(result.current.activeTab).toBe('detail')
    })
})
