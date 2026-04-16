import { render, screen, waitFor } from '@testing-library/react'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Combobox from '../Combobox'

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => id,
    }),
}))

jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: null }),
}))

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: () => ({ data: { data: [], metadata: undefined } }),
}))

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

const WithError: FC<{ field: string; message: string }> = ({ field, message }) => {
    const methods = useForm({ defaultValues: { [field]: null } })
    useEffect(() => {
        methods.setError(field, { message })
    }, [methods, field, message])
    return (
        <FormProvider {...methods}>
            <Combobox name={field} label="Country" />
        </FormProvider>
    )
}

describe('Combobox component', () => {
    it('renders with label', () => {
        render(
            <FormWrapper>
                <Combobox name="test" label="Country" />
            </FormWrapper>,
        )
        expect(screen.getByText('Country')).toBeInTheDocument()
    })

    it('renders error message when validation fails', async () => {
        render(<WithError field="country" message="Publishing Country is required" />)
        await waitFor(() => {
            expect(screen.getByText('Publishing Country is required')).toBeInTheDocument()
        })
    })

    it('sets aria-invalid on trigger button when error exists', async () => {
        render(<WithError field="country" message="Required" />)
        await waitFor(() => {
            const button = screen.getByRole('combobox')
            expect(button).toHaveAttribute('aria-invalid', 'true')
        })
    })

    it('does not show error when field is valid', () => {
        render(
            <FormWrapper>
                <Combobox name="test" label="Country" />
            </FormWrapper>,
        )
        expect(screen.queryByText('Publishing Country is required')).not.toBeInTheDocument()
        const button = screen.getByRole('combobox')
        expect(button).toHaveAttribute('aria-invalid', 'false')
    })
})
