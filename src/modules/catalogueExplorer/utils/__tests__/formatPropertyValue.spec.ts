import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import { formatPropertyValue, parseRange } from '../formatPropertyValue'

const makeDetail = (
    typeUid: PROPERTY_TYPE,
    value: unknown,
    extra: Partial<CatalogueItemDetail['property']> = {},
): CatalogueItemDetail =>
    ({
        propertyGroup: 'G',
        value,
        property: {
            uid: 'p',
            name: 'Prop',
            type: { uid: typeUid, name: 'T' },
            ...extra,
        },
    }) as CatalogueItemDetail

const yes = 'Yes'
const no = 'No'
const emDash = '—'

const fmt = (detail: CatalogueItemDetail) => formatPropertyValue(detail, { yes, no, emDash })

describe('formatPropertyValue', () => {
    it('returns em-dash for empty value', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.TEXT, ''))).toBe(emDash)
        expect(fmt(makeDetail(PROPERTY_TYPE.TEXT, null))).toBe(emDash)
        expect(fmt(makeDetail(PROPERTY_TYPE.NUMBER, undefined))).toBe(emDash)
    })

    it('returns string-cast for TEXT', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.TEXT, 'hello'))).toBe('hello')
    })

    it('returns string-cast for NUMBER', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.NUMBER, 42))).toBe('42')
        expect(fmt(makeDetail(PROPERTY_TYPE.NUMBER, '42'))).toBe('42')
    })

    it('maps BOOLEAN true to yes label', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.BOOLEAN, 'true'))).toBe(yes)
    })

    it('maps BOOLEAN false to no label', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.BOOLEAN, 'false'))).toBe(no)
    })

    it('returns string-cast for LIST', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.LIST, 'Blue'))).toBe('Blue')
    })

    it('formats RANGE JSON as "from – to"', () => {
        const raw = JSON.stringify({ from: '10', to: '20' })
        expect(fmt(makeDetail(PROPERTY_TYPE.RANGE, raw))).toBe('10 – 20')
    })

    it('returns em-dash for RANGE with both ends empty', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.RANGE, JSON.stringify({ from: '', to: '' })))).toBe(
            emDash,
        )
    })

    it('formats RANGE with only one end', () => {
        expect(fmt(makeDetail(PROPERTY_TYPE.RANGE, JSON.stringify({ from: '10', to: '' })))).toBe(
            '10 – —',
        )
    })
})

describe('parseRange', () => {
    it('parses JSON string into {from,to}', () => {
        expect(parseRange(JSON.stringify({ from: '1', to: '9' }))).toEqual({ from: '1', to: '9' })
    })

    it('returns empty object for non-JSON / empty input', () => {
        expect(parseRange('')).toEqual({ from: '', to: '' })
        expect(parseRange('garbage')).toEqual({ from: '', to: '' })
        expect(parseRange(null)).toEqual({ from: '', to: '' })
    })
})
