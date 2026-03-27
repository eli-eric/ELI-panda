import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { useGraphQL } from '../../fetch/useGraphQL'
import { useFilterDetails } from '../useFilterDetails'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

jest.mock('../../fetch/useGraphQL', () => ({
  useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}))

const mockUseSession = useSession as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
  mockUseSession.mockReturnValue({
    data: { user: { uid: 'user-1' } },
  })
})

describe('useFilterDetails', () => {
  it('calls useGraphQL with user and table filter', () => {
    mockUseGraphQL.mockReturnValue({ data: null, refetch: jest.fn(), error: null })

    renderHook(() => useFilterDetails('orders-table'))

    expect(mockUseGraphQL).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: {
          userSettingsWhere: expect.objectContaining({
            user: { uid: 'user-1' },
            key_CONTAINS: 'filter-orders-table',
          }),
        },
      }),
    )
  })

  it('includes filterUid when provided', () => {
    mockUseGraphQL.mockReturnValue({ data: null, refetch: jest.fn(), error: null })

    renderHook(() => useFilterDetails('orders-table', 'filter-123'))

    expect(mockUseGraphQL).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: {
          userSettingsWhere: expect.objectContaining({
            uid: 'filter-123',
          }),
        },
      }),
    )
  })

  it('returns filters and refetch', () => {
    const mockFilters = [{ uid: '1', key: 'filter-test', name: 'My Filter', value: '[]' }]
    const mockRefetch = jest.fn()
    mockUseGraphQL.mockReturnValue({
      data: { userSettings: mockFilters },
      refetch: mockRefetch,
      error: null,
    })

    const { result } = renderHook(() => useFilterDetails('test'))
    expect(result.current.filters).toEqual(mockFilters)
    expect(result.current.refetch).toBe(mockRefetch)
  })
})
