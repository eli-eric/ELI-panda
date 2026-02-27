import { useRelationsStore } from '../useRelationsStore'

describe('useRelationsStore', () => {
    beforeEach(() => {
        useRelationsStore.getState().setSelectedUidForSystem(undefined)
        useRelationsStore.getState().setSelectedRelationshipType(undefined)
    })

    it('has undefined selectedUidForSystem initially', () => {
        expect(useRelationsStore.getState().selectedUidForSystem).toBeUndefined()
    })

    it('sets selectedUidForSystem', () => {
        useRelationsStore.getState().setSelectedUidForSystem('uid-1')
        expect(useRelationsStore.getState().selectedUidForSystem).toBe('uid-1')
    })

    it('resets selectedUidForSystem to undefined', () => {
        useRelationsStore.getState().setSelectedUidForSystem('uid-1')
        useRelationsStore.getState().setSelectedUidForSystem(undefined)
        expect(useRelationsStore.getState().selectedUidForSystem).toBeUndefined()
    })

    it('overwrites previous value on successive calls', () => {
        useRelationsStore.getState().setSelectedUidForSystem('uid-1')
        useRelationsStore.getState().setSelectedUidForSystem('uid-2')
        expect(useRelationsStore.getState().selectedUidForSystem).toBe('uid-2')
    })

    it('has undefined selectedRelationshipType initially', () => {
        expect(useRelationsStore.getState().selectedRelationshipType).toBeUndefined()
    })

    it('sets selectedRelationshipType', () => {
        useRelationsStore.getState().setSelectedRelationshipType('IS_COOLED_BY')
        expect(useRelationsStore.getState().selectedRelationshipType).toBe('IS_COOLED_BY')
    })

    it('resets selectedRelationshipType to undefined', () => {
        useRelationsStore.getState().setSelectedRelationshipType('IS_SPARE_FOR')
        useRelationsStore.getState().setSelectedRelationshipType(undefined)
        expect(useRelationsStore.getState().selectedRelationshipType).toBeUndefined()
    })

    it('overwrites selectedRelationshipType on successive calls', () => {
        useRelationsStore.getState().setSelectedRelationshipType('IS_SPARE_FOR')
        useRelationsStore.getState().setSelectedRelationshipType('IS_POWERED_BY')
        expect(useRelationsStore.getState().selectedRelationshipType).toBe('IS_POWERED_BY')
    })
})
