import { getDisconnectField, isSpareDisconnect } from '../relationshipDisconnect'

describe('relationshipDisconnect', () => {
    describe('getDisconnectField', () => {
        it.each([
            ['IS_SPARE_FOR', 'inbound', 'spareParts'],
            ['IS_SPARE_FOR', 'outbound', 'sparePartsFor'],
            ['IS_COOLED_FROM', 'inbound', 'cools'],
            ['IS_COOLED_FROM', 'outbound', 'cooledFrom'],
            ['IS_POWERED_FROM', 'inbound', 'powers'],
            ['IS_POWERED_FROM', 'outbound', 'poweredFrom'],
            ['IS_CONTROLLED_BY', 'inbound', 'controls'],
            ['IS_CONTROLLED_BY', 'outbound', 'controlledBy'],
            ['IS_INTERLOCKED_BY', 'inbound', 'interlocks'],
            ['IS_INTERLOCKED_BY', 'outbound', 'interlockedBy'],
            ['PROVIDES_DATA_TO', 'inbound', 'receivesDataFrom'],
            ['PROVIDES_DATA_TO', 'outbound', 'providesDataTo'],
            ['DIRECTS_BEAM_TO', 'inbound', 'receivesBeamFrom'],
            ['DIRECTS_BEAM_TO', 'outbound', 'directsBeamTo'],
            ['PROVIDES_VACUUM_FOR', 'inbound', 'receivesVacuumFrom'],
            ['PROVIDES_VACUUM_FOR', 'outbound', 'providesVacuumFor'],
        ] as const)('maps %s/%s → "%s"', (relationshipType, direction, expected) => {
            expect(getDisconnectField(relationshipType, direction)).toBe(expected)
        })

        it('returns undefined for HAS_SUBSYSTEM (not assignable, must not be deletable here)', () => {
            expect(getDisconnectField('HAS_SUBSYSTEM', 'inbound')).toBeUndefined()
            expect(getDisconnectField('HAS_SUBSYSTEM', 'outbound')).toBeUndefined()
        })

        it('returns undefined for unknown relationship types', () => {
            expect(getDisconnectField('NOT_A_REAL_TYPE', 'outbound')).toBeUndefined()
        })
    })

    describe('isSpareDisconnect', () => {
        it.each(['spareParts', 'sparePartsFor'] as const)('treats %s as a spare disconnect', field => {
            expect(isSpareDisconnect(field)).toBe(true)
        })

        it.each(['cooledFrom', 'powers', 'controlledBy', 'providesDataTo'] as const)(
            'does not treat %s as a spare disconnect',
            field => {
                expect(isSpareDisconnect(field)).toBe(false)
            },
        )
    })
})
