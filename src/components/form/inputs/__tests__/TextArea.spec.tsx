import { render, screen, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { type FC, type PropsWithChildren, useEffect } from 'react'

import { TextArea } from '../components/TextArea.comp'

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

const WithError: FC<{ field: string; message: string }> = ({ field, message }) => {
    const methods = useForm({ defaultValues: { [field]: '' } })
    useEffect(() => {
        methods.setError(field, { message })
    }, [methods, field, message])
    return (
        <FormProvider {...methods}>
            <TextArea name={field} label="Test" />
        </FormProvider>
    )
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

    it('renders error message when validation fails', async () => {
        render(<WithError field="test" message="Field is required" />)
        await waitFor(() => {
            expect(screen.getByText('Field is required')).toBeInTheDocument()
        })
    })

    it('sets aria-invalid when error exists', async () => {
        render(<WithError field="test" message="Required" />)
        await waitFor(() => {
            expect(screen.getByLabelText('Test')).toHaveAttribute(
                'aria-invalid',
                'true',
            )
        })
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
