import { act } from '@testing-library/react'

import { useSystemItemStore } from '../useSystemItemStore'

const reset = () =>
    act(() => useSystemItemStore.setState({ selectedPhysicalSystem: undefined }))

describe('useSystemItemStore', () => {
    beforeEach(reset)

    it('starts with undefined selectedPhysicalSystem', () => {
        expect(useSystemItemStore.getState().selectedPhysicalSystem).toBeUndefined()
    })

    it('setSelectedPhysicalSystem stores + clears via undefined', () => {
        const system = { uid: 'sys-1', name: 'S' } as any
        act(() => useSystemItemStore.getState().setSelectedPhysicalSystem(system))
        expect(useSystemItemStore.getState().selectedPhysicalSystem).toBe(system)
        act(() => useSystemItemStore.getState().setSelectedPhysicalSystem(undefined))
        expect(useSystemItemStore.getState().selectedPhysicalSystem).toBeUndefined()
    })

    it('clear() resets selectedPhysicalSystem to undefined', () => {
        act(() =>
            useSystemItemStore.getState().setSelectedPhysicalSystem({ uid: 'x' } as any),
        )
        act(() => useSystemItemStore.getState().clear())
        expect(useSystemItemStore.getState().selectedPhysicalSystem).toBeUndefined()
    })
})
