import { render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import type { FC, PropsWithChildren } from 'react'

import { TextArea } from '../components/TextArea.comp'

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextArea component', () => {
    it('renders with label', () => {
        render(
            <FormWrapper>
                <TextArea name="test" label="Description" />
            </FormWrapper>,
        )
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
    })

    it('renders error message when validation fails', () => {
        const WithError: FC = () => {
            const methods = useForm({
                defaultValues: { test: '' },
            })
            // Manually set an error
            methods.setError('test', { message: 'Field is required' })
            return (
                <FormProvider {...methods}>
                    <TextArea name="test" label="Test" />
                </FormProvider>
            )
        }
        render(<WithError />)
        expect(screen.getByText('Field is required')).toBeInTheDocument()
    })

    it('sets aria-invalid when error exists', () => {
        const WithError: FC = () => {
            const methods = useForm({
                defaultValues: { test: '' },
            })
            methods.setError('test', { message: 'Required' })
            return (
                <FormProvider {...methods}>
                    <TextArea name="test" label="Test" />
                </FormProvider>
            )
        }
        render(<WithError />)
        expect(screen.getByLabelText('Test')).toHaveAttribute(
            'aria-invalid',
            'true',
        )
    })

    it('does not show error when field is valid', () => {
        render(
            <FormWrapper>
                <TextArea name="test" label="Test" />
            </FormWrapper>,
        )
        expect(screen.queryByText('Field is required')).not.toBeInTheDocument()
        expect(screen.getByLabelText('Test')).toHaveAttribute(
            'aria-invalid',
            'false',
        )
    })
})
