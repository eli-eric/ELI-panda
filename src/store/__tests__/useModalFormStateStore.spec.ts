import { act } from '@testing-library/react'

import { useModalFormStateStore } from '../useModalFormStateStore'

describe('useModalFormStateStore', () => {
    beforeEach(() => act(() => useModalFormStateStore.setState({ isDirty: false })))

    it('defaults to clean', () => {
        expect(useModalFormStateStore.getState().isDirty).toBe(false)
    })

    it('setIsDirty toggles flag', () => {
        act(() => useModalFormStateStore.getState().setIsDirty(true))
        expect(useModalFormStateStore.getState().isDirty).toBe(true)
        act(() => useModalFormStateStore.getState().setIsDirty(false))
        expect(useModalFormStateStore.getState().isDirty).toBe(false)
    })

    it('reset clears dirty flag', () => {
        act(() => useModalFormStateStore.getState().setIsDirty(true))
        act(() => useModalFormStateStore.getState().reset())
        expect(useModalFormStateStore.getState().isDirty).toBe(false)
    })
})
