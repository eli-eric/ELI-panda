import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'

import { InputDate } from '../components/InputDate.comp'

describe('InputDate', () => {
  it('renders without crashing', () => {
    render(<InputDate name="testDate" />, { wrapper: FormWrapper })
    expect(screen.getByTestId('testDate')).toBeInTheDocument()
  })

  it('has the correct default value', () => {
    const defaultValue = '2023-01-01'
    render(<InputDate name="testDate" defaultValue={defaultValue} />, {
      wrapper: FormWrapper
    })
    expect(screen.getByTestId('testDate')).toHaveValue(defaultValue)
  })

  it('changes value on user input', () => {
    render(<InputDate name="testDate" />, { wrapper: FormWrapper })
    const input = screen.getByTestId('testDate')
    fireEvent.change(input, { target: { value: '2023-02-01' } })
    expect(input).toHaveValue('2023-02-01')
  })

  it('is disabled when disabled prop is true', () => {
    render(<InputDate name="testDate" disabled />, { wrapper: FormWrapper })
    expect(screen.getByTestId('testDate')).toBeDisabled()
  })

  it('is hidden when hidden prop is true', () => {
    render(<InputDate name="testDate" hidden />, { wrapper: FormWrapper })
    expect(screen.queryByTestId('testDate')).not.toBeVisible()
  })
})
