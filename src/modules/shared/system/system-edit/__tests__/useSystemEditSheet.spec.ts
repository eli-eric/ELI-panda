import { act, renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemEditSheet } from '../useSystemEditSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockDynamic = useDynamicModalStore as unknown as jest.Mock

describe('useSystemEditSheet', () => {
    let openModal: jest.Mock

    beforeEach(() => {
        openModal = jest.fn(() => 'modal-id')
        mockDynamic.mockReturnValue({ openModal })
    })

    it('does nothing without a uid', () => {
        const { result } = renderHook(() => useSystemEditSheet())
        expect(result.current(undefined)).toBeUndefined()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('opens an xl sheet keyed by the system uid', () => {
        const { result } = renderHook(() => useSystemEditSheet())
        act(() => {
            result.current('uid-1')
        })
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('system-edit-uid-1')
        expect(config.props).toEqual(
            expect.objectContaining({
                uid: 'uid-1',
                size: 'xl',
                title: 'systemHierarchy.sheet.title',
            }),
        )
    })

    // every field saves on its own — nothing to lose on close
    it('registers no unsaved-changes guard', () => {
        const { result } = renderHook(() => useSystemEditSheet())
        act(() => {
            result.current('uid-1')
        })
        expect(openModal.mock.calls[0][1].onCloseAttempt).toBeUndefined()
    })
})
