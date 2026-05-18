import { ELI_PUBLICATION } from '../../types/constants'
import { formatFormData, formatPublication } from '../formatters'

describe('formatFormData', () => {
    it('converts numeric strings, defaults eliPublication, builds eliAuthors', () => {
        const out = formatFormData({
            allAuthorsCount: '10',
            eliAuthorsCount: '3',
            pagesCount: '12',
            eliResearchers: [
                { firstName: 'Jan', lastName: 'Smith' },
                { firstName: 'Anna', lastName: 'Karen' },
            ],
        })
        expect(out.eliPublication).toBe(ELI_PUBLICATION.YES)
        expect(out.allAuthorsCount).toBe(10)
        expect(out.eliAuthorsCount).toBe(3)
        expect(out.pagesCount).toBe(12)
        expect(out.eliAuthors).toBe('Smith, Jan; Karen, Anna')
    })

    it('coerces optional numeric fields to null when blank', () => {
        const out = formatFormData({
            allAuthorsCount: '1',
            eliAuthorsCount: '1',
            pagesCount: '1',
            volume: '',
            bookPagesCount: '',
            issue: '',
            impactFactor: '',
        })
        expect(out.volume).toBeNull()
        expect(out.bookPagesCount).toBeNull()
        expect(out.issue).toBeNull()
        expect(out.impactFactor).toBeNull()
    })

    it('keeps non-blank optional numerics', () => {
        const out = formatFormData({
            allAuthorsCount: '1',
            eliAuthorsCount: '1',
            pagesCount: '1',
            volume: '5',
            issue: '2',
        })
        expect(out.volume).toBe(5)
        expect(out.issue).toBe(2)
    })

    it('maps authorsDepartments and counts numeric authorsCount', () => {
        const out = formatFormData({
            allAuthorsCount: '1',
            eliAuthorsCount: '1',
            pagesCount: '1',
            authorsDepartments: [{ name: 'Phys', authorsCount: '4' }],
        })
        expect(out.authorsDepartments).toEqual([{ name: 'Phys', authorsCount: 4 }])
    })

    it('defaults eliResearchers to empty array and produces empty eliAuthors string', () => {
        const out = formatFormData({
            allAuthorsCount: '0',
            eliAuthorsCount: '0',
            pagesCount: '0',
        })
        expect(out.eliResearchers).toEqual([])
        expect(out.eliAuthors).toBe('')
    })
})

describe('formatPublication', () => {
    it('returns undefined for missing input', () => {
        expect(formatPublication(undefined)).toBeUndefined()
    })

    it('defaults eliPublication and language', () => {
        const out = formatPublication({ title: 't' } as any)
        expect(out.eliPublication).toBe(ELI_PUBLICATION.YES)
        expect(out.language).toBe('English')
        expect(out.eliResearchers).toEqual([])
    })

    it('keeps explicit eliPublication / language values', () => {
        const out = formatPublication({
            title: 't',
            eliPublication: ELI_PUBLICATION.NO,
            language: 'Czech',
        } as any)
        expect(out.eliPublication).toBe(ELI_PUBLICATION.NO)
        expect(out.language).toBe('Czech')
    })
})
