import { act, renderHook } from '@testing-library/react'

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

    it('treats an empty researcher list as an empty destination', () => {
        const researchers = [{ uid: 'r-1', firstName: 'Jan', lastName: 'Novák' }]
        const [row] = buildWosFieldRows({ eliResearchers: researchers }, [], {
            eliResearchers: [],
        })
        expect(row.status).toBe('empty')
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
    const render = () =>
        renderHook(() => useWosFieldRows({ values, warnings: [], getValues: () => currentValues }))
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

    it('diffs against the form values read when the preview arrived', () => {
        const getValues = jest.fn(() => currentValues)
        const { result, rerender } = renderHook(() =>
            useWosFieldRows({ values, warnings: [], getValues }),
        )
        rerender()
        expect(getValues).toHaveBeenCalledTimes(1)
        expect(result.current.rows).toHaveLength(6)
    })
})
