import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { usePublicationCreateSheet } from '../usePublicationCreateSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../publication-form.cont', () => ({
    PublicationFormContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('usePublicationCreateSheet', () => {
    it('returns openCreateSheet handler', () => {
        const { result } = renderHook(() => usePublicationCreateSheet())
        expect(typeof result.current).toBe('function')
    })

    it('opens sheet with id publication-create + title', () => {
        const { result } = renderHook(() => usePublicationCreateSheet())
        const id = result.current()
        expect(id).toBe('mid')
        expect(openModal).toHaveBeenCalledWith('sheet', expect.objectContaining({
            id: 'publication-create',
            props: { title: 'Create publication' },
        }))
    })
})
