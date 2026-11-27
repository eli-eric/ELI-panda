import { act, renderHook } from '@testing-library/react'

import { usePermission } from '@/hooks/usePermission'
import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'
import { SystemLevel } from '@/types/constants/systemLevel'

import { useCreateSystemDialog } from '../useCreateSystemDialog'

jest.mock('@/hooks/usePermission', () => ({
    usePermission: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/CreateSystemDialog.comp', () => ({
    CreateSystemDialog: () => null,
}))

jest.mock('@/modules/shared/system/edit-permission', () => ({
    confirmSystemEdit: jest.fn(),
}))

const mockUsePermission = usePermission as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockConfirmSystemEdit = confirmSystemEdit as jest.Mock

const PARENT = { uid: 'parent-1', name: 'Parent', level: SystemLevel.KeySystems }
const onCreated = jest.fn()

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

describe('useCreateSystemDialog', () => {
    it('opens the create dialog with parent context once the parent soft lock passes', async () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCreateSystemDialog({ onCreated }), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current(PARENT)
        })

        expect(mockConfirmSystemEdit).toHaveBeenCalledWith(
            expect.anything(),
            'parent-1',
            expect.any(Function),
        )
        expect(openModal).toHaveBeenCalledTimes(1)
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('create-system-parent-1')
        expect(config.props.parent).toEqual(PARENT)
        expect(config.props.onCreated).toBe(onCreated)
    })

    it('does not open the dialog when user lacks edit permission', async () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useCreateSystemDialog({ onCreated }), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current(PARENT)
        })

        expect(mockConfirmSystemEdit).not.toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('does not open the dialog when the user declines the outside-responsibility prompt', async () => {
        mockUsePermission.mockReturnValue(true)
        mockConfirmSystemEdit.mockResolvedValue(false)
        const { result } = renderHook(() => useCreateSystemDialog({ onCreated }), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current(PARENT)
        })

        expect(mockConfirmSystemEdit).toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('opens a root create without a soft-lock prompt', async () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCreateSystemDialog(), {
            wrapper: AllProvidersWrapper,
        })

        await act(async () => {
            await result.current()
        })

        expect(mockConfirmSystemEdit).not.toHaveBeenCalled()
        const [, config] = openModal.mock.calls[0]
        expect(config.id).toBe('create-system-root')
        expect(config.props.parent).toBeNull()
    })
})
