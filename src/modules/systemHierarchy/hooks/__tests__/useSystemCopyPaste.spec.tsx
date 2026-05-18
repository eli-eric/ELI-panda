import { act, renderHook } from '@testing-library/react'

import { usePermission } from '@/hooks/usePermission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useHierarchyStore } from '../../store/useHierarchyStore'
import { useSystemCopyPaste } from '../useSystemCopyPaste'

jest.mock('@/hooks/usePermission', () => ({
    usePermission: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../store/useHierarchyStore', () => ({
    useHierarchyStore: jest.fn(),
}))

jest.mock('../../components/copy/CopySystemDialog.comp', () => ({
    CopySystemDialog: () => null,
}))

const mockUsePermission = usePermission as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockUseHierarchyStore = useHierarchyStore as unknown as jest.Mock

let openModal: jest.Mock
let closeModal: jest.Mock
let setCopiedSystemUid: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    closeModal = jest.fn()
    setCopiedSystemUid = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
    mockUsePermission.mockReturnValue(true)
    mockUseHierarchyStore.mockReturnValue({
        copiedSystemUid: null,
        setCopiedSystemUid,
    })
})

describe('useSystemCopyPaste', () => {
    it('handleCopySystem stores uid in hierarchy store', () => {
        const { result } = renderHook(() => useSystemCopyPaste(), { wrapper: AllProvidersWrapper })
        act(() => result.current.handleCopySystem('sys-1'))
        expect(setCopiedSystemUid).toHaveBeenCalledWith('sys-1')
    })

    it('handlePasteSystem no-op when no copiedSystemUid', () => {
        const { result } = renderHook(() => useSystemCopyPaste(), { wrapper: AllProvidersWrapper })
        act(() => result.current.handlePasteSystem('dest'))
        expect(openModal).not.toHaveBeenCalled()
    })

    it('handlePasteSystem no-op when destination === source', () => {
        mockUseHierarchyStore.mockReturnValue({
            copiedSystemUid: 'same',
            setCopiedSystemUid,
        })
        const { result } = renderHook(() => useSystemCopyPaste(), { wrapper: AllProvidersWrapper })
        act(() => result.current.handlePasteSystem('same'))
        expect(openModal).not.toHaveBeenCalled()
    })

    it('handlePasteSystem opens copy dialog with source + destination', () => {
        mockUseHierarchyStore.mockReturnValue({
            copiedSystemUid: 'src-1',
            setCopiedSystemUid,
        })
        const { result } = renderHook(() => useSystemCopyPaste(), { wrapper: AllProvidersWrapper })
        act(() => result.current.handlePasteSystem('dest-2'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('copy-system-src-1-dest-2')
        expect(config.props.sourceSystemUid).toBe('src-1')
        expect(config.props.destinationSystemUid).toBe('dest-2')
    })

    it('handlePasteSystem onSuccess invokes onExpandNode(destination, true)', () => {
        mockUseHierarchyStore.mockReturnValue({
            copiedSystemUid: 'src',
            setCopiedSystemUid,
        })
        const onExpandNode = jest.fn()
        const { result } = renderHook(() => useSystemCopyPaste({ onExpandNode }), {
            wrapper: AllProvidersWrapper,
        })
        act(() => result.current.handlePasteSystem('dest'))
        const onSuccess = openModal.mock.calls[0][1].props.onSuccess
        onSuccess()
        expect(onExpandNode).toHaveBeenCalledWith('dest', true)
    })

    it('onClose handler closes the modal by id', () => {
        mockUseHierarchyStore.mockReturnValue({
            copiedSystemUid: 'src',
            setCopiedSystemUid,
        })
        const { result } = renderHook(() => useSystemCopyPaste(), { wrapper: AllProvidersWrapper })
        act(() => result.current.handlePasteSystem('dest'))
        const onClose = openModal.mock.calls[0][1].props.onClose
        onClose()
        expect(closeModal).toHaveBeenCalledWith('copy-system-src-dest')
    })
})
