import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useOperationalStateHistory } from '../useOperationalStateHistory'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQL = useGraphQL as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

const employee = (uid: string) => ({ uid, firstName: 'F', lastName: 'L', email: 'e@x.cz' })

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQL.mockReturnValue({ data: undefined, error: undefined, isFetching: false })
})

describe('useOperationalStateHistory', () => {
    it('disables query when roomCardUid is missing', () => {
        renderHook(() => useOperationalStateHistory())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.enabled).toBe(false)
    })

    it('refetchOnMount is always', () => {
        renderHook(() => useOperationalStateHistory('r'))
        expect(mockUseGraphQL.mock.calls[0][1].refetchOnMount).toBe('always')
    })

    it('returns undefined history while fetching', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{ updatedByConnection: { edges: [] } }] },
            error: undefined,
            isFetching: true,
        })
        const { result } = renderHook(() => useOperationalStateHistory('r'))
        expect(result.current.history).toBeUndefined()
        expect(result.current.loading).toBe(true)
    })

    it('returns empty list when no edges', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{ updatedByConnection: { edges: undefined } }] },
            error: undefined,
            isFetching: false,
        })
        const { result } = renderHook(() => useOperationalStateHistory('r'))
        expect(result.current.history).toEqual([])
    })

    it('parses + sorts edges DESC by date', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                roomCards: [
                    {
                        updatedByConnection: {
                            edges: [
                                {
                                    at: '2026-01-01T10:00:00Z',
                                    previousState: 'A',
                                    newState: 'B',
                                    node: employee('u1'),
                                },
                                {
                                    at: '2026-03-01T10:00:00Z',
                                    previousState: 'B',
                                    newState: 'C',
                                    node: employee('u2'),
                                },
                            ],
                        },
                    },
                ],
            },
            error: undefined,
            isFetching: false,
        })
        const { result } = renderHook(() => useOperationalStateHistory('r'))
        expect(result.current.history).toEqual([
            {
                uid: 'u2-0',
                previousState: 'B',
                newState: 'C',
                changedAt: '2026-03-01T10:00:00Z',
                changedBy: employee('u2'),
            },
            {
                uid: 'u1-1',
                previousState: 'A',
                newState: 'B',
                changedAt: '2026-01-01T10:00:00Z',
                changedBy: employee('u1'),
            },
        ])
    })

    it('coerces null previousState/newState defensively', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                roomCards: [
                    {
                        updatedByConnection: {
                            edges: [
                                {
                                    at: '2026-01-01',
                                    previousState: null,
                                    newState: null,
                                    node: employee('u1'),
                                },
                            ],
                        },
                    },
                ],
            },
            error: undefined,
            isFetching: false,
        })
        const { result } = renderHook(() => useOperationalStateHistory('r'))
        expect(result.current.history?.[0].previousState).toBeNull()
        expect(result.current.history?.[0].newState).toBe('')
    })

    it('fires toast.error on error', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: new Error('boom'),
            isFetching: false,
        })
        renderHook(() => useOperationalStateHistory('r'))
        expect(mockToast.error).toHaveBeenCalledWith(
            'Failed to fetch operational state history',
        )
    })
})
