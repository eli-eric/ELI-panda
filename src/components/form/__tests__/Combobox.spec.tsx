import { render, screen } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
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

describe('Combobox component', () => {
    it('renders with label', () => {
        render(
            <FormWrapper>
                <Combobox name="test" label="Country" />
            </FormWrapper>,
        )
        expect(screen.getByText('Country')).toBeInTheDocument()
    })

    it('renders error message when validation fails', () => {
        const WithError: FC = () => {
            const methods = useForm({ defaultValues: { country: null } })
            methods.setError('country', {
                message: 'Publishing Country is required',
            })
            return (
                <FormProvider {...methods}>
                    <Combobox name="country" label="Country" />
                </FormProvider>
            )
        }
        render(<WithError />)
        expect(
            screen.getByText('Publishing Country is required'),
        ).toBeInTheDocument()
    })

    it('sets aria-invalid on trigger button when error exists', () => {
        const WithError: FC = () => {
            const methods = useForm({ defaultValues: { country: null } })
            methods.setError('country', { message: 'Required' })
            return (
                <FormProvider {...methods}>
                    <Combobox name="country" label="Country" />
                </FormProvider>
            )
        }
        render(<WithError />)
        const button = screen.getByRole('combobox')
        expect(button).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not show error when field is valid', () => {
        render(
            <FormWrapper>
                <Combobox name="test" label="Country" />
            </FormWrapper>,
        )
        expect(
            screen.queryByText('Publishing Country is required'),
        ).not.toBeInTheDocument()
        const button = screen.getByRole('combobox')
        expect(button).toHaveAttribute('aria-invalid', 'false')
    })
})
