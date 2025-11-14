import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

import { useGlobalSearch } from '../hooks/useGlobalSearch'
import type { GlobalSearchResponse } from '../types'

// Mock dependencies
jest.mock('@/utils/fetcher')

const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<
  typeof fetcher.queryFetcher
>

describe('useGlobalSearch', () => {
  let queryClient: QueryClient

  const createWrapper = () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })

    const Wrapper = ({ children }: { children: ReactNode }) =>
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children
      )
    Wrapper.displayName = 'QueryClientWrapper'
    return Wrapper
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches search results successfully', async () => {
    const mockResponse: GlobalSearchResponse = {
      data: [
        {
          uid: 'sys-1',
          name: 'Test System',
          description: 'A test system',
          nodeType: 'System'
        },
        {
          uid: 'ord-1',
          name: 'Test Order',
          description: 'A test order',
          nodeType: 'Order'
        }
      ],
      totalCount: 2
    }

    // Mock the queryFetcher to return a function that resolves with mockResponse
    mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockResponse))

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual(mockResponse.data)
    expect(result.current.totalCount).toBe(2)
    expect(mockQueryFetcher).toHaveBeenCalledWith('globalSearch')
  })

  it('does not fetch when search query is less than 2 characters', async () => {
    mockQueryFetcher.mockReturnValue(jest.fn())

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'a',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual([])
    expect(result.current.totalCount).toBe(0)
    // queryFetcher is called to create the function, but the query itself is disabled
    expect(mockQueryFetcher).toHaveBeenCalled()
  })

  it('does not fetch when enabled is false', async () => {
    mockQueryFetcher.mockReturnValue(jest.fn())

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test query',
          enabled: false
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual([])
    expect(result.current.totalCount).toBe(0)
  })

  it('trims search query whitespace', async () => {
    const mockResponse: GlobalSearchResponse = {
      data: [],
      totalCount: 0
    }

    mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockResponse))

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: '  test  ',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Verify queryKey includes trimmed search
    expect(result.current.queryKey[1]).toEqual({
      query: {
        searchText: 'test',
        pagination: '{"pageSize": 20, "page": 1}'
      }
    })
  })

  it('returns empty array when no results', async () => {
    const mockResponse: GlobalSearchResponse = {
      data: [],
      totalCount: 0
    }

    mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockResponse))

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'nonexistent',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual([])
    expect(result.current.totalCount).toBe(0)
  })

  it('handles API errors gracefully', async () => {
    const mockError = new Error('API Error')

    mockQueryFetcher.mockReturnValue(jest.fn().mockRejectedValue(mockError))

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.error).toBeDefined())

    expect(result.current.data).toEqual([])
    expect(result.current.error).toBeDefined()
  })

  it('uses default pagination value', async () => {
    const mockResponse: GlobalSearchResponse = {
      data: [],
      totalCount: 0
    }

    mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(mockResponse))

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test'
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.queryKey[1]).toEqual({
      query: {
        searchText: 'test',
        pagination: '{"pageSize": 20, "page": 1}'
      }
    })
  })

  it('generates correct query key', async () => {
    mockQueryFetcher.mockReturnValue(jest.fn())

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test search',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => expect(result.current.queryKey).toBeDefined())

    expect(result.current.queryKey).toEqual([
      'globalSearch',
      {
        query: {
          searchText: 'test search',
          pagination: '{"pageSize": 20, "page": 1}'
        }
      }
    ])
  })

  it('returns isFetching state correctly', async () => {
    const mockResponse: GlobalSearchResponse = {
      data: [
        {
          uid: 'sys-1',
          name: 'Test',
          description: 'Test',
          nodeType: 'System'
        }
      ],
      totalCount: 1
    }

    mockQueryFetcher.mockReturnValue(
      jest.fn().mockImplementation(
        () =>
          new Promise(resolve => {
            setTimeout(() => resolve(mockResponse), 100)
          })
      )
    )

    const { result } = renderHook(
      () =>
        useGlobalSearch({
          search: 'test',
          enabled: true
        }),
      { wrapper: createWrapper() }
    )

    // Initially should be loading/fetching
    expect(result.current.isFetching || result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.data).toHaveLength(1)
  })
})
