import { act } from '@testing-library/react'

import { useModalStore } from '../useModalStore'

const initial = {
    isOpen: false,
    isConfirmed: false,
    children: null,
    submit: undefined,
    error: '',
}

describe('useModalStore', () => {
    beforeEach(() => act(() => useModalStore.setState({ params: initial })))

    it('starts with default params', () => {
        expect(useModalStore.getState().params).toEqual(initial)
    })

    it('patchParams merges into params', () => {
        act(() => useModalStore.getState().patchParams({ isOpen: true, error: 'boom' }))
        expect(useModalStore.getState().params).toEqual({ ...initial, isOpen: true, error: 'boom' })
    })

    it('patchParams overrides incrementally', () => {
        act(() => useModalStore.getState().patchParams({ isOpen: true }))
        act(() => useModalStore.getState().patchParams({ isConfirmed: true }))
        expect(useModalStore.getState().params.isOpen).toBe(true)
        expect(useModalStore.getState().params.isConfirmed).toBe(true)
    })

    it('resetParams returns to initial', () => {
        act(() => useModalStore.getState().patchParams({ isOpen: true, error: 'x' }))
        act(() => useModalStore.getState().resetParams())
        expect(useModalStore.getState().params).toEqual(initial)
    })
})
