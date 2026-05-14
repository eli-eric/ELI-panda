import { act } from '@testing-library/react'

import { useSystemMovingStore } from '../useSystemMovingStore'

const reset = () =>
    act(() =>
        useSystemMovingStore.setState({
            childSystem: undefined,
            parentSystem: undefined,
        }),
    )

describe('useSystemMovingStore', () => {
    beforeEach(reset)

    it('defaults: undefined child/parent + tableIds set', () => {
        const s = useSystemMovingStore.getState()
        expect(s.childSystem).toBeUndefined()
        expect(s.parentSystem).toBeUndefined()
        expect(s.tableIdLeft).toBe('systems-left')
        expect(s.tableIdRight).toBe('systems-right')
    })

    it('setChildSystem + setParentSystem store values', () => {
        const child = { uid: 'c', tableId: 'systems-left' } as any
        const parent = { uid: 'p', tableId: 'systems-right' } as any
        act(() => useSystemMovingStore.getState().setChildSystem(child))
        act(() => useSystemMovingStore.getState().setParentSystem(parent))
        expect(useSystemMovingStore.getState().childSystem).toBe(child)
        expect(useSystemMovingStore.getState().parentSystem).toBe(parent)
    })

    it('clear() resets both child and parent to undefined', () => {
        act(() =>
            useSystemMovingStore
                .getState()
                .setChildSystem({ uid: 'c' } as any),
        )
        act(() =>
            useSystemMovingStore
                .getState()
                .setParentSystem({ uid: 'p' } as any),
        )
        act(() => useSystemMovingStore.getState().clear())
        const s = useSystemMovingStore.getState()
        expect(s.childSystem).toBeUndefined()
        expect(s.parentSystem).toBeUndefined()
    })
})
