/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InputCurrency } from '../components/InputCurrency.comp'

describe('InputCurrency', () => {
  it('renders without crashing', () => {
    render(<InputCurrency name="currency" />, { wrapper: FormWrapper })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('has the correct default value', () => {
    render(<InputCurrency name="currency" />, { wrapper: FormWrapper })
    expect(screen.getByRole('combobox')).toHaveValue('EUR')
  })

  it('contains all currency options', () => {
    render(<InputCurrency name="currency" />, { wrapper: FormWrapper })
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(6)
    const expectedCurrencies = ['EUR', 'USD', 'CZK', 'HUF', 'RON', 'GBP']
    expectedCurrencies.forEach(currency => {
      expect(screen.getByText(currency)).toBeInTheDocument()
    })
  })

  it('changes value on user input', () => {
    render(<InputCurrency name="currency" />, { wrapper: FormWrapper })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'USD' } })
    expect(screen.getByRole('combobox')).toHaveValue('USD')
  })
})
