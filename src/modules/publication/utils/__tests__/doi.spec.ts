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

describe('derived web link ownership', () => {
    it.each([
        ['10.1234/Old', 'https://doi.org/10.1234/Old'],
        [
            '10.1234/literal%20?part#section',
            'https://doi.org/10.1234/literal%2520%3Fpart%23section',
        ],
    ])('updates a link belonging to the previous DOI %s', (previousDoi, link) => {
        expect(getDerivedWebLink('10.1234/new', link, previousDoi)).toBe(
            'https://doi.org/10.1234/new',
        )
    })

    it('recognizes a legacy uppercase link for the current DOI', () => {
        expect(getDerivedWebLink('10.1234/Current', 'https://doi.org/10.1234/Current')).toBe(
            'https://doi.org/10.1234/current',
        )
    })

    it.each([
        'https://doi.org/10.1234/other',
        'https://doi.org/10.1234/old?source=custom',
        'http://dx.doi.org/10.1234/old',
        'https://publisher.example/article',
    ])('preserves an independently supplied link %s', link => {
        expect(getDerivedWebLink('10.1234/new', link, '10.1234/old')).toBeUndefined()
    })

    it('does not infer ownership of an unrelated link during hydration', () => {
        expect(getDerivedWebLink('10.1234/new', 'https://doi.org/10.1234/old')).toBeUndefined()
    })
})
