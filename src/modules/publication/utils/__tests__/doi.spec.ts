import { getDerivedWebLink, normalizeDoi } from '../doi'

describe('normalizeDoi', () => {
    it.each([
        ['10.1234/Example.Article', '10.1234/example.article'],
        ['doi: 10.1234/Example.Article', '10.1234/example.article'],
        ['10.1234/literal%20', '10.1234/literal%20'],
        ['doi: 10.1234/literal%2F', '10.1234/literal%2f'],
        ['https://doi.org/10.1234%2FExample.Article?source=panda', '10.1234/example.article'],
        ['http://dx.doi.org/10.1234/Example.Article#fragment', '10.1234/example.article'],
    ])('normalizes %s', (value, expected) => {
        expect(normalizeDoi(value)).toBe(expected)
    })

    it.each(['', 'not-a-doi', 'https://example.test/10.1234/article'])('rejects %s', value => {
        expect(normalizeDoi(value)).toBeUndefined()
    })
})

it('escapes literal DOI characters in resolver URLs without losing them', () => {
    const doi = '10.1234/literal%20?part#section'
    const link = getDerivedWebLink(doi, '')
    expect(link).toBe('https://doi.org/10.1234/literal%2520%3Fpart%23section')
    expect(normalizeDoi(link!)).toBe(doi)
})
it('does not treat a lookalike host as a resolver link', () => {
    expect(getDerivedWebLink('10.1234/new', 'https://doi.org.example.com/old')).toBeUndefined()
})
