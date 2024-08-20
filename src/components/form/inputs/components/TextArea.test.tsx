import { fireEvent, render, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils/components'

import { TextArea } from './TextArea.comp'

describe('TextArea', () => {
  it('renders without crashing', () => {
    render(<TextArea name="testArea" />, { wrapper: FormWrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('has the correct default value', () => {
    const defaultValue = 'Test default value'
    render(<TextArea name="testArea" defaultValue={defaultValue} />, {
      wrapper: FormWrapper
    })
    expect(screen.getByRole('textbox')).toHaveValue(defaultValue)
  })

  it('changes value on user input', () => {
    const { getByRole } = render(<TextArea name="testArea" />, {
      wrapper: FormWrapper
    })
    const textarea = getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(textarea).toHaveValue('New text')
  })

  it('is disabled when disabled prop is true', () => {
    render(<TextArea name="testArea" disabled />, { wrapper: FormWrapper })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
