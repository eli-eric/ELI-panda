import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemMovingDialog } from '../useSystemMovingDialog'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useSystemMovingDialog', () => {
    it('opens dialog with system-moving-dialog id and child/parent in props', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemMovingDialog())

        const child = { uid: 'c', tableId: 'l' } as any
        const parent = { uid: 'p', tableId: 'r' } as any
        const id = result.current(child, parent)

        expect(id).toBe('system-moving-dialog')
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('system-moving-dialog')
        expect(config.props.childSystem).toBe(child)
        expect(config.props.parentSystem).toBe(parent)
        expect(config.props.size).toBe('l')
        expect(typeof config.props.title).toBe('string')
        expect(typeof config.props.description).toBe('string')
    })
})
