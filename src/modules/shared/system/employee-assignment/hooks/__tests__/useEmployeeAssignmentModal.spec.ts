import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useEmployeeAssignmentModal } from '../useEmployeeAssignmentModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

jest.mock('../../components/EmployeeAssignmentModal.cont', () => ({
    EmployeeAssignmentModalContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useEmployeeAssignmentModal', () => {
    it('returns an open callback', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal: jest.fn() })
        const { result } = renderHook(() =>
            useEmployeeAssignmentModal({
                existingEmployeeUids: ['e1'],
                onEmployeeSelected: jest.fn(),
            }),
        )
        expect(typeof result.current).toBe('function')
    })

    it('opens dialog with employee-add id, "l" size, existingEmployeeUids in props', () => {
        const openModal = jest.fn(() => 'modal-1')
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal: jest.fn() })

        const { result } = renderHook(() =>
            useEmployeeAssignmentModal({
                existingEmployeeUids: ['e1', 'e2'],
                onEmployeeSelected: jest.fn(),
                title: 'Custom Title',
            }),
        )

        result.current()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('employee-add')
        expect(config.props.size).toBe('l')
        expect(config.props.existingEmployeeUids).toEqual(['e1', 'e2'])
        expect(config.props.title).toBe('Custom Title')
    })

    it('uses i18n default title when none provided', () => {
        const openModal = jest.fn(() => 'm')
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal: jest.fn() })

        const { result } = renderHook(() =>
            useEmployeeAssignmentModal({
                existingEmployeeUids: [],
                onEmployeeSelected: jest.fn(),
            }),
        )
        result.current()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[1].props.title).toBe('common.employeeAssignment.modalTitle')
    })

    it('onSubmit invokes selection callback and closes modal when employee present', async () => {
        const openModal = jest.fn(() => 'modal-1')
        const closeModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })

        const onEmployeeSelected = jest.fn().mockResolvedValue(undefined)
        const { result } = renderHook(() =>
            useEmployeeAssignmentModal({
                existingEmployeeUids: [],
                onEmployeeSelected,
            }),
        )
        result.current()
        const config = (openModal.mock.calls[0] as unknown as [string, any])[1]
        await config.onSubmit({ employee: { uid: 'e' } })

        expect(onEmployeeSelected).toHaveBeenCalledWith({ uid: 'e' })
        expect(closeModal).toHaveBeenCalledWith('modal-1')
    })

    it('onSubmit is a no-op when no employee in form data', async () => {
        const openModal = jest.fn(() => 'modal-1')
        const closeModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })

        const onEmployeeSelected = jest.fn()
        const { result } = renderHook(() =>
            useEmployeeAssignmentModal({
                existingEmployeeUids: [],
                onEmployeeSelected,
            }),
        )
        result.current()
        const config = (openModal.mock.calls[0] as unknown as [string, any])[1]
        await config.onSubmit({ employee: null })

        expect(onEmployeeSelected).not.toHaveBeenCalled()
        expect(closeModal).not.toHaveBeenCalled()
    })
})
