import { FIELD_MESSAGE_KEYS, getFieldLabelKey } from '../historyFieldLabels'

describe('getFieldLabelKey', () => {
    it('returns the i18n key for known fields', () => {
        expect(getFieldLabelKey('name')).toBe(FIELD_MESSAGE_KEYS.name)
        expect(getFieldLabelKey('location')).toBe(FIELD_MESSAGE_KEYS.location)
    })

    it('labels the fields introduced by the REST audit', () => {
        for (const field of ['operators', 'maintainedBy', 'minimalSpareParstCount', 'importance']) {
            expect(getFieldLabelKey(field)).toBeDefined()
        }
    })

    it('returns undefined for unknown field', () => {
        expect(getFieldLabelKey('unknown')).toBeUndefined()
    })
})
