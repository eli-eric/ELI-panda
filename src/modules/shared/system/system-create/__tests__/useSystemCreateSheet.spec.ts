import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemCreateParentStore } from '../store/useSystemCreateParentStore'
import { useSystemCreateSheet } from '../useSystemCreateSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../system-create.cont', () => ({
    SystemCreateContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

const resetStore = () =>
    useSystemCreateParentStore.setState({ parentUid: null })

beforeEach(() => {
    jest.clearAllMocks()
    resetStore()
})

describe('useSystemCreateSheet', () => {
    it('opens sheet with "system-create" id and Create System title (root)', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useSystemCreateSheet())
        result.current()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('sheet')
        const config = callArgs[1]
        expect(config.id).toBe('system-create')
        expect(config.props.title).toBe('Create System')
        expect(config.props.description).toContain('database')
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })

    it('parentUid produces "Create Subsystem" title and stores parent in store', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useSystemCreateSheet())
        result.current('parent-1')
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        const config = callArgs[1]
        expect(config.props.title).toBe('Create Subsystem')
        expect(config.props.description).toContain('subsystem')
        expect(useSystemCreateParentStore.getState().parentUid).toBe('parent-1')
    })

    it('clears store before setting parentUid on subsequent calls', () => {
        useSystemCreateParentStore.setState({ parentUid: 'leftover' })

        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useSystemCreateSheet())
        result.current()
        // No parent passed -> store cleared
        expect(useSystemCreateParentStore.getState().parentUid).toBeNull()
    })
})
