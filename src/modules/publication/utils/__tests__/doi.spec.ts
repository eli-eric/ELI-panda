import { normalizeDoi } from '../doi'

describe('normalizeDoi', () => {
    it.each([
        ['10.1234/Example.Article', '10.1234/example.article'],
        ['doi: 10.1234/Example.Article', '10.1234/example.article'],
        ['https://doi.org/10.1234%2FExample.Article?source=panda', '10.1234/example.article'],
        ['http://dx.doi.org/10.1234/Example.Article#fragment', '10.1234/example.article'],
    ])('normalizes %s', (value, expected) => {
        expect(normalizeDoi(value)).toBe(expected)
    })

    it.each(['', 'not-a-doi', 'https://example.test/10.1234/article'])('rejects %s', value => {
        expect(normalizeDoi(value)).toBeUndefined()
    })
})
