import { renderHook } from '@testing-library/react'

import { useIsMobile } from '../use-mobile'

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    })
  })

  it('returns false when window width >= 768', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true when window width < 768', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 })
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })
})
