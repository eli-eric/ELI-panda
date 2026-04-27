import type { FieldChangeEntry } from '@/modules/systemItem/types/responses'

import { isEntityEntry, renderChangeLabel } from '../renderChangeLabel'

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
