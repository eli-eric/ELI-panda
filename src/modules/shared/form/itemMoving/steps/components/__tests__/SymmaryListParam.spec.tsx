import { render, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SummaryListParam } from '../SymmaryListParam.comp'

describe('SummaryListParam', () => {
    it('renders a list item with name and value formatted via FormattedMessage', () => {
        renderWithProviders(<SummaryListParam name="Voltage" value="12V" />)
        // list item tag <li> always present
        const li = document.querySelector('li')
        expect(li).not.toBeNull()
        // name + value appear somewhere in li
        expect(li!.textContent).toContain('Voltage')
        expect(li!.textContent).toContain('12V')
    })

    it('still renders when value is undefined', () => {
        renderWithProviders(<SummaryListParam name="V" />)
        const li = document.querySelector('li')
        expect(li).not.toBeNull()
        expect(li!.textContent).toContain('V')
    })
})
