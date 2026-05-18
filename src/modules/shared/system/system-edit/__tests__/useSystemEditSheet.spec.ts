import { act, renderHook } from '@testing-library/react'

import useWarningModal from '@/hooks/useWarningModal'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'

import { useSystemStore } from '../../device-info-overlay/store/useShowDeviceStore'
import { useSystemEditSheet } from '../useSystemEditSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: Object.assign(jest.fn(), { getState: jest.fn() }),
}))

jest.mock('@/store/useModalFormStateStore', () => ({
    useModalFormStateStore: Object.assign(jest.fn(), { getState: jest.fn() }),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../device-info-overlay/store/useShowDeviceStore', () => ({
    useSystemStore: jest.fn(),
}))

const mockDynamic = useDynamicModalStore as unknown as jest.Mock & {
    getState: jest.Mock
}
const mockFormState = useModalFormStateStore as unknown as jest.Mock & {
    getState: jest.Mock
}
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseSystemStore = useSystemStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'warn').mockImplementation(() => undefined)
    mockDynamic.mockReturnValue({ openModal: jest.fn() })
    mockDynamic.getState.mockReturnValue({ closeModal: jest.fn() })
    mockFormState.mockReturnValue({ reset: jest.fn() })
    mockFormState.getState.mockReturnValue({ isDirty: false, reset: jest.fn() })
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
    mockUseSystemStore.mockReturnValue({ uid: undefined })
})

afterEach(() => {
    ;(console.warn as jest.Mock).mockRestore?.()
})

describe('useSystemEditSheet', () => {
    it('warns and returns undefined when no uid available', () => {
        const { result } = renderHook(() => useSystemEditSheet())
        const id = result.current()
        expect(id).toBeUndefined()
        expect(console.warn).toHaveBeenCalled()
    })

    it('prefers store uid over function-arg uid', () => {
        mockUseSystemStore.mockReturnValue({ uid: 'store-uid' })
        const openModal = jest.fn(() => 'modal-id')
        mockDynamic.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemEditSheet())
        act(() => {
            result.current('arg-uid')
        })
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[1].id).toBe('system-edit-store-uid')
        expect(callArgs[1].props.uid).toBe('store-uid')
    })

    it('uses fixed id "system-edit-{uid}", "l" size, onClose resets form state', () => {
        const reset = jest.fn()
        mockFormState.mockReturnValue({ reset })
        const openModal = jest.fn(() => 'modal-id')
        mockDynamic.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemEditSheet())

        act(() => {
            result.current('uid-1')
        })
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        const config = callArgs[1]
        expect(config.id).toBe('system-edit-uid-1')
        expect(config.props.size).toBe('l')
        expect(config.props.title).toBe('Edit System')

        config.onClose()
        expect(reset).toHaveBeenCalled()
    })

    it('onCloseAttempt returns true when form clean (no isDirty)', () => {
        const openModal = jest.fn(() => 'modal-id')
        mockDynamic.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemEditSheet())
        act(() => {
            result.current('uid-1')
        })
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        const config = callArgs[1]
        expect(config.onCloseAttempt()).toBe(true)
    })

    it('onCloseAttempt returns false when form dirty + triggers warning modal', () => {
        const openModal = jest.fn(() => 'modal-id')
        const closeModal = jest.fn()
        const formReset = jest.fn()
        mockDynamic.mockReturnValue({ openModal })
        mockDynamic.getState.mockReturnValue({ closeModal })
        mockFormState.getState.mockReturnValue({ isDirty: true, reset: formReset })

        const { result } = renderHook(() => useSystemEditSheet())
        act(() => {
            result.current('uid-1')
        })
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        const config = callArgs[1]
        expect(config.onCloseAttempt()).toBe(false)
        // warning modal invoked -> closeModal + form reset
        expect(closeModal).toHaveBeenCalledWith('system-edit-uid-1')
        expect(formReset).toHaveBeenCalled()
    })
})
