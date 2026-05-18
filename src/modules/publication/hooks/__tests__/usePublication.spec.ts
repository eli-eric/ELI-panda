import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { usePublication } from '../usePublication'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => jest.fn()),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseRouter = useRouter as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseRouter.mockReturnValue({ query: {} })
})

describe('usePublication', () => {
    it('prefers explicit arg uid over router query', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'router-uid' } })
        renderHook(() => usePublication('arg-uid'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['publication', { uid: 'arg-uid' }])
    })

    it('falls back to router query uid', () => {
        mockUseRouter.mockReturnValue({ query: { uid: 'router-uid' } })
        renderHook(() => usePublication())
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['publication', { uid: 'router-uid' }])
    })

    it('disables when neither is present', () => {
        renderHook(() => usePublication())
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })
})
