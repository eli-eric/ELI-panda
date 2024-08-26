/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { FormWrapper } from '@/testutils'

import { Input } from '../components/Input.comp'

describe('Input component', () => {
  it('renders the input with the correct props', () => {
    render(
      <FormWrapper>
        <Input name="test-input" placeholder="Enter text" label="Test Label" />
      </FormWrapper>
    )

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })
  it('toggles password visibility when the eye icon is clicked', () => {
    render(
      <FormWrapper>
        <Input name="password" type="password" label="Password" />
      </FormWrapper>
    )

    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Select the toggle button using getByTestId
    const toggleButton = screen.getByTestId('toggle-password-visibility')
    fireEvent.click(toggleButton)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  it('calls the onChange prop with the debounced value', async () => {
    const handleChange = jest.fn()

    render(
      <FormWrapper>
        <Input
          name="debounced-input"
          label="Debounced Input"
          onChange={handleChange}
        />
      </FormWrapper>
    )

    const input = screen.getByLabelText('Debounced Input')
    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.change(input, { target: { value: 'hello world' } })

    // Wait for debounce (500ms)
    await waitFor(
      () => expect(handleChange).toHaveBeenCalledWith('hello world'),
      { timeout: 600 }
    )
  })
})
