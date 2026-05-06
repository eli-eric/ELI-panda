import { messages } from '@/i18n/src/messages'

import {
    ASSIGNABLE_RELATIONSHIP_TYPES,
    EXCLUDED_RELATIONSHIP_TYPES,
    getRelationshipDirectionLabel,
} from '../graph'

describe('relationship registry', () => {
    describe('getRelationshipDirectionLabel', () => {
        it.each([
            ['IS_POWERED_FROM', 'outbound', 'Powered from'],
            ['IS_POWERED_FROM', 'inbound', 'Powers'],
            ['IS_COOLED_FROM', 'outbound', 'Cooled from'],
            ['IS_COOLED_FROM', 'inbound', 'Cools'],
            ['IS_CONTROLLED_BY', 'outbound', 'Controlled by'],
            ['IS_INTERLOCKED_BY', 'outbound', 'Interlocked by'],
            ['PROVIDES_DATA_TO', 'outbound', 'Provides data to'],
            ['PROVIDES_DATA_TO', 'inbound', 'Receives data from'],
            ['DIRECTS_BEAM_TO', 'inbound', 'Receives beam from'],
            ['PROVIDES_VACUUM_FOR', 'inbound', 'Receives vacuum from'],
        ] as const)('resolves %s/%s to a key present in en messages → "%s"', (code, dir, expected) => {
            const key = getRelationshipDirectionLabel(code, dir)
            expect(key).toBeDefined()
            expect(messages.en[key as string]).toBe(expected)
        })

        it('returns undefined for HAS_SUBSYSTEM (no direction defined)', () => {
            expect(getRelationshipDirectionLabel('HAS_SUBSYSTEM', 'outbound')).toBeUndefined()
        })

        it('returns undefined for unknown relationship code', () => {
            expect(getRelationshipDirectionLabel('UNKNOWN', 'outbound')).toBeUndefined()
        })
    })

    describe('derived sets', () => {
        it('ASSIGNABLE_RELATIONSHIP_TYPES contains all but HAS_SUBSYSTEM', () => {
            expect(ASSIGNABLE_RELATIONSHIP_TYPES).not.toContain('HAS_SUBSYSTEM')
            expect(ASSIGNABLE_RELATIONSHIP_TYPES).toEqual(
                expect.arrayContaining([
                    'IS_SPARE_FOR',
                    'IS_COOLED_FROM',
                    'IS_POWERED_FROM',
                    'IS_CONTROLLED_BY',
                    'IS_INTERLOCKED_BY',
                    'PROVIDES_DATA_TO',
                    'DIRECTS_BEAM_TO',
                    'PROVIDES_VACUUM_FOR',
                ]),
            )
        })

        it('EXCLUDED_RELATIONSHIP_TYPES contains exactly HAS_SUBSYSTEM', () => {
            expect([...EXCLUDED_RELATIONSHIP_TYPES]).toEqual(['HAS_SUBSYSTEM'])
        })

        it('every assignable type has direction labels', () => {
            for (const code of ASSIGNABLE_RELATIONSHIP_TYPES) {
                expect(getRelationshipDirectionLabel(code, 'outbound')).toBeDefined()
                expect(getRelationshipDirectionLabel(code, 'inbound')).toBeDefined()
            }
        })
    })
})
