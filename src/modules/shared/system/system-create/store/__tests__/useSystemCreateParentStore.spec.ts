import { act } from '@testing-library/react'

import { useSystemCreateParentStore } from '../useSystemCreateParentStore'

const reset = () => act(() => useSystemCreateParentStore.setState({ parentUid: null }))

describe('useSystemCreateParentStore', () => {
    beforeEach(reset)

    it('defaults to null', () => {
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })

    it('setParentUid stores the value', () => {
        act(() => useSystemCreateParentStore.getState().setParentUid('parent-1'))
        expect(useSystemCreateParentStore.getState().parentUid).toBe('parent-1')
    })

    it('setParentUid coerces undefined / empty to null', () => {
        act(() => useSystemCreateParentStore.getState().setParentUid(undefined))
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
        act(() => useSystemCreateParentStore.getState().setParentUid(''))
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })

    it('clear() resets to null', () => {
        act(() => useSystemCreateParentStore.getState().setParentUid('p'))
        act(() => useSystemCreateParentStore.getState().clear())
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })
})
