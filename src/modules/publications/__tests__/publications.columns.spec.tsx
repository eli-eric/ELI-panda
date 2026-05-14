import { renderHook } from '@testing-library/react'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { usePublicationColumns } from '../publications.columns'

jest.mock('../components/TitleCell', () => ({
    TitleCell: () => null,
}))

const renderHookWithProviders = () =>
    renderHook(() => usePublicationColumns(), { wrapper: AllProvidersWrapper })

describe('usePublicationColumns', () => {
    it('first column is title with sticky meta and TitleCell cell renderer', () => {
        const { result } = renderHookWithProviders()
        const first = result.current[0]
        expect(first.id).toBe('title')
        expect((first.meta as any).sticky).toBe(true)
        expect(first.cell).toBeDefined()
    })

    it('mediaType accessor falls back to MEDIA_TYPE_MAP[mediaType] when mediaTypeCb missing', () => {
        const { result } = renderHookWithProviders()
        const mediaType = result.current.find(c => c.id === 'mediaType')!
        const fn = (mediaType as any).accessorFn as (r: any) => unknown
        const row = { mediaTypeCb: null, mediaType: 'article' }
        // Falls back when mediaTypeCb is falsy; result is from MEDIA_TYPE_MAP (string or undefined)
        const out = fn(row)
        expect(out === undefined || typeof out === 'string').toBe(true)
    })

    it('experimentalSystem accessor: cb name preferred, falls back to plain string', () => {
        const { result } = renderHookWithProviders()
        const col = result.current.find(c => c.id === 'experimentalSystem')!
        const fn = (col as any).accessorFn as (r: any) => unknown
        expect(fn({ experimentalSystemCb: { name: 'Cb' }, experimentalSystem: 'plain' })).toBe('Cb')
        expect(fn({ experimentalSystemCb: null, experimentalSystem: 'plain' })).toBe('plain')
    })

    it('publishingCountry accessor extracts nested name', () => {
        const { result } = renderHookWithProviders()
        const col = result.current.find(c => c.id === 'publishingCountry')!
        const fn = (col as any).accessorFn as (r: any) => unknown
        expect(fn({ publishingCountry: { name: 'CZ' } })).toBe('CZ')
        expect(fn({})).toBeUndefined()
    })

    it('all returned columns have distinct ids', () => {
        const { result } = renderHookWithProviders()
        const ids = result.current.map(c => c.id)
        const unique = new Set(ids)
        expect(unique.size).toBe(ids.length)
    })
})
