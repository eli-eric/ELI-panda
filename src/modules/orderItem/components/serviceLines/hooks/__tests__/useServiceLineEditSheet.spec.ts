import { mockDynamicModalStore, renderHookWithProviders } from '@/testutils'

const modalMock = mockDynamicModalStore()
jest.mock('@/store/useDynamicModalStore', () => modalMock)

// Stub the sheet component — we only verify modal wiring here
jest.mock('../../components/ServiceLineEditSheet.comp', () => ({
    ServiceLineEditSheet: () => null,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useServiceLineEditSheet } = require('../useServiceLineEditSheet')

describe('useServiceLineEditSheet', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns openEditSheet and closeEditSheet functions', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        expect(typeof result.current.openEditSheet).toBe('function')
        expect(typeof result.current.closeEditSheet).toBe('function')
    })

    it('openEditSheet calls modal store with service line id and props', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        const serviceLine = {
            id: 'rhf-1',
            uid: 'sl-1',
            name: 'Svc',
        } as Parameters<typeof result.current.openEditSheet>[0]
        result.current.openEditSheet(serviceLine)
        expect(modalMock.__modalHandles.openModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: 'service-line-edit-rhf-1',
                props: expect.objectContaining({ serviceLine }),
            }),
        )
    })

    it('onSubmit inside modal config invokes onSave with merged + coerced data', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        const onSave = jest.fn()
        const serviceLine = {
            id: 'rhf-1',
            uid: 'sl-1',
            name: 'Original',
            price: 100,
        } as Parameters<typeof result.current.openEditSheet>[0]

        result.current.openEditSheet(serviceLine, onSave)

        // Grab the onSubmit passed to openModal
        const callArgs = modalMock.__modalHandles.openModal.mock.calls[0]
        const modalConfig = callArgs[1] as { onSubmit: (data: unknown) => void }

        modalConfig.onSubmit({
            name: 'Updated',
            price: '200' as unknown,
            details: [{ propertyGroup: 'g', value: 1, property: { uid: 'p' } }],
        })

        expect(onSave).toHaveBeenCalled()
        const saved = onSave.mock.calls[0][0]
        expect(saved.name).toBe('Updated')
        expect(saved.price).toBe(200) // coerced from string
        expect(Array.isArray(saved.details)).toBe(true)
    })

    it('onSubmit fallbacks details to [] when not array', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        const onSave = jest.fn()
        result.current.openEditSheet(
            { id: 'rhf-1', uid: 'sl-1', name: 'N', price: 0 } as Parameters<
                typeof result.current.openEditSheet
            >[0],
            onSave,
        )
        const callArgs = modalMock.__modalHandles.openModal.mock.calls[0]
        const modalConfig = callArgs[1] as { onSubmit: (data: unknown) => void }
        modalConfig.onSubmit({ details: undefined } as unknown)
        expect(onSave.mock.calls[0][0].details).toEqual([])
    })

    it('closeEditSheet no-op when nothing opened', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        result.current.closeEditSheet()
        expect(modalMock.__modalHandles.closeModal).not.toHaveBeenCalled()
    })

    it('closeEditSheet closes last opened modal', () => {
        const { result } = renderHookWithProviders(() => useServiceLineEditSheet())
        modalMock.__modalHandles.openModal.mockReturnValueOnce('returned-modal-id')
        result.current.openEditSheet({ id: 'rhf-1' } as Parameters<
            typeof result.current.openEditSheet
        >[0])
        result.current.closeEditSheet()
        expect(modalMock.__modalHandles.closeModal).toHaveBeenCalledWith('returned-modal-id')
    })
})
