import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

import { useGraphQL, useGraphQLMutation } from '../useGraphQL'

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}))

const mockRequest = request as jest.Mock

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  Wrapper.displayName = 'TestQueryWrapper'
  return Wrapper
}

const mockDocument = {
  definitions: [{ name: { value: 'TestQuery' } }],
} as any

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useGraphQL', () => {
  it('fetches data and returns result', async () => {
    mockRequest.mockResolvedValue({ items: [{ id: 1 }] })

    const { result } = renderHook(
      () => useGraphQL(mockDocument, { variables: { id: '1' } }),
      { wrapper: createWrapper() },
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ items: [{ id: 1 }] })
    expect(mockRequest).toHaveBeenCalledWith('/api/graphql', mockDocument, { id: '1' })
  })

  it('handles error', async () => {
    mockRequest.mockRejectedValue(new Error('GraphQL error'))

    const { result } = renderHook(() => useGraphQL(mockDocument), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('GraphQL error')
  })
})

describe('useGraphQLMutation', () => {
  it('executes mutation and returns result', async () => {
    mockRequest.mockResolvedValue({ createItem: { id: 1 } })

    const { result } = renderHook(() => useGraphQLMutation(mockDocument), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ name: 'test' } as any)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ createItem: { id: 1 } })
  })

  it('calls onSuccess callback', async () => {
    mockRequest.mockResolvedValue({ ok: true })
    const onSuccess = jest.fn()

    const { result } = renderHook(
      () => useGraphQLMutation(mockDocument, { onSuccess }),
      { wrapper: createWrapper() },
    )

    result.current.mutate({} as any)

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })
})
