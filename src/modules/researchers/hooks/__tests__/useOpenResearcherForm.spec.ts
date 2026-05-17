import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useOpenResearcherForm } from '../useOpenResearcherForm'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../form/researcher-form.cont', () => ({
    ResearcherFormContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useOpenResearcherForm', () => {
    it('opens sheet with "researcher-create" id and onSuccess wired', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const onSuccess = jest.fn()
        const { result } = renderHook(() => useOpenResearcherForm({ onSuccess }))

        result.current.openResearcherForm()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('sheet')
        const config = callArgs[1]
        expect(config.id).toBe('researcher-create')
        expect(config.props.title).toBe('Create Researcher')
        expect(config.props.onSuccess).toBe(onSuccess)
    })

    it('works without options', () => {
        const openModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useOpenResearcherForm())
        expect(() => result.current.openResearcherForm()).not.toThrow()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[1].props.onSuccess).toBeUndefined()
    })
})
