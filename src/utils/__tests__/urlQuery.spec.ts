import {
    parseColumnFilterParam,
    parseJsonParam,
    parsePositiveIntParam,
    readQueryParamFromUrl,
} from '../urlQuery'

describe('parseJsonParam', () => {
    it('parses valid JSON', () => {
        expect(parseJsonParam('{"a":1}', null)).toEqual({ a: 1 })
    })

    it('falls back on empty, null and undefined input', () => {
        expect(parseJsonParam('', 'fb')).toBe('fb')
        expect(parseJsonParam(null, 'fb')).toBe('fb')
        expect(parseJsonParam(undefined, 'fb')).toBe('fb')
    })

    it('falls back instead of throwing on malformed JSON', () => {
        expect(parseJsonParam('%5B%7Bnot-json', 'fb')).toBe('fb')
        expect(parseJsonParam('[{"id":', 'fb')).toBe('fb')
    })
})

describe('parsePositiveIntParam', () => {
    it('parses a positive integer', () => {
        expect(parsePositiveIntParam('3', 1)).toBe(3)
    })

    it('falls back for anything that is not a usable page number', () => {
        // `?page=abc` used to become the literal {"page":NaN,…}, which threw in
        // whichever consumer parsed the pagination string back
        expect(parsePositiveIntParam('abc', 1)).toBe(1)
        expect(parsePositiveIntParam('0', 1)).toBe(1)
        expect(parsePositiveIntParam('-2', 1)).toBe(1)
        expect(parsePositiveIntParam('', 7)).toBe(7)
        expect(parsePositiveIntParam(null, 7)).toBe(7)
        expect(parsePositiveIntParam('Infinity', 7)).toBe(7)
    })

    it('accepts trailing junk the way parseInt does', () => {
        expect(parsePositiveIntParam('12abc', 1)).toBe(12)
    })
})

describe('parseColumnFilterParam', () => {
    it('parses a serialized filter array', () => {
        const filters = [{ id: 'systemLevel', value: ['TECHNOLOGY_UNIT'], name: 'systemLevel' }]
        expect(parseColumnFilterParam(JSON.stringify(filters))).toEqual(filters)
    })

    it('returns no filters for missing, malformed or non-array input', () => {
        expect(parseColumnFilterParam(null)).toEqual([])
        expect(parseColumnFilterParam('not-json')).toEqual([])
        expect(parseColumnFilterParam('{"id":"name"}')).toEqual([])
    })

    it('drops entries that are not usable column filters', () => {
        // these reach the store, the API payload and the badge React keys
        expect(parseColumnFilterParam('[1,2]')).toEqual([])
        expect(parseColumnFilterParam('["x"]')).toEqual([])
        expect(parseColumnFilterParam('[null]')).toEqual([])
        expect(parseColumnFilterParam('[{"value":"no-id"}]')).toEqual([])
        expect(parseColumnFilterParam('[{"id":"","value":1}]')).toEqual([])
    })

    it('drops entries with no usable value', () => {
        // these reached the store and rendered a badge with no label
        expect(parseColumnFilterParam('[{"id":"name"}]')).toEqual([])
        expect(parseColumnFilterParam('[{"id":"name","value":null}]')).toEqual([])
    })

    it('keeps falsy-but-meaningful values', () => {
        expect(parseColumnFilterParam('[{"id":"active","value":false}]')).toEqual([
            { id: 'active', value: false },
        ])
        expect(parseColumnFilterParam('[{"id":"count","value":0}]')).toEqual([
            { id: 'count', value: 0 },
        ])
    })

    it('keeps the valid entries alongside invalid ones', () => {
        expect(parseColumnFilterParam('[{"id":"name","value":"a"},7]')).toEqual([
            { id: 'name', value: 'a' },
        ])
    })
})

describe('readQueryParamFromUrl', () => {
    it('reads the param straight from the address bar', () => {
        window.history.replaceState({}, '', '/systems/overview?page=2&filter=%5B%5D')
        expect(readQueryParamFromUrl('filter')).toBe('[]')
        expect(readQueryParamFromUrl('page')).toBe('2')
        expect(readQueryParamFromUrl('missing')).toBeNull()
    })
})
