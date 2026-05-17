import { act } from '@testing-library/react'

import { useHoveringId } from '../useHoveringId'

describe('useHoveringId', () => {
    beforeEach(() => act(() => useHoveringId.setState({ hoveringId: undefined })))

    it('starts undefined', () => {
        expect(useHoveringId.getState().hoveringId).toBeUndefined()
    })

    it('setHoveringId stores string id', () => {
        act(() => useHoveringId.getState().setHoveringId('row-1'))
        expect(useHoveringId.getState().hoveringId).toBe('row-1')
    })

    it('setHoveringId stores numeric id', () => {
        act(() => useHoveringId.getState().setHoveringId(42))
        expect(useHoveringId.getState().hoveringId).toBe(42)
    })

    it('setHoveringId can clear with undefined', () => {
        act(() => useHoveringId.getState().setHoveringId('x'))
        act(() => useHoveringId.getState().setHoveringId(undefined))
        expect(useHoveringId.getState().hoveringId).toBeUndefined()
    })
})
