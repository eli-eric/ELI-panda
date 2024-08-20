/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { FormWrapper } from '@/testutils/components'

import { InputAmount } from './InputAmount.comp'

describe('InputAmount component', () => {
  it('renders the input with the correct label', () => {
    render(
      <FormWrapper>
        <InputAmount name="amount" label="Amount" />
      </FormWrapper>
    )

    // Verify that the label is rendered
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
  })

  it('accepts numeric input values', () => {
    render(
      <FormWrapper>
        <InputAmount name="amount" label="Amount" />
      </FormWrapper>
    )

    const input = screen.getByLabelText('Amount') as HTMLInputElement
    fireEvent.change(input, { target: { value: '100.123' } })

    // Check that the input value is correctly set
    expect(input.value).toBe('100.123')
  })

  it('displays any child components', () => {
    render(
      <FormWrapper>
        <InputAmount name="amount" label="Amount">
          <span data-testid="currency">USD</span>
        </InputAmount>
      </FormWrapper>
    )

    // Check that the child component (currency) is rendered
    expect(screen.getByTestId('currency')).toBeInTheDocument()
    expect(screen.getByTestId('currency')).toHaveTextContent('USD')
  })

  it('disables the input when the disabled prop is true', () => {
    render(
      <FormWrapper>
        <InputAmount name="amount" label="Amount" disabled />
      </FormWrapper>
    )

    const input = screen.getByLabelText('Amount') as HTMLInputElement

    // Check that the input is disabled
    expect(input).toBeDisabled()
  })
})
