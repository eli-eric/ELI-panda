import { parseColumnFilterParam, parseJsonParam, readQueryParamFromUrl } from '../urlQuery'

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
})

describe('readQueryParamFromUrl', () => {
    it('reads the param straight from the address bar', () => {
        window.history.replaceState({}, '', '/systems/overview?page=2&filter=%5B%5D')
        expect(readQueryParamFromUrl('filter')).toBe('[]')
        expect(readQueryParamFromUrl('page')).toBe('2')
        expect(readQueryParamFromUrl('missing')).toBeNull()
    })
})
