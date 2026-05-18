import {
    buildChangeEntry,
    buildCodebookSnapshot,
    FIELD_MESSAGE_KEYS,
    getFieldLabelKey,
    getFieldType,
} from '../fieldChangeBuilder'

describe('getFieldType', () => {
    it('returns "codebook" for relationship fields', () => {
        for (const f of [
            'location',
            'zone',
            'systemType',
            'responsible',
            'responsibleTeam',
            'owner',
        ]) {
            expect(getFieldType(f)).toBe('codebook')
        }
    })

    it('returns "string" for other fields', () => {
        expect(getFieldType('name')).toBe('string')
        expect(getFieldType('description')).toBe('string')
        expect(getFieldType('arbitrary')).toBe('string')
    })
})

describe('getFieldLabelKey', () => {
    it('returns the i18n key for known fields', () => {
        expect(getFieldLabelKey('name')).toBe(FIELD_MESSAGE_KEYS.name)
        expect(getFieldLabelKey('location')).toBe(FIELD_MESSAGE_KEYS.location)
    })

    it('returns undefined for unknown field', () => {
        expect(getFieldLabelKey('unknown')).toBeUndefined()
    })
})

describe('buildChangeEntry', () => {
    it('assembles entry with field/type/oldValue/newValue', () => {
        expect(
            buildChangeEntry({
                field: 'zone',
                oldValue: { uid: 'z1', name: 'Z1' } as any,
                newValue: { uid: 'z2', name: 'Z2' } as any,
            }),
        ).toEqual({
            field: 'zone',
            type: 'codebook',
            oldValue: { uid: 'z1', name: 'Z1' },
            newValue: { uid: 'z2', name: 'Z2' },
        })
    })

    it('uses string type for non-codebook fields', () => {
        const entry = buildChangeEntry({ field: 'name', oldValue: 'a', newValue: 'b' })
        expect(entry.type).toBe('string')
    })
})

describe('buildCodebookSnapshot', () => {
    it('returns null when value is missing uid or name', () => {
        expect(buildCodebookSnapshot(null)).toBeNull()
        expect(buildCodebookSnapshot(undefined)).toBeNull()
        expect(buildCodebookSnapshot({ uid: '1' } as any)).toBeNull()
        expect(buildCodebookSnapshot({ name: 'x' } as any)).toBeNull()
    })

    it('builds snapshot {uid,name} when code is missing', () => {
        expect(buildCodebookSnapshot({ uid: '1', name: 'X' } as any)).toEqual({
            uid: '1',
            name: 'X',
        })
    })

    it('includes code when provided', () => {
        expect(buildCodebookSnapshot({ uid: '1', name: 'X', code: 'C' } as any)).toEqual({
            uid: '1',
            name: 'X',
            code: 'C',
        })
    })
})
