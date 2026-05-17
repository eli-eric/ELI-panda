import { act, renderHook } from '@testing-library/react'

import { useVisibility } from '../useVisibility'

const TID = 'vis-table'

beforeEach(() => {
    localStorage.clear()
})

describe('useVisibility', () => {
    it('starts as {} when localStorage empty', () => {
        const { result } = renderHook(() => useVisibility(TID))
        expect(result.current[0]).toEqual({})
    })

    it('hydrates from existing localStorage value', () => {
        localStorage.setItem(
            `columnVisibility-${TID}`,
            JSON.stringify({ name: false }),
        )
        const { result } = renderHook(() => useVisibility(TID))
        expect(result.current[0]).toEqual({ name: false })
    })

    it('setColumnVisibility writes object directly', () => {
        const { result } = renderHook(() => useVisibility(TID))
        act(() => result.current[1]({ a: false }))
        expect(JSON.parse(localStorage.getItem(`columnVisibility-${TID}`)!)).toEqual({
            a: false,
        })
    })

    it('setColumnVisibility supports updater function', () => {
        localStorage.setItem(
            `columnVisibility-${TID}`,
            JSON.stringify({ a: false }),
        )
        const { result } = renderHook(() => useVisibility(TID))
        act(() => result.current[1](prev => ({ ...prev, b: true })))
        expect(JSON.parse(localStorage.getItem(`columnVisibility-${TID}`)!)).toEqual({
            a: false,
            b: true,
        })
    })
})
