/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils/components'

import { InputDate } from '../components/InputDate.comp'

describe('InputDate', () => {
  it('renders without crashing', () => {
    render(<InputDate name="testDate" />, { wrapper: FormWrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('has the correct default value', () => {
    const defaultValue = '2023-01-01'
    render(<InputDate name="testDate" defaultValue={defaultValue} />, {
      wrapper: FormWrapper
    })
    expect(screen.getByRole('textbox')).toHaveValue(defaultValue)
  })

  it('changes value on user input', () => {
    const { getByRole } = render(<InputDate name="testDate" />, {
      wrapper: FormWrapper
    })
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: '2023-02-01' } })
    expect(input).toHaveValue('2023-02-01')
  })

  it('is disabled when disabled prop is true', () => {
    render(<InputDate name="testDate" disabled />, { wrapper: FormWrapper })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('is hidden when hidden prop is true', () => {
    render(<InputDate name="testDate" hidden />, { wrapper: FormWrapper })
    expect(screen.getByRole('textbox')).not.toBeVisible()
  })
})
