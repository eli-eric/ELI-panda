import { renderHook } from '@testing-library/react'

import { useWarningModalStore } from '@/store/useWarningModalStore'

import { useFormDirtyProtection } from '../useFormDirtyProtection'

beforeEach(() => {
    jest.clearAllMocks()
    useWarningModalStore.setState({
        params: { isOpen: false, isConfirmed: false, error: '', message: '' },
        pendingExecution: undefined,
        executionHistory: new Set(),
    })
})

const makeFormMethods = (isDirty: boolean) =>
    ({
        formState: { isDirty },
    }) as any

describe('useFormDirtyProtection', () => {
    it('calls callback directly when form is not dirty', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useFormDirtyProtection(makeFormMethods(false)))

        const protected_ = result.current.withDirtyProtection(callback)
        protected_('arg')

        expect(callback).toHaveBeenCalledWith('arg')
    })

    it('opens warning modal when form is dirty', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useFormDirtyProtection(makeFormMethods(true)))

        const protected_ = result.current.withDirtyProtection(callback)
        protected_()

        expect(callback).not.toHaveBeenCalled()
        expect(useWarningModalStore.getState().params.isOpen).toBe(true)
    })

    it('warning message mentions unsaved changes', () => {
        const { result } = renderHook(() => useFormDirtyProtection(makeFormMethods(true)))

        const protected_ = result.current.withDirtyProtection(() => {})
        protected_()

        expect(useWarningModalStore.getState().params.message).toContain('unsaved changes')
    })
})
