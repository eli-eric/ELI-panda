import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { SYSTEMS_TABLE_ID } from '@/modules/systems/types/constants'

import type { SystemLeaf } from '../../../types'
import { LEAVES_QUERY_KEY } from '../../../types/constants'
import { openSetMinimalSparesModal } from '../set-minimal-spares.modal'

const mockUpdateField = jest.fn()
jest.mock('../../../hooks/mutations/useSystemFieldUpdate', () => ({
    useSystemFieldUpdate: () => ({ updateField: mockUpdateField, isPending: false }),
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
let invalidateSpy: jest.SpyInstance

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
    invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries').mockImplementation(jest.fn())
    mockUpdateField.mockResolvedValue({ updateSystems: {} })
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

    it('invalidates the coverage-colored tables after a successful save', async () => {
        renderModal(null)
        typeValue('1')
        clickOk()
        await Promise.resolve()

        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: [LEAVES_QUERY_KEY] })
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: [SYSTEMS_TABLE_ID] })
    })

    it('skips invalidation when the save is blocked by the edit guard', async () => {
        mockUpdateField.mockResolvedValue(undefined)
        renderModal(null)
        typeValue('1')
        clickOk()
        await Promise.resolve()

        expect(invalidateSpy).not.toHaveBeenCalled()
    })

    it('closes without saving on Cancel', () => {
        renderModal(2)
        fireEvent.click(screen.getByText('Cancel'))

        expect(mockUpdateField).not.toHaveBeenCalled()
        expect(mockCloseModal).toHaveBeenCalledWith('set-minimal-spares-sys-1')
    })
})
