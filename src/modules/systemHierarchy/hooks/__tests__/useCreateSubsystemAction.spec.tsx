import { act, renderHook } from '@testing-library/react'

import { usePermission } from '@/hooks/usePermission'
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

const mockUsePermission = usePermission as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock
let closeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    closeModal = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
})

describe('useCreateSubsystemAction', () => {
    it('opens the create dialog with parent context when user has edit permission', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        act(() =>
            result.current.handleCreateSubsystem(
                'parent-1',
                'Parent',
                SystemLevel.KeySystems,
            ),
        )

        expect(openModal).toHaveBeenCalledTimes(1)
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('create-subsystem-parent-1')
        expect(config.props.parentUid).toBe('parent-1')
        expect(config.props.parentName).toBe('Parent')
        expect(config.props.parentLevel).toBe(SystemLevel.KeySystems)
    })

    it('does not open the dialog when user lacks edit permission', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useCreateSubsystemAction(), {
            wrapper: AllProvidersWrapper,
        })

        act(() =>
            result.current.handleCreateSubsystem(
                'parent-1',
                'Parent',
                SystemLevel.KeySystems,
            ),
        )

        expect(openModal).not.toHaveBeenCalled()
    })
})
