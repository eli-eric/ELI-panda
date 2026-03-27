import { renderHook } from '@testing-library/react'

import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { useWarningModalStore } from '@/store/useWarningModalStore'

import { useModalDirtyProtection } from '../useModalDirtyProtection'

beforeEach(() => {
  jest.clearAllMocks()
  useModalFormStateStore.setState({ isDirty: false })
  useWarningModalStore.setState({
    params: { isOpen: false, isConfirmed: false, error: '', message: '' },
    pendingExecution: undefined,
    executionHistory: new Set(),
  })
})

describe('useModalDirtyProtection', () => {
  it('returns onCloseAttempt function', () => {
    const { result } = renderHook(() =>
      useModalDirtyProtection({ modalId: 'test-modal' }),
    )
    expect(typeof result.current.onCloseAttempt).toBe('function')
  })

  it('returns true (allow close) when form is not dirty', () => {
    useModalFormStateStore.setState({ isDirty: false })
    const { result } = renderHook(() =>
      useModalDirtyProtection({ modalId: 'test-modal' }),
    )
    expect(result.current.onCloseAttempt()).toBe(true)
  })

  it('returns false (prevent close) when form is dirty', () => {
    useModalFormStateStore.setState({ isDirty: true })
    const { result } = renderHook(() =>
      useModalDirtyProtection({ modalId: 'test-modal' }),
    )
    expect(result.current.onCloseAttempt()).toBe(false)
  })

  it('opens warning modal when form is dirty', () => {
    useModalFormStateStore.setState({ isDirty: true })
    const { result } = renderHook(() =>
      useModalDirtyProtection({ modalId: 'test-modal' }),
    )
    result.current.onCloseAttempt()
    expect(useWarningModalStore.getState().params.isOpen).toBe(true)
  })
})
