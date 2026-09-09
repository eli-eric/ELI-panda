import { useQuery } from '@tanstack/react-query'

import { BATCH_LIMIT } from '../../types/constants'
import { useSystemCodesPreview } from '../useSystemCodesPreview'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: false })
})

describe('useSystemCodesPreview', () => {
    it('builds query with verbatim batch when within BATCH_LIMIT', () => {
        useSystemCodesPreview({ zoneUid: 'z', systemTypeUid: 's', batch: 5 })
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual([
            'systemCodesPreview',
            { query: { zoneUid: 'z', systemTypeUid: 's', batch: 5 } },
        ])
        expect(opts.enabled).toBe(true)
    })

    it('clamps batch to BATCH_LIMIT', () => {
        useSystemCodesPreview({ zoneUid: 'z', systemTypeUid: 's', batch: BATCH_LIMIT + 7 })
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey[1].query.batch).toBe(BATCH_LIMIT)
    })

    it('disables query when params is null', () => {
        useSystemCodesPreview(null)
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['systemCodesPreview', { query: undefined }])
        expect(opts.enabled).toBe(false)
    })

    describe('retry predicate', () => {
        const statusError = (status: number) => {
            const error = new Error('boom') as Error & { status?: number }
            error.status = status
            return error
        }

        it.each([400, 403, 404])('never retries a %i — the answer will not change', status => {
            useSystemCodesPreview({ zoneUid: 'z', systemTypeUid: 's', batch: 1 })
            const { retry } = mockUseQuery.mock.calls[0][0]
            expect(retry(0, statusError(status))).toBe(false)
        })

        it('retries a 500 up to three times', () => {
            useSystemCodesPreview({ zoneUid: 'z', systemTypeUid: 's', batch: 1 })
            const { retry } = mockUseQuery.mock.calls[0][0]
            expect(retry(0, statusError(500))).toBe(true)
            expect(retry(2, statusError(500))).toBe(true)
            expect(retry(3, statusError(500))).toBe(false)
        })

        it('retries statusless network errors', () => {
            useSystemCodesPreview({ zoneUid: 'z', systemTypeUid: 's', batch: 1 })
            const { retry } = mockUseQuery.mock.calls[0][0]
            expect(retry(0, new Error('network down'))).toBe(true)
        })
    })

    it.each([
        [{ zoneUid: '', systemTypeUid: 's', batch: 1 }],
        [{ zoneUid: 'z', systemTypeUid: '', batch: 1 }],
        [{ zoneUid: 'z', systemTypeUid: 's', batch: 0 }],
    ])('disables query when any param is falsy: %p', params => {
        useSystemCodesPreview(params)
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.enabled).toBe(false)
    })
})
