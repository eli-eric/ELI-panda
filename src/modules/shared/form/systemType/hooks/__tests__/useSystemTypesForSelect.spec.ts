import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useSystemTypesForSelect } from '../useSystemTypesForSelect'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: {} })
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: false })
})

describe('useSystemTypesForSelect', () => {
    it('passes through search from manager.query', () => {
        mockUseQueryManager.mockReturnValue({ query: { search: 'amp' } })
        const { result } = renderHook(() => useSystemTypesForSelect('t'))
        expect(result.current.search).toBe('amp')
    })

    it('defaults search to "" when missing', () => {
        const { result } = renderHook(() => useSystemTypesForSelect('t'))
        expect(result.current.search).toBe('')
    })

    it('returns [] when data is undefined', () => {
        const { result } = renderHook(() => useSystemTypesForSelect('t'))
        expect(result.current.data).toEqual([])
    })

    it('transforms api groups into tree rows with isExpandable', () => {
        mockUseQuery.mockReturnValue({
            data: [
                {
                    uid: 'g1',
                    name: 'G1',
                    code: 'g1',
                    children: [
                        { uid: 't1', name: 'T1', code: 't1' },
                        { uid: 't2', name: 'T2', code: 't2' },
                    ],
                },
                { uid: 'g2', name: 'G2', code: 'g2', children: [] },
            ],
            isLoading: false,
        })
        const { result } = renderHook(() => useSystemTypesForSelect('t'))
        expect(result.current.data).toEqual([
            {
                uid: 'g1',
                name: 'G1',
                code: 'g1',
                isGroup: true,
                isExpandable: true,
                children: [
                    { uid: 't1', name: 'T1', code: 't1', isGroup: false, isExpandable: false },
                    { uid: 't2', name: 'T2', code: 't2', isGroup: false, isExpandable: false },
                ],
            },
            {
                uid: 'g2',
                name: 'G2',
                code: 'g2',
                isGroup: true,
                isExpandable: false,
                children: [],
            },
        ])
    })
})
