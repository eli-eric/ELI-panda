import { renderHook } from '@testing-library/react'

import { useEscapeKey } from '../useEscapeKey'

describe('useEscapeKey', () => {
  it('calls callback on Escape keyup', () => {
    const handleClose = jest.fn()
    renderHook(() => useEscapeKey(handleClose))

    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not call callback on other keys', () => {
    const handleClose = jest.fn()
    renderHook(() => useEscapeKey(handleClose))

    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('cleans up listener on unmount', () => {
    const handleClose = jest.fn()
    const { unmount } = renderHook(() => useEscapeKey(handleClose))

    unmount()

    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }))
    expect(handleClose).not.toHaveBeenCalled()
  })
})
