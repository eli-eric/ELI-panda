import { fireEvent, screen } from '@testing-library/react'

import { mockDynamicModalStore, mockUsePermission, renderWithProviders } from '@/testutils'

const modalMock = mockDynamicModalStore()
jest.mock('@/store/useDynamicModalStore', () => modalMock)
jest.mock('@/hooks/usePermission', () => mockUsePermission())

const mockSetServiceLine = jest.fn()
jest.mock('../../../hooks/useServiceLine', () => ({
    useServiceLine: () => ({ setServiceLine: mockSetServiceLine }),
}))

const mockResetTable = jest.fn()
jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: () => ({ reset: mockResetTable }),
}))

// Stub the wizard — we only test button click + handleSubmit wiring
jest.mock('../form/service-line-v3.wizz', () => ({
    ServiceLineV3Wizard: () => null,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ServiceLinesAddButton } = require('../service-lines-add-button')

describe('ServiceLinesAddButton', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('opens dialog modal on click', () => {
        renderWithProviders(<ServiceLinesAddButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(modalMock.__modalHandles.openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({
                id: 'service-line-add',
            }),
        )
    })

    it('handleSubmit coerces price and creates one service line per item', () => {
        renderWithProviders(<ServiceLinesAddButton />)
        fireEvent.click(screen.getByRole('button'))
        const modalConfig = modalMock.__modalHandles.openModal.mock.calls[0][1] as {
            props: { handleSubmit: (data: unknown, reset: () => void) => void }
        }

        modalConfig.props.handleSubmit(
            {
                name: 'Svc',
                price: '150',
                serviceType: { uid: 'st-1', name: 'Repair' },
                items: [
                    { uid: 'i-1', name: 'Item1', serialNumber: 'SN1', eun: 'E1' },
                    { uid: 'i-2', name: 'Item2', serialNumber: 'SN2', eun: 'E2' },
                ],
                selectedProperties: [],
            } as never,
            jest.fn(),
        )

        expect(mockSetServiceLine).toHaveBeenCalledTimes(2)
        const firstCall = mockSetServiceLine.mock.calls[0][0]
        expect(firstCall.price).toBe(150)
        expect(firstCall.item).toEqual({ uid: 'i-1', name: 'Item1' })
        expect(firstCall.serialNumber).toBe('SN1')
    })

    it('filters details by selectedProperties', () => {
        renderWithProviders(<ServiceLinesAddButton />)
        fireEvent.click(screen.getByRole('button'))
        const modalConfig = modalMock.__modalHandles.openModal.mock.calls[0][1] as {
            props: { handleSubmit: (data: unknown, reset: () => void) => void }
        }
        modalConfig.props.handleSubmit(
            {
                name: 'Svc',
                price: 100,
                details: {
                    'p-a': { property: { uid: 'p-a' }, value: 1, propertyGroup: 'g' },
                    'p-b': { property: { uid: 'p-b' }, value: 2, propertyGroup: 'g' },
                    'p-c': { property: { uid: 'p-c' }, value: 3, propertyGroup: 'g' },
                },
                selectedProperties: ['p-a', 'p-c'],
                items: [{ uid: 'i-1', name: 'I', serialNumber: 's', eun: 'e' }],
            } as never,
            jest.fn(),
        )
        expect(mockSetServiceLine).toHaveBeenCalledTimes(1)
        const call = mockSetServiceLine.mock.calls[0][0]
        expect(call.details).toHaveLength(2)
        expect(
            call.details.map((d: { property: { uid: string } }) => d.property.uid).sort(),
        ).toEqual(['p-a', 'p-c'])
    })

    it('skips when no items selected', () => {
        renderWithProviders(<ServiceLinesAddButton />)
        fireEvent.click(screen.getByRole('button'))
        const modalConfig = modalMock.__modalHandles.openModal.mock.calls[0][1] as {
            props: { handleSubmit: (data: unknown, reset: () => void) => void }
        }
        modalConfig.props.handleSubmit({ name: 'Svc', items: [] } as never, jest.fn())
        expect(mockSetServiceLine).not.toHaveBeenCalled()
    })

    it('closes modal and resets table after submit', () => {
        renderWithProviders(<ServiceLinesAddButton />)
        fireEvent.click(screen.getByRole('button'))
        const modalConfig = modalMock.__modalHandles.openModal.mock.calls[0][1] as {
            props: { handleSubmit: (data: unknown, reset: () => void) => void }
        }
        modalMock.__modalHandles.openModal.mockReturnValueOnce('returned-id')
        const formReset = jest.fn()
        modalConfig.props.handleSubmit({ name: 'Svc', items: [] } as never, formReset)
        expect(formReset).toHaveBeenCalled()
        expect(mockResetTable).toHaveBeenCalled()
    })
})
