import { getPublicationYearOptions } from '../publication-year'

describe('publication year choices', () => {
    it('offers current year, eleven previous years and one future year, newest first', () => {
        const years = getPublicationYearOptions('', 2026)
        expect(years).toHaveLength(13)
        expect(years[0]).toBe('2027')
        expect(years[12]).toBe('2015')
        expect(getPublicationYearOptions('', 2027)[0]).toBe('2028')
    })
    it('includes loaded or imported years outside the range exactly once', () => {
        expect(getPublicationYearOptions('1998', 2026).at(-1)).toBe('1998')
        expect(getPublicationYearOptions(2030, 2026)[0]).toBe('2030')
        expect(
            getPublicationYearOptions('2024', 2026).filter(year => year === '2024'),
        ).toHaveLength(1)
    })
    it.each(['26', 'abc', '20261', '0000', null, undefined])(
        'excludes malformed choice %p',
        year => {
            expect(getPublicationYearOptions(year, 2026)).toEqual(
                getPublicationYearOptions('', 2026),
            )
        },
    )
})
