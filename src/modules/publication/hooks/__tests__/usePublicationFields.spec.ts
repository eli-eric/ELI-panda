import { renderHook } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'

import { useMediaTypeStore } from '../useMediaTypeStore'
import { usePublicationFields } from '../usePublicationFields'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, unknown>) => fields,
}))

jest.mock('../useMediaTypeStore', () => ({
    useMediaTypeStore: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseMediaTypeStore = useMediaTypeStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseMediaTypeStore.mockReturnValue({ mediaType: undefined })
})

describe('usePublicationFields', () => {
    it('returns expected key set incl. code/mediaTypeCb/doi/webLink/title', () => {
        mockUseAccessControl.mockReturnValue(() => true)
        const { result } = renderHook(() => usePublicationFields())
        const keys = Object.keys(result.current as Record<string, unknown>)
        expect(keys).toEqual(
            expect.arrayContaining([
                'code',
                'mediaTypeCb',
                'eliPublication',
                'experimentalSystemCb',
                'doi',
                'webLink',
                'openAccessType',
                'title',
                'allAuthors',
                'allAuthorsCount',
                'eliAuthorsCount',
                'longJournalTitle',
                'shortJournalTitle',
            ]),
        )
    })

    it('PUBLICATIONS_EDIT permission enables most fields (but a couple are always disabled)', () => {
        mockUseAccessControl.mockReturnValue(() => true)
        const { result } = renderHook(() => usePublicationFields())
        const fields = result.current as Record<string, { disabled?: boolean }>
        const counts = { enabled: 0, disabled: 0 }
        for (const f of Object.values(fields)) {
            if (f.disabled === true) counts.disabled++
            else counts.enabled++
        }
        // most fields enabled when permission granted
        expect(counts.enabled).toBeGreaterThan(counts.disabled)
    })

    it('No PUBLICATIONS_EDIT permission → all fields disabled', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        const { result } = renderHook(() => usePublicationFields())
        const fields = result.current as Record<string, { disabled?: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(true)
        }
    })
})
