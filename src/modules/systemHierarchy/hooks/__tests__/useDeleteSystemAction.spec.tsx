import { act, renderHook } from '@testing-library/react'
import { toast } from 'sonner'

import { usePermission } from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'

import { useDeleteSystem } from '../mutations/useDeleteSystem'
import { useSystemHierarchy } from '../queries/useSystemHierarchy'
import { useDeleteSystemAction } from '../useDeleteSystemAction'
import { useHierarchyNavigation } from '../useHierarchyNavigation'

jest.mock('@/hooks/usePermission', () => ({ usePermission: jest.fn() }))
jest.mock('@/hooks/useWarningModal', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('../mutations/useDeleteSystem', () => ({ useDeleteSystem: jest.fn() }))
jest.mock('../queries/useSystemHierarchy', () => ({ useSystemHierarchy: jest.fn() }))
jest.mock('../useHierarchyNavigation', () => ({ useHierarchyNavigation: jest.fn() }))
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }, values?: Record<string, unknown>) =>
            [id, values?.name, values?.items].filter(v => v != null).join('|'),
    }),
}))

const mockUsePermission = usePermission as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseDeleteSystem = useDeleteSystem as jest.Mock
const mockUseSystemHierarchy = useSystemHierarchy as jest.Mock
const mockUseHierarchyNavigation = useHierarchyNavigation as jest.Mock
const mockToastPromise = toast.promise as jest.Mock

let mutateAsync: jest.Mock
let clearSelection: jest.Mock
let lastConfirmMessage: string | undefined

const setNavigation = (overrides: Record<string, unknown> = {}) => {
    mockUseHierarchyNavigation.mockReturnValue({
        selectedParentUid: null,
        selectedLeafUid: null,
        clearSelection,
        ...overrides,
    })
}

beforeEach(() => {
    jest.clearAllMocks()
    mutateAsync = jest.fn().mockResolvedValue({})
    clearSelection = jest.fn()
    lastConfirmMessage = undefined

    mockUsePermission.mockReturnValue(true)
    // withWarningModal(cb, msg) → trigger that runs cb immediately (simulating confirm)
    mockUseWarningModal.mockReturnValue(
        (cb: (...args: unknown[]) => void, msg?: string) =>
            (...args: unknown[]) => {
                lastConfirmMessage = msg
                cb(...args)
            },
    )
    mockUseDeleteSystem.mockReturnValue({ mutateAsync, isPending: false })
    mockUseSystemHierarchy.mockReturnValue({ nodes: [] })
    setNavigation()
})

const getToastHandlers = () => {
    const [, handlers] = mockToastPromise.mock.calls[0]
    return handlers as {
        loading: string
        success: () => string
        error: (error: unknown) => string
    }
}

describe('useDeleteSystemAction', () => {
    it('does nothing when the user lacks edit permission', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))

        expect(mockToastPromise).not.toHaveBeenCalled()
        expect(mutateAsync).not.toHaveBeenCalled()
    })

    it('ignores re-entry while a delete is already in flight', () => {
        mockUseDeleteSystem.mockReturnValue({ mutateAsync, isPending: true })
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))

        expect(mockToastPromise).not.toHaveBeenCalled()
        expect(mutateAsync).not.toHaveBeenCalled()
    })

    it('confirms with recursive wording then deletes via the mutation', () => {
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))

        expect(lastConfirmMessage).toBe('systemHierarchy.delete.confirm|Pump A')
        expect(mutateAsync).toHaveBeenCalledWith({ uid: 'sys-1' })
        expect(mockToastPromise).toHaveBeenCalledTimes(1)
    })

    it('resets selection on success when the deleted system is currently open', () => {
        setNavigation({ selectedLeafUid: 'sys-1' })
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))
        const { success } = getToastHandlers()
        const successMessage = success()

        expect(clearSelection).toHaveBeenCalledTimes(1)
        expect(successMessage).toBe('systemHierarchy.delete.success|Pump A')
    })

    it('resets selection when the deleted system is an ancestor of the open node', () => {
        mockUseSystemHierarchy.mockReturnValue({
            nodes: [{ uid: 'root', children: [{ uid: 'child', children: [] }] }],
        })
        setNavigation({ selectedParentUid: 'child' })
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('root', 'Root'))
        getToastHandlers().success()

        expect(clearSelection).toHaveBeenCalledTimes(1)
    })

    it('does not reset selection when an unrelated system is deleted', () => {
        setNavigation({ selectedParentUid: 'other', selectedLeafUid: 'other' })
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))
        getToastHandlers().success()

        expect(clearSelection).not.toHaveBeenCalled()
    })

    it('lists the blocking physical items on a 409 conflict', () => {
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))
        const message = getToastHandlers().error({
            response: {
                status: 409,
                data: [{ itemName: 'Item A' }, { itemName: 'Item B' }],
            },
        })

        expect(message).toBe('systemHierarchy.delete.conflict|Pump A|Item A, Item B')
    })

    it('uses the generic conflict message when the 409 body is empty', () => {
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))
        const message = getToastHandlers().error({ response: { status: 409, data: [] } })

        expect(message).toBe('systemHierarchy.delete.conflictGeneric|Pump A')
    })

    it('uses the generic error message for non-409 failures', () => {
        const { result } = renderHook(() => useDeleteSystemAction())

        act(() => result.current.handleDeleteSystem('sys-1', 'Pump A'))
        const message = getToastHandlers().error({ response: { status: 500 } })

        expect(message).toBe('systemHierarchy.delete.error|Pump A')
    })
})
