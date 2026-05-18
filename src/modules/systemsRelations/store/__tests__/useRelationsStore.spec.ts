import { act } from '@testing-library/react'

import { useRelationsStore } from '../useRelationsStore'

beforeEach(() => {
    act(() => {
        useRelationsStore.setState({
            selectedUidForSystem: undefined,
            selectedRelationshipType: undefined,
        })
    })
})

describe('useRelationsStore', () => {
    it('initial state has both selections undefined', () => {
        const state = useRelationsStore.getState()
        expect(state.selectedUidForSystem).toBeUndefined()
        expect(state.selectedRelationshipType).toBeUndefined()
    })

    it('setSelectedUidForSystem updates uid', () => {
        act(() => {
            useRelationsStore.getState().setSelectedUidForSystem('sys-1')
        })
        expect(useRelationsStore.getState().selectedUidForSystem).toBe('sys-1')
    })

    it('setSelectedUidForSystem can clear (undefined)', () => {
        act(() => {
            useRelationsStore.getState().setSelectedUidForSystem('sys-1')
        })
        act(() => {
            useRelationsStore.getState().setSelectedUidForSystem(undefined)
        })
        expect(useRelationsStore.getState().selectedUidForSystem).toBeUndefined()
    })

    it('setSelectedRelationshipType updates type', () => {
        act(() => {
            useRelationsStore.getState().setSelectedRelationshipType('IS_SPARE_FOR' as any)
        })
        expect(useRelationsStore.getState().selectedRelationshipType).toBe('IS_SPARE_FOR')
    })

    it('setSelectedRelationshipType can clear (undefined)', () => {
        act(() => {
            useRelationsStore.getState().setSelectedRelationshipType('IS_SPARE_FOR' as any)
        })
        act(() => {
            useRelationsStore.getState().setSelectedRelationshipType(undefined)
        })
        expect(useRelationsStore.getState().selectedRelationshipType).toBeUndefined()
    })
})
