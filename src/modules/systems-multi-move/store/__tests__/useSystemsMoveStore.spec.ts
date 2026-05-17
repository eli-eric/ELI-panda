import { act } from '@testing-library/react'

import { useSystemsMoveStore } from '../useSystemsMoveStore'

const reset = () =>
    act(() =>
        useSystemsMoveStore.setState({
            movingSystems: [],
            destinationSystem: null,
        }),
    )

const sys = (uid: string) => ({ uid, name: uid }) as any

describe('useSystemsMoveStore', () => {
    beforeEach(reset)

    it('starts empty with table ids configured', () => {
        const s = useSystemsMoveStore.getState()
        expect(s.movingSystems).toEqual([])
        expect(s.destinationSystem).toBeNull()
        expect(s.destinationSystemsTableId).toBe('destinationSystems')
        expect(s.movingSystemsTableId).toBe('movingSystems')
    })

    it('setMovingSystems replaces the list', () => {
        act(() => useSystemsMoveStore.getState().setMovingSystems([sys('a'), sys('b')]))
        expect(useSystemsMoveStore.getState().movingSystems.map(s => s.uid)).toEqual(['a', 'b'])
    })

    it('addMovingSystem appends', () => {
        act(() => useSystemsMoveStore.getState().addMovingSystem(sys('a')))
        act(() => useSystemsMoveStore.getState().addMovingSystem(sys('b')))
        expect(useSystemsMoveStore.getState().movingSystems.map(s => s.uid)).toEqual(['a', 'b'])
    })

    it('removeMovingSystem filters by uid', () => {
        act(() =>
            useSystemsMoveStore
                .getState()
                .setMovingSystems([sys('a'), sys('b'), sys('c')]),
        )
        act(() => useSystemsMoveStore.getState().removeMovingSystem('b'))
        expect(useSystemsMoveStore.getState().movingSystems.map(s => s.uid)).toEqual(['a', 'c'])
    })

    it('setDestinationSystem + removeDestinationSystem', () => {
        const dest = sys('d')
        act(() => useSystemsMoveStore.getState().setDestinationSystem(dest))
        expect(useSystemsMoveStore.getState().destinationSystem).toBe(dest)
        act(() => useSystemsMoveStore.getState().removeDestinationSystem())
        expect(useSystemsMoveStore.getState().destinationSystem).toBeNull()
    })

    it('reset() clears both lists; resetMovingSystems() clears only moving list', () => {
        act(() => {
            useSystemsMoveStore.getState().setMovingSystems([sys('a')])
            useSystemsMoveStore.getState().setDestinationSystem(sys('d'))
        })
        act(() => useSystemsMoveStore.getState().resetMovingSystems())
        expect(useSystemsMoveStore.getState().movingSystems).toEqual([])
        expect(useSystemsMoveStore.getState().destinationSystem).not.toBeNull()
        act(() => {
            useSystemsMoveStore.getState().setMovingSystems([sys('a')])
            useSystemsMoveStore.getState().reset()
        })
        const s = useSystemsMoveStore.getState()
        expect(s.movingSystems).toEqual([])
        expect(s.destinationSystem).toBeNull()
    })
})
