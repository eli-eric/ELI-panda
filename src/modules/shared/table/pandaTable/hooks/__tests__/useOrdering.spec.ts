import { act, renderHook } from '@testing-library/react'

import { useOrdering } from '../useOrdering'

const TID = 'order-table'

beforeEach(() => {
    localStorage.clear()
})

describe('useOrdering', () => {
    it('starts with defaultColumnOrder when nothing stored', () => {
        const { result } = renderHook(() => useOrdering(TID, ['a', 'b']))
        expect(result.current[0]).toEqual(['a', 'b'])
    })

    it('hydrates from localStorage', () => {
        localStorage.setItem(`columnOrder-${TID}`, JSON.stringify(['z', 'y']))
        const { result } = renderHook(() => useOrdering(TID, ['a']))
        expect(result.current[0]).toEqual(['z', 'y'])
    })

    it('setColumnOrder always prepends defaultColumnOrder (object form)', () => {
        const { result } = renderHook(() => useOrdering(TID, ['a', 'b']))
        act(() => result.current[1](['c', 'a', 'd', 'b']))
        const stored = JSON.parse(localStorage.getItem(`columnOrder-${TID}`)!)
        expect(stored).toEqual(['a', 'b', 'c', 'd'])
    })

    it('setColumnOrder updater form receives stored order, default still prepended', () => {
        const { result } = renderHook(() => useOrdering(TID, ['a']))
        act(() => result.current[1](() => ['b', 'c']))
        const stored = JSON.parse(localStorage.getItem(`columnOrder-${TID}`)!)
        expect(stored).toEqual(['a', 'b', 'c'])
    })

    it('works with empty defaultColumnOrder', () => {
        const { result } = renderHook(() => useOrdering(TID))
        act(() => result.current[1](['x', 'y']))
        const stored = JSON.parse(localStorage.getItem(`columnOrder-${TID}`)!)
        expect(stored).toEqual(['x', 'y'])
    })
})
