import { act } from '@testing-library/react'

import { useWarningModalStore } from '../useWarningModalStore'

const reset = () =>
    act(() =>
        useWarningModalStore.setState({
            params: { isOpen: false, isConfirmed: false, error: '', message: '' },
            pendingExecution: undefined,
            executionHistory: new Set(),
        }),
    )

describe('useWarningModalStore', () => {
    beforeEach(reset)

    afterEach(() => {
        jest.useRealTimers()
    })

    it('openModal sets params and queues pending execution', () => {
        const cb = jest.fn()
        act(() => useWarningModalStore.getState().openModal('Sure?', cb, ['arg']))
        const state = useWarningModalStore.getState()
        expect(state.params).toMatchObject({ isOpen: true, message: 'Sure?', error: '' })
        expect(state.pendingExecution?.callback).toBe(cb)
        expect(state.pendingExecution?.callbackArgs).toEqual(['arg'])
    })

    it('closeModal resets params and clears pending execution', () => {
        act(() => useWarningModalStore.getState().openModal('Sure?', jest.fn()))
        act(() => useWarningModalStore.getState().closeModal())
        expect(useWarningModalStore.getState().params.isOpen).toBe(false)
        expect(useWarningModalStore.getState().pendingExecution).toBeUndefined()
    })

    it('confirmModal fires the pending callback with args and records history', () => {
        jest.useFakeTimers()
        const cb = jest.fn()
        act(() => useWarningModalStore.getState().openModal('Sure?', cb, [1, 2]))
        act(() => useWarningModalStore.getState().confirmModal())
        expect(cb).toHaveBeenCalledWith(1, 2)
        expect(useWarningModalStore.getState().executionHistory.size).toBe(1)
    })

    it('confirmModal swallows callback errors into params.error', () => {
        jest.useFakeTimers()
        const cb = jest.fn(() => {
            throw new Error('nope')
        })
        act(() => useWarningModalStore.getState().openModal('Sure?', cb))
        act(() => useWarningModalStore.getState().confirmModal())
        const error = useWarningModalStore.getState().params.error
        expect(error).toMatch(/nope/)
    })

    it('clearExecution wipes pending state and params', () => {
        act(() => useWarningModalStore.getState().openModal('x', jest.fn()))
        act(() => useWarningModalStore.getState().clearExecution())
        expect(useWarningModalStore.getState().pendingExecution).toBeUndefined()
        expect(useWarningModalStore.getState().params.isOpen).toBe(false)
    })

    it('patchParams merges, resetParams reverts', () => {
        act(() => useWarningModalStore.getState().patchParams({ error: 'boom' }))
        expect(useWarningModalStore.getState().params.error).toBe('boom')
        act(() => useWarningModalStore.getState().resetParams())
        expect(useWarningModalStore.getState().params.error).toBe('')
    })
})
