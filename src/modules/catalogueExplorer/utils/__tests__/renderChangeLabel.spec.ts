import type { FieldChangeEntry } from '@/modules/systemItem/types/responses'

import { getEntityTypeI18nKey, isEntityEntry, renderChangeLabel } from '../renderChangeLabel'

const legacyEntry: FieldChangeEntry = {
    field: 'supplier',
    type: 'codebook',
    oldValue: null,
    newValue: { uid: 's-1', name: 'Acme' },
}

const categoryEntry: FieldChangeEntry = {
    field: 'name',
    type: 'string',
    oldValue: 'Lasers',
    newValue: 'Laser modules',
    entity: { type: 'category', uid: 'cat-1', name: 'Laser modules' },
}

const propertyEntry: FieldChangeEntry = {
    field: 'groupUid',
    type: 'string',
    oldValue: 'g-old',
    newValue: 'g-new',
    entity: { type: 'property', uid: 'p-1', name: 'Voltage' },
}

describe('isEntityEntry', () => {
    it('returns false for legacy flat entry', () => {
        expect(isEntityEntry(legacyEntry)).toBe(false)
    })

    it('returns true when entity present', () => {
        expect(isEntityEntry(categoryEntry)).toBe(true)
        expect(isEntityEntry(propertyEntry)).toBe(true)
    })
})

describe('renderChangeLabel', () => {
    it('returns bare field for legacy entry', () => {
        expect(renderChangeLabel(legacyEntry)).toBe('supplier')
    })

    it('prefixes with entity.name for category entry', () => {
        expect(renderChangeLabel(categoryEntry)).toBe('Laser modules: name')
    })

    it('prefixes with entity.name for property-scoped entry', () => {
        expect(renderChangeLabel(propertyEntry)).toBe('Voltage: groupUid')
    })
})

describe('getEntityTypeI18nKey', () => {
    it('returns null for legacy entry', () => {
        expect(getEntityTypeI18nKey(legacyEntry)).toBeNull()
    })

    it('returns category key for category entry', () => {
        const key = getEntityTypeI18nKey(categoryEntry)
        expect(key).toContain('entityCategory')
    })

    it('returns property key for property entry', () => {
        const key = getEntityTypeI18nKey(propertyEntry)
        expect(key).toContain('entityProperty')
    })

    it('returns group key for group entry', () => {
        const groupEntry: FieldChangeEntry = {
            field: 'name',
            type: 'string',
            oldValue: 'a',
            newValue: 'b',
            entity: { type: 'group', uid: 'g-1', name: 'Specs' },
        }
        expect(getEntityTypeI18nKey(groupEntry)).toContain('entityGroup')
    })
})
