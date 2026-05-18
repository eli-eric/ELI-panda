import { getEndpoint } from '../index'

describe('getEndpoint', () => {
    it('joins category, id, and fileCategory into the API path', () => {
        expect(getEndpoint('items', 'abc-123', 'images')).toBe('/api/items/abc-123/images')
    })

    it('serialises undefined segments verbatim', () => {
        expect(getEndpoint(undefined, 'abc', 'images')).toBe('/api/undefined/abc/images')
        expect(getEndpoint('items', undefined, 'images')).toBe('/api/items/undefined/images')
        expect(getEndpoint('items', 'abc', undefined)).toBe('/api/items/abc/undefined')
    })

    it('handles empty strings', () => {
        expect(getEndpoint('', '', '')).toBe('/api///')
    })
})
