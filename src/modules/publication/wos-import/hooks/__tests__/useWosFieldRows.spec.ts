import { act, renderHook } from '@testing-library/react'

import { MEDIA_TYPE_UID } from '../../../types/constants'
import type { WosImportValues, WosImportWarning } from '../../types/wos-preview.types'
import { buildWosFieldRows, useWosFieldRows, type WosFieldRow } from '../useWosFieldRows'

const dayMissing: WosImportWarning = {
    code: 'DATE_DAY_MISSING',
    field: 'dateOfPublication',
    raw: '2024-02',
    message: 'Web of Science reports a month at best.',
}
const issueNotNumeric: WosImportWarning = {
    code: 'ISSUE_NOT_NUMERIC',
    field: 'issue',
    raw: '1-2',
    message: 'Web of Science reports issue "1-2".',
}

const values: WosImportValues = {
    title: 'Incoming title',
    volume: 6,
    pages: '013126',
    pagesCount: 12,
    dateOfPublication: '2024-02',
    mediaTypeCb: { uid: 'media-j', name: 'J - Peer-reviewed article' },
}
const currentValues = {
    title: '   ',
    volume: '7',
    pages: '013126',
    pagesCount: 0,
    mediaTypeCb: { uid: 'media-j', name: 'Renamed in the codebook' },
    dateOfPublication: null,
}

const statusByField = (rows: WosFieldRow[]) =>
    Object.fromEntries(rows.map(row => [row.field, row.status]))

describe('buildWosFieldRows', () => {
    it('classifies each incoming value against the form value', () => {
        const rows = buildWosFieldRows(values, [dayMissing], currentValues)
        expect(statusByField(rows)).toEqual({
            // whitespace-only and null are empty
            title: 'empty',
            dateOfPublication: 'empty',
            // a different value already typed is an overwrite, never silently replaced
            volume: 'overwrite',
            // zero is a value, not a blank
            pagesCount: 'overwrite',
            // number vs string and codebooks by uid compare as the form stores them
            pages: 'same',
            mediaTypeCb: 'same',
        })
    })

    it('orders rows by the frozen field list', () => {
        const rows = buildWosFieldRows(values, [], currentValues)
        expect(rows.map(row => row.field)).toEqual([
            'title',
            'volume',
            'pages',
            'pagesCount',
            'dateOfPublication',
            'mediaTypeCb',
        ])
    })

    it('attaches warnings to their row and keeps a row for a warned field WoS could not map', () => {
        const rows = buildWosFieldRows(values, [dayMissing, issueNotNumeric], {})
        expect(rows.find(row => row.field === 'dateOfPublication')?.warnings).toEqual([dayMissing])
        expect(rows.find(row => row.field === 'issue')).toMatchObject({
            status: 'warningOnly',
            warnings: [issueNotNumeric],
        })
    })

    it('treats the DOI typed in lowercase as the same DOI WoS spells in canonical case', () => {
        const [doi] = buildWosFieldRows({ doi: '10.1103/PhysRevResearch.6.013126' }, [], {
            doi: '10.1103/physrevresearch.6.013126',
        })
        expect(doi.status).toBe('same')
        const [title] = buildWosFieldRows({ title: 'Laser' }, [], { title: 'LASER' })
        expect(title.status).toBe('overwrite')
    })
})

