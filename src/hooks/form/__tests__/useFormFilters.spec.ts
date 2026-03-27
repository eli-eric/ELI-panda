import {renderHook } from '@testing-library/react'

import useTableStateStore from '@/store/useTableStateStore'

import { useFormFilterState } from '../useFormFilters'

jest.mock('next-usequerystate', () => ({
  useQueryState: jest.fn().mockReturnValue([null, jest.fn()]),
}))

jest.mock('@/modules/shared/table/pandaTable/hooks/useFilters', () => ({
  useFilters: jest.fn().mockReturnValue([[], jest.fn()]),
}))

beforeEach(() => {
  jest.clearAllMocks()
  useTableStateStore.setState({ instances: {} })
})

describe('useFormFilterState', () => {
  it('returns storeFilters, setFilter, and setColumnFilters', () => {
    const { result } = renderHook(() =>
      useFormFilterState({ tableId: 'test' }),
    )

    expect(result.current.storeFilters).toBeDefined()
    expect(typeof result.current.setFilter).toBe('function')
    expect(typeof result.current.setColumnFilters).toBe('function')
  })

  it('setFilter returns a setter function for a given id', () => {
    const { result } = renderHook(() =>
      useFormFilterState({ tableId: 'test' }),
    )

    const setter = result.current.setFilter('status')
    expect(typeof setter).toBe('function')
  })
})
