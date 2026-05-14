import { act, renderHook } from '@testing-library/react'

import { useOpenGlobalSearch } from '../hooks/useOpenGlobalSearch'
import { useGlobalSearchStore } from '../store/useGlobalSearchStore'

describe('useOpenGlobalSearch', () => {
    beforeEach(() => {
        act(() => useGlobalSearchStore.setState({ open: false, searchValue: '' }))
    })

    it('returns a stable callback that opens the modal', () => {
        const { result, rerender } = renderHook(() => useOpenGlobalSearch())
        const first = result.current

        rerender()
        expect(result.current).toBe(first)

        act(() => result.current())
        expect(useGlobalSearchStore.getState().open).toBe(true)
    })
})