describe('useWosFieldRows', () => {
    const render = () => renderHook(() => useWosFieldRows({ values, warnings: [], currentValues }))
    const sorted = (fields: ReadonlySet<string>) => Array.from(fields).sort()

    it('pre-checks empty destinations only and counts just the rows that change', () => {
        const { result } = render()
        expect(sorted(result.current.selected)).toEqual(['dateOfPublication', 'title'])
        expect(result.current.changes.map(row => row.field)).toEqual(['title', 'dateOfPublication'])
    })

    it('applies the bulk selections without ever selecting unchanged rows', () => {
        const { result } = render()
        act(() => result.current.selectAll())
        expect(sorted(result.current.selected)).toEqual([
            'dateOfPublication',
            'pagesCount',
            'title',
            'volume',
        ])
        act(() => result.current.selectNone())
        expect(result.current.changes).toEqual([])
        act(() => result.current.selectOnlyEmpty())
        expect(sorted(result.current.selected)).toEqual(['dateOfPublication', 'title'])
        act(() => result.current.toggle('volume', true))
        expect(result.current.changes.map(row => row.field)).toContain('volume')
    })

    it('compares the ISBN row against proceedingsIsbn when the form is proceedings', () => {
        const isbnValues: WosImportValues = { ...values, isbn: '978-0-00-000000-1' }
        const proceedings: Record<string, unknown> = {
            ...currentValues,
            mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
            proceedingsIsbn: '978-0-00-000000-1',
        }
        const { result } = renderHook(() =>
            useWosFieldRows({ values: isbnValues, warnings: [], currentValues: proceedings }),
        )
        expect(result.current.isbnTarget).toBe('proceedingsIsbn')
        const isbnRow = result.current.rows.find(row => row.field === 'isbn')
        // The form already holds the ISBN — in the field the value would land in.
        expect(isbnRow?.status).toBe('same')
        expect(result.current.selected.has('isbn')).toBe(false)
    })

    it('keeps plain isbn as the target for non-proceedings forms', () => {
        const isbnValues: WosImportValues = { ...values, isbn: '978-0-00-000000-1' }
        const { result } = renderHook(() =>
            useWosFieldRows({ values: isbnValues, warnings: [], currentValues }),
        )
        expect(result.current.isbnTarget).toBe('isbn')
        expect(result.current.rows.find(row => row.field === 'isbn')?.status).toBe('empty')
    })

    it('does not preselect an overwrite in proceedingsIsbn when hidden isbn is empty', () => {
        const { result } = renderHook(() =>
            useWosFieldRows({
                values: { isbn: 'incoming' },
                warnings: [],
                currentValues: {
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
                    proceedingsIsbn: 'existing',
                },
            }),
        )
        expect(result.current.rows[0].status).toBe('overwrite')
        expect(result.current.selected.has('isbn')).toBe(false)
        expect(result.current.changes).toEqual([])
    })

    it('preselects an empty proceedings destination even when hidden isbn is populated', () => {
        const { result } = renderHook(() =>
            useWosFieldRows({
                values: { isbn: 'incoming' },
                warnings: [],
                currentValues: {
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
                    isbn: 'hidden',
                },
            }),
        )
        expect(result.current.selected.has('isbn')).toBe(true)
        expect(result.current.changes.map(row => row.field)).toEqual(['isbn'])
    })

    it('uses the auto-selected media type to choose the initial ISBN destination', () => {
        const { result } = renderHook(() =>
            useWosFieldRows({
                values: {
                    isbn: 'incoming',
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
                },
                warnings: [],
                currentValues: { proceedingsIsbn: 'existing' },
            }),
        )
        expect(result.current.isbnTarget).toBe('proceedingsIsbn')
        expect(sorted(result.current.selected)).toEqual(['mediaTypeCb'])
    })

    it('requires a fresh ISBN choice when toggling media type redirects the destination', () => {
        const { result } = renderHook(() =>
            useWosFieldRows({
                values: {
                    isbn: 'incoming',
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
                },
                warnings: [],
                currentValues: { proceedingsIsbn: 'existing' },
            }),
        )
        act(() => result.current.toggle('mediaTypeCb', false))
        act(() => result.current.toggle('isbn', true))
        expect(result.current.isbnTarget).toBe('isbn')
        act(() => result.current.toggle('mediaTypeCb', true))
        expect(result.current.isbnTarget).toBe('proceedingsIsbn')
        expect(result.current.selected.has('isbn')).toBe(false)
        act(() => result.current.toggle('isbn', true))
        expect(result.current.changes.map(row => row.field)).toContain('isbn')
        act(() => result.current.toggle('mediaTypeCb', false))
        expect(result.current.selected.has('isbn')).toBe(false)
    })

    it('bulk selections classify ISBN against the media type they will actually select', () => {
        const { result } = renderHook(() =>
            useWosFieldRows({
                values: {
                    isbn: 'incoming',
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
                },
                warnings: [],
                currentValues: { isbn: 'incoming', proceedingsIsbn: 'existing' },
            }),
        )
        act(() => result.current.selectNone())
        expect(result.current.rows.find(row => row.field === 'isbn')?.status).toBe('same')
        act(() => result.current.selectAll())
        expect(sorted(result.current.selected)).toEqual(['isbn', 'mediaTypeCb'])
        expect(result.current.isbnTarget).toBe('proceedingsIsbn')
        act(() => result.current.selectNone())
        act(() => result.current.selectOnlyEmpty())
        expect(sorted(result.current.selected)).toEqual(['mediaTypeCb'])
    })
})
