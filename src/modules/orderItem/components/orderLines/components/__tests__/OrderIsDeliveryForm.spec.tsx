import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { OrderIsDeliveryForm } from '../OrderIsDeliveryForm'

describe('OrderIsDeliveryForm', () => {
    it('renders serial number input + manualEun checkbox', () => {
        renderWithProviders(<OrderIsDeliveryForm />, {
            withForm: true,
            formProps: { defaultValues: { serialNumber: '', manualEun: false } },
        })
        // Two form-control elements: serialNumber input + manualEun checkbox
        const inputs = screen.queryAllByRole('textbox')
        expect(inputs.length).toBeGreaterThan(0)
        const checkboxes = screen.queryAllByRole('checkbox')
        expect(checkboxes.length).toBe(1)
    })

    it('hides eun input by default (manualEun=false)', () => {
        renderWithProviders(<OrderIsDeliveryForm />, {
            withForm: true,
            formProps: { defaultValues: { manualEun: false } },
        })
        expect(screen.queryAllByRole('textbox').length).toBe(1)
    })

    it('shows eun input when manualEun=true', () => {
        renderWithProviders(<OrderIsDeliveryForm />, {
            withForm: true,
            formProps: { defaultValues: { manualEun: true } },
        })
        // serialNumber input + eun input
        expect(screen.queryAllByRole('textbox').length).toBe(2)
    })

    it('toggling manualEun checkbox reveals the eun input', () => {
        renderWithProviders(<OrderIsDeliveryForm />, {
            withForm: true,
            formProps: { defaultValues: { manualEun: false } },
        })
        const before = screen.queryAllByRole('textbox').length
        fireEvent.click(screen.getByRole('checkbox'))
        const after = screen.queryAllByRole('textbox').length
        expect(after).toBe(before + 1)
    })
})
