import { act, renderHook } from '@testing-library/react'

import { usePermission } from '@/hooks/usePermission'
import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'
import { SystemLevel } from '@/types/constants/systemLevel'

import { useCreateSubsystemAction } from '../useCreateSubsystemAction'

jest.mock('@/hooks/usePermission', () => ({
    usePermission: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/create/CreateSubsystemDialog.comp', () => ({
    CreateSubsystemDialog: () => null,
}))

jest.mock('@/modules/shared/system/edit-permission', () => ({
    confirmSystemEdit: jest.fn(),
}))

const mockUsePermission = usePermission as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockConfirmSystemEdit = confirmSystemEdit as jest.Mock

let openModal: jest.Mock
let closeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    closeModal = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
    // Default: responsible (or already confirmed); overridden per test.
    mockConfirmSystemEdit.mockResolvedValue(true)
})

describe('useCreateSubsystemAction', () => {
    it('opens the create dialog with parent context once the parent soft lock passes', async () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current.handleCreateSubsystem('parent-1', 'Parent', SystemLevel.KeySystems)
        })

        expect(mockConfirmSystemEdit).toHaveBeenCalledWith(
            expect.anything(),
            'parent-1',
            expect.any(Function),
        )
        expect(openModal).toHaveBeenCalledTimes(1)
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('create-subsystem-parent-1')
        expect(config.props.parentUid).toBe('parent-1')
        expect(config.props.parentName).toBe('Parent')
        expect(config.props.parentLevel).toBe(SystemLevel.KeySystems)
    })

    it('does not open the dialog when user lacks edit permission', async () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current.handleCreateSubsystem('parent-1', 'Parent', SystemLevel.KeySystems)
        })

        expect(mockConfirmSystemEdit).not.toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('does not open the dialog when the user declines the outside-responsibility prompt', async () => {
        mockUsePermission.mockReturnValue(true)
        mockConfirmSystemEdit.mockResolvedValue(false)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current.handleCreateSubsystem('parent-1', 'Parent', SystemLevel.KeySystems)
        })

        expect(mockConfirmSystemEdit).toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })
})
