import { renderHook } from '@testing-library/react'

import useQueryString from '../useQueryString'

describe('useQueryString', () => {
  it('serializes object to JSON string', () => {
    const { result } = renderHook(() => useQueryString({ search: 'test', page: 1 }))
    expect(result.current).toBe('{"search":"test","page":1}')
  })

  it('handles empty object', () => {
    const { result } = renderHook(() => useQueryString({}))
    expect(result.current).toBe('{}')
  })

  it('memoizes result for same reference', () => {
    const obj = { a: 1 }
    const { result, rerender } = renderHook(() => useQueryString(obj))
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
