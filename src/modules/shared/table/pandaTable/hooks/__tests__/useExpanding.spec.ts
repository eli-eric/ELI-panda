import { act, renderHook } from '@testing-library/react'

import useTableStateStore from '@/store/useTableStateStore'

import { useExpanding } from '../useExpanding'

const TID = 'exp-table'

beforeEach(() => {
    useTableStateStore.setState({ instances: {} })
})

describe('useExpanding', () => {
    it('starts from empty {} when no instance entry', () => {
        const { result } = renderHook(() => useExpanding(TID))
        expect(result.current[0]).toEqual({})
    })

    it('hydrates from store instance.expanded', () => {
        useTableStateStore.setState({
            instances: { [TID]: { expanded: { '1': true } } as any },
        })
        const { result } = renderHook(() => useExpanding(TID))
        expect(result.current[0]).toEqual({ '1': true })
    })

    it('setExpanded writes through to store', () => {
        const { result } = renderHook(() => useExpanding(TID))
        act(() => {
            result.current[1]({ '2': true })
        })
        expect(useTableStateStore.getState().instances[TID].expanded).toEqual({
            '2': true,
        })
    })
})
