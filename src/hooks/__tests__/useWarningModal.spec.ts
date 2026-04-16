import { renderHook } from '@testing-library/react'

import { useWarningModalStore } from '@/store/useWarningModalStore'

import useWarningModal from '../useWarningModal'

beforeEach(() => {
    jest.clearAllMocks()
    useWarningModalStore.setState({
        params: { isOpen: false, isConfirmed: false, error: '', message: '' },
        pendingExecution: undefined,
        executionHistory: new Set(),
    })
})

describe('useWarningModal', () => {
    it('returns withWarningModal function', () => {
        const { result } = renderHook(() => useWarningModal())
        expect(typeof result.current).toBe('function')
    })

    it('opens modal with global message when callback is called', () => {
        const { result } = renderHook(() => useWarningModal('Are you sure?'))
        const wrapped = result.current(() => {})
        wrapped()

        const state = useWarningModalStore.getState()
        expect(state.params.isOpen).toBe(true)
        expect(state.params.message).toBe('Are you sure?')
    })

    it('uses per-callback message over global message', () => {
        const { result } = renderHook(() => useWarningModal('Global'))
        const wrapped = result.current(() => {}, 'Per-call message')
        wrapped()

        const state = useWarningModalStore.getState()
        expect(state.params.message).toBe('Per-call message')
    })

    it('defaults to "Are you sure?" when no message provided', () => {
        const { result } = renderHook(() => useWarningModal())
        const wrapped = result.current(() => {})
        wrapped()

        const state = useWarningModalStore.getState()
        expect(state.params.message).toBe('Are you sure?')
    })

    it('stores callback for later execution', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useWarningModal())
        const wrapped = result.current(callback)
        wrapped('arg1', 'arg2')

        const state = useWarningModalStore.getState()
        expect(state.pendingExecution).toBeDefined()
        expect(state.pendingExecution?.callback).toBe(callback)
        expect(state.pendingExecution?.callbackArgs).toEqual(['arg1', 'arg2'])
    })
})
