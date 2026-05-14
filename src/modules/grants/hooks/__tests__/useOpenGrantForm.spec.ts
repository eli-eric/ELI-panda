import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useOpenGrantForm } from '../useOpenGrantForm'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../form/grant-form.cont', () => ({
    GrantFormContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useOpenGrantForm', () => {
    it('returns the openGrantForm function', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useOpenGrantForm())
        expect(typeof result.current.openGrantForm).toBe('function')
    })

    it('opens sheet with fixed id "grant-create" and forwards onSuccess', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const onSuccess = jest.fn()
        const { result } = renderHook(() => useOpenGrantForm({ onSuccess }))

        result.current.openGrantForm()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('sheet')
        const config = callArgs[1]
        expect(config.id).toBe('grant-create')
        expect(config.props.title).toBe('Create Grant')
        expect(config.props.onSuccess).toBe(onSuccess)
    })
})
