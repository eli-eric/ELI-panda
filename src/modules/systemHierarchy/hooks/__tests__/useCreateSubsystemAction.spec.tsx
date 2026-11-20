import { act, renderHook } from '@testing-library/react'

import { usePermission } from '@/hooks/usePermission'
import { guardSystemEdit } from '@/modules/shared/system/edit-permission/utils/guardSystemEdit'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'
import { SystemLevel } from '@/types/gql/graphql'

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

jest.mock('@/modules/shared/system/edit-permission/utils/guardSystemEdit', () => ({
    guardSystemEdit: jest.fn(),
}))

const mockUsePermission = usePermission as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockGuardSystemEdit = guardSystemEdit as jest.Mock

let openModal: jest.Mock
let closeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    closeModal = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
    // Default: the per-system check passes; overridden per test.
    mockGuardSystemEdit.mockResolvedValue(true)
})

describe('useCreateSubsystemAction', () => {
    it('opens the create dialog with parent context when user is responsible for the parent', async () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current.handleCreateSubsystem(
                'parent-1',
                'Parent',
                SystemLevel.KeySystems,
            )
        })

        expect(mockGuardSystemEdit).toHaveBeenCalledWith(
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
            await result.current.handleCreateSubsystem(
                'parent-1',
                'Parent',
                SystemLevel.KeySystems,
            )
        })

        expect(mockGuardSystemEdit).not.toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('does not open the dialog when user is not responsible for the parent', async () => {
        mockUsePermission.mockReturnValue(true)
        mockGuardSystemEdit.mockResolvedValue(false)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current.handleCreateSubsystem(
                'parent-1',
                'Parent',
                SystemLevel.KeySystems,
            )
        })

        expect(mockGuardSystemEdit).toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })
})
