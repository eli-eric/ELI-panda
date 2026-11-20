import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import type { SystemLeaf } from '../../../types'
import { openSetMinimalSparesModal } from '../set-minimal-spares.modal'

const mockUpdateField = jest.fn()
jest.mock('../../../hooks/mutations/useSystemFieldUpdate', () => ({
    useSystemFieldUpdate: () => ({ updateField: mockUpdateField, isPending: false }),
}))

const mockRecalculate = jest.fn()
jest.mock('../../../hooks/mutations/useRecalculateSpareParts', () => ({
    useRecalculateSpareParts: () => mockRecalculate,
}))

const mockCloseModal = jest.fn()
const mockOpenModal = jest.fn()
jest.mock('@/store/useDynamicModalStore', () => {
    const store = () => ({ closeModal: mockCloseModal })
    store.getState = () => ({ openModal: mockOpenModal })
    return { useDynamicModalStore: store }
})

const messages: Record<string, string> = {
    'systemsPage.systemDetail.form.minimalSpareParstCount.label': 'Minimal spares',
    'systemsPage.systemDetail.minimalSparePartsModal.message': 'Explanation',
    'common.buttons.cancel': 'Cancel',
    'common.buttons.ok': 'OK',
}

const system: SystemLeaf = {
    uid: 'sys-1',
    name: 'Test System',
    systemCode: 'SYS-001',
    physicalItem: null,
    parentPath: null,
}

let queryClient: QueryClient

// The modal body is what openSetMinimalSparesModal hands to the modal store —
// render it directly so the store stays a thin mock.
const renderModal = (currentValue: number | null) => {
    mockOpenModal.mockClear()
    openSetMinimalSparesModal({ system, title: 'Set Minimal Spares', currentValue })
    const ModalBody = mockOpenModal.mock.calls[0][1].component

    return render(
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale="en" messages={messages}>
                <ModalBody />
            </IntlProvider>
        </QueryClientProvider>,
    )
}

const clickOk = () => fireEvent.click(screen.getByTestId('set-minimal-spares-ok'))

const typeValue = (value: string) =>
    fireEvent.change(screen.getByTestId('set-minimal-spares-input'), { target: { value } })

beforeEach(() => {
    jest.clearAllMocks()
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    mockUpdateField.mockResolvedValue({ updateSystems: {} })
    mockRecalculate.mockResolvedValue(true)
})

describe('openSetMinimalSparesModal', () => {
    it('opens a titled dialog keyed by system uid', () => {
        openSetMinimalSparesModal({ system, title: 'Set Minimal Spares', currentValue: 2 })
        const [type, config] = mockOpenModal.mock.calls[0]
        expect(type).toBe('dialog')
        expect(config.id).toBe('set-minimal-spares-sys-1')
        expect(config.props.title).toBe('Set Minimal Spares')
    })

    it('seeds the input from the current value', () => {
        renderModal(3)
        expect(screen.getByTestId('set-minimal-spares-input')).toHaveValue(3)
    })

    it('saves the entered value with the previous one for the history entry', async () => {
        renderModal(2)
        typeValue('0.25')
        clickOk()

        expect(mockUpdateField).toHaveBeenCalledWith('sys-1', 'minimalSpareParstCount', 0.25, {
            previousValue: 2,
        })
    })

    it('stores 0 as null so the system has no requirement', () => {
        renderModal(2)
        typeValue('0')
        clickOk()

        expect(mockUpdateField).toHaveBeenCalledWith('sys-1', 'minimalSpareParstCount', null, {
            previousValue: 2,
        })
    })

    // The requirement is sp_coverage's divisor, and this save bypasses the API
    // that maintains it — without the recalc the tab keeps showing "Available 0".
    it('recalculates coverage after a successful save', async () => {
        renderModal(null)
        typeValue('1')
        clickOk()
        await Promise.resolve()

        expect(mockRecalculate).toHaveBeenCalled()
    })

    it('skips the recalculation when the save is blocked by the edit guard', async () => {
        mockUpdateField.mockResolvedValue(undefined)
        renderModal(null)
        typeValue('1')
        clickOk()
        await Promise.resolve()

        expect(mockRecalculate).not.toHaveBeenCalled()
    })

    // Saving an untouched value would write history and trigger a graph-wide
    // recalculation for nothing.
    it('skips the save entirely when the value was not changed', () => {
        renderModal(2)
        clickOk()

        expect(mockUpdateField).not.toHaveBeenCalled()
        expect(mockCloseModal).toHaveBeenCalledWith('set-minimal-spares-sys-1')
    })

    it('treats an unset minimum and a typed 0 as the same no-op', () => {
        renderModal(null)
        typeValue('0')
        clickOk()

        expect(mockUpdateField).not.toHaveBeenCalled()
    })

    it('clamps negative input to 0 instead of saving it', () => {
        renderModal(2)
        typeValue('-5')
        clickOk()

        expect(mockUpdateField).toHaveBeenCalledWith('sys-1', 'minimalSpareParstCount', null, {
            previousValue: 2,
        })
    })

    it('closes without saving on Cancel', () => {
        renderModal(2)
        fireEvent.click(screen.getByText('Cancel'))

        expect(mockUpdateField).not.toHaveBeenCalled()
        expect(mockCloseModal).toHaveBeenCalledWith('set-minimal-spares-sys-1')
    })
})
