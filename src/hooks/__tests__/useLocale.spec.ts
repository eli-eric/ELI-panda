import { renderHook } from '@testing-library/react'

import { useLocale } from '../useLocale'

describe('useLocale', () => {
  it('returns browser language', () => {
    const { result } = renderHook(() => useLocale())
    expect(result.current).toBe(window.navigator.language)
  })

  it('returns same reference on rerender (memoized)', () => {
    const { result, rerender } = renderHook(() => useLocale())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })
})
