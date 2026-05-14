import { act, renderHook } from '@testing-library/react'

import useTableStateStore from '@/store/useTableStateStore'

import { useRowSelection } from '../useRowSelection'

const TID = 'orders'

beforeEach(() => {
    useTableStateStore.setState({ instances: {} })
})

describe('useRowSelection', () => {
    it('returns empty initial selection', () => {
        const { result } = renderHook(() => useRowSelection(TID))
        const [selection] = result.current
        expect(selection).toEqual({})
    })

    it('returns existing selection from store instance', () => {
        useTableStateStore.setState({
            instances: { [TID]: { rowSelection: { '0': true } } as any },
        })
        const { result } = renderHook(() => useRowSelection(TID))
        expect(result.current[0]).toEqual({ '0': true })
    })

    it('setRowSelection writes object update to the store', () => {
        const { result } = renderHook(() => useRowSelection(TID))
        act(() => {
            result.current[1]({ '2': true })
        })
        expect(
            useTableStateStore.getState().instances[TID].rowSelection,
        ).toEqual({ '2': true })
    })

    it('setRowSelection accepts updater function form', () => {
        useTableStateStore.setState({
            instances: { [TID]: { rowSelection: { '1': true } } as any },
        })
        const { result } = renderHook(() => useRowSelection(TID))
        act(() => {
            result.current[1](prev => ({ ...prev, '2': true }))
        })
        expect(
            useTableStateStore.getState().instances[TID].rowSelection,
        ).toEqual({ '1': true, '2': true })
    })
})
