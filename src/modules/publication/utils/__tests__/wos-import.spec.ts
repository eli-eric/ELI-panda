import { MEDIA_TYPE_UID } from '../../types/constants'
import {
    buildDefaultWosAuthorSelections,
    buildSelectedWosResearchers,
    buildWosComparisonValues,
    buildWosFieldPatch,
    buildWosFieldRows,
    buildWosFormPatch,
    displayWosValue,
} from '../wos-import'

describe('buildWosFieldRows', () => {
    it('treats whitespace as blank consistently in selection, patches, and display', () => {
        expect(buildWosFieldRows({ title: '  ' }, { title: 'Incoming', pages: '  ' })).toEqual([
            expect.objectContaining({ field: 'title', selectedByDefault: true, status: 'empty' }),
        ])
        expect(buildWosFieldPatch({ title: '  ', issue: 0 }, ['title', 'issue'])).toEqual({
            issue: 0,
        })
        expect(displayWosValue('  ', '(empty)')).toBe('(empty)')
        expect(displayWosValue(null, '(empty)')).toBe('(empty)')
        expect(displayWosValue(0, '(empty)')).toBe('0')
    })

    it('preselects blank fields and leaves existing values unselected', () => {
        const rows = buildWosFieldRows(
            {
                title: 'Title already typed by the librarian',
                longJournalTitle: '',
            },
            {
                title: 'Title from Web of Science',
                longJournalTitle: 'Journal from Web of Science',
            },
        )

        expect(rows).toEqual([
            {
                field: 'title',
                currentValue: 'Title already typed by the librarian',
                incomingValue: 'Title from Web of Science',
                selectedByDefault: false,
                status: 'different',
            },
            {
                field: 'longJournalTitle',
                currentValue: '',
                incomingValue: 'Journal from Web of Science',
                selectedByDefault: true,
                status: 'empty',
            },
        ])
    })
})

describe('buildWosFieldPatch', () => {
    it('returns only fields explicitly selected by the librarian', () => {
        expect(
            buildWosFieldPatch(
                {
                    title: 'Incoming title',
                    longJournalTitle: 'Incoming journal',
                    yearOfPublication: '2024',
                },
                ['longJournalTitle', 'yearOfPublication'],
            ),
        ).toEqual({
            longJournalTitle: 'Incoming journal',
            yearOfPublication: '2024',
        })
    })
})

describe('media-specific ISBN mapping', () => {
    it('compares and writes a WoS ISBN as proceedingsIsbn for media type D', () => {
        const currentValues = {
            mediaTypeCb: {
                uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS,
                name: 'Conference proceedings',
            },
            isbn: 'hidden-book-isbn',
            proceedingsIsbn: 'current-proceedings-isbn',
        }
        const incomingValues = { isbn: '978-1-4028-9462-6' }

        expect(buildWosComparisonValues(currentValues, incomingValues, []).isbn).toBe(
            'current-proceedings-isbn',
        )
        expect(buildWosFormPatch(currentValues, incomingValues, ['isbn'])).toEqual({
            proceedingsIsbn: '978-1-4028-9462-6',
        })
    })

    it('keeps a WoS ISBN in isbn when media type C is selected from the preview', () => {
        const currentValues = {
            mediaTypeCb: {
                uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS,
                name: 'Conference proceedings',
            },
        }
        const incomingValues = {
            isbn: '978-1-4028-9462-6',
            mediaTypeCb: { uid: MEDIA_TYPE_UID.BOOK_CHAPTER, name: 'Book chapter', code: 'C' },
        }

        expect(buildWosFormPatch(currentValues, incomingValues, ['mediaTypeCb', 'isbn'])).toEqual({
            mediaTypeCb: incomingValues.mediaTypeCb,
            isbn: '978-1-4028-9462-6',
        })
    })
})

describe('buildDefaultWosAuthorSelections', () => {
    it('selects ResearcherID matches but never preselects name matches', () => {
        expect(
            buildDefaultWosAuthorSelections([
                {
                    sourceIndex: 0,
                    displayName: 'Ada Lovelace',
                    researcherId: 'A-1',
                    match: {
                        kind: 'researcher-id',
                        candidates: [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
                    },
                },
                {
                    sourceIndex: 1,
                    displayName: 'Grace Hopper',
                    researcherId: 'G-1',
                    match: {
                        kind: 'name',
                        candidates: [{ uid: 'grace', firstName: 'Grace', lastName: 'Hopper' }],
                    },
                },
            ]),
        ).toEqual({ 0: 'ada' })
    })
})

describe('buildSelectedWosResearchers', () => {
    it('preserves existing ELI researchers and appends selected matches once', () => {
        const authors = [
            {
                sourceIndex: 0,
                displayName: 'Ada Lovelace',
                match: {
                    kind: 'researcher-id' as const,
                    candidates: [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
                },
            },
            {
                sourceIndex: 1,
                displayName: 'Grace Hopper',
                match: {
                    kind: 'name' as const,
                    candidates: [{ uid: 'grace', firstName: 'Grace', lastName: 'Hopper' }],
                },
            },
        ]

        expect(
            buildSelectedWosResearchers(
                [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
                authors,
                { 0: 'ada', 1: 'grace' },
            ),
        ).toEqual([
            { uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
            { uid: 'grace', firstName: 'Grace', lastName: 'Hopper' },
        ])
    })
})

describe('numeric zero values', () => {
    it('offers zero-valued incoming issue and volume fields', () => {
        expect(buildWosFieldRows({}, { issue: 0, volume: 0 })).toEqual([
            expect.objectContaining({
                field: 'volume',
                incomingValue: 0,
                status: 'empty',
                selectedByDefault: true,
            }),
            expect.objectContaining({
                field: 'issue',
                incomingValue: 0,
                status: 'empty',
                selectedByDefault: true,
            }),
        ])
        expect(buildWosFieldPatch({ issue: 0, volume: 0 }, ['issue', 'volume'])).toEqual({
            issue: 0,
            volume: 0,
        })
    })
    it('requires confirmation before overwriting zero and recognizes identical zeroes', () => {
        expect(buildWosFieldRows({ issue: 0, volume: 0 }, { issue: 1, volume: 0 })).toEqual([
            expect.objectContaining({ field: 'volume', status: 'same', selectedByDefault: false }),
            expect.objectContaining({
                field: 'issue',
                status: 'different',
                selectedByDefault: false,
            }),
        ])
    })
})
