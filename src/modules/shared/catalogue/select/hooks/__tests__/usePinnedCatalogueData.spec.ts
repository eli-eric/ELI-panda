import { renderHook } from '@testing-library/react'

import type { CatalogueItem } from '@/types/responses/catalogue'

import { usePinnedCatalogueData } from '../usePinnedCatalogueData'

const item = (uid: string, name = `n-${uid}`) => ({ uid, name }) as unknown as CatalogueItem

describe('usePinnedCatalogueData', () => {
    it('undefined items + no selection → undefined', () => {
        const { result } = renderHook(() =>
            usePinnedCatalogueData(undefined, undefined),
        )
        expect(result.current).toBeUndefined()
    })

    it('undefined items + selection → returns [selectedItem]', () => {
        const sel = item('s')
        const { result } = renderHook(() => usePinnedCatalogueData(undefined, sel))
        expect(result.current).toEqual([sel])
    })

    it('empty items + no selection → []', () => {
        const { result } = renderHook(() => usePinnedCatalogueData([], undefined))
        expect(result.current).toEqual([])
    })

    it('empty items + selection → [selectedItem]', () => {
        const sel = item('s')
        const { result } = renderHook(() => usePinnedCatalogueData([], sel))
        expect(result.current).toEqual([sel])
    })

    it('items + no selection → items unchanged', () => {
        const list = [item('a'), item('b')]
        const { result } = renderHook(() => usePinnedCatalogueData(list, undefined))
        expect(result.current).toBe(list)
    })

    it('items contain selection → pins selection first and dedupes', () => {
        const items = [item('a'), item('b'), item('s')]
        const sel = items[2]
        const { result } = renderHook(() => usePinnedCatalogueData(items, sel))
        expect(result.current!.map(i => i.uid)).toEqual(['s', 'a', 'b'])
    })

    it('selection not in items → prepended to list', () => {
        const items = [item('a'), item('b')]
        const sel = item('s')
        const { result } = renderHook(() => usePinnedCatalogueData(items, sel))
        expect(result.current!.map(i => i.uid)).toEqual(['s', 'a', 'b'])
    })
})
