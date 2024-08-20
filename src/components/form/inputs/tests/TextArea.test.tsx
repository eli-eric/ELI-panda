import { fireEvent, render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { TextArea } from '../components/TextArea.comp'

describe('TextArea', () => {
  const Wrapper = ({ children }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
  }

  it('renders without crashing', () => {
    render(<TextArea name="testArea" />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('has the correct default value', () => {
    const defaultValue = 'Test default value'
    render(<TextArea name="testArea" defaultValue={defaultValue} />, {
      wrapper: Wrapper
    })
    expect(screen.getByRole('textbox')).toHaveValue(defaultValue)
  })

  it('changes value on user input', () => {
    const { getByRole } = render(<TextArea name="testArea" />, {
      wrapper: Wrapper
    })
    const textarea = getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(textarea).toHaveValue('New text')
  })

  it('is disabled when disabled prop is true', () => {
    render(<TextArea name="testArea" disabled />, { wrapper: Wrapper })
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('displays validation icon when there is an error', () => {
    // Mock useFormContext to simulate error state
    jest.mock('react-hook-form', () => ({
      ...jest.requireActual('react-hook-form'),
      useFormContext: () => ({
        control: {},
        formState: { errors: { testArea: { message: 'Error message' } } }
      })
    }))
    render(<TextArea name="testArea" />, { wrapper: Wrapper })
    expect(screen.getByTestId('validation-icon')).toBeInTheDocument()
  })
})
