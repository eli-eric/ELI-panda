import { render } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { usePublicationFields } from '../../hooks/usePublicationFields'
import { WebLinkField } from '../web-link.field'

jest.mock('../../hooks/usePublicationFields', () => ({
    usePublicationFields: jest.fn(),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: (props: any) => <input data-testid="web-link-input" {...props} />,
}))

const mockUsePublicationFields = usePublicationFields as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePublicationFields.mockReturnValue({
        webLink: { name: 'webLink' },
    })
})

const Probe = () => {
    return <WebLinkField />
}

describe('WebLinkField', () => {
    it('sets webLink to https://doi.org/{doi} when doi present', () => {
        const Wrapper = () => {
            const methods = useForm({ defaultValues: { doi: '10.1000/xyz', webLink: '' } })
            const webLink = methods.watch('webLink')
            return (
                <FormProvider {...methods}>
                    <span data-testid="capture">{webLink}</span>
                    <Probe />
                </FormProvider>
            )
        }
        const { getByTestId } = render(<Wrapper />)
        expect(getByTestId('capture').textContent).toBe('https://doi.org/10.1000/xyz')
    })

    it('clears webLink when doi is empty', () => {
        const Wrapper = () => {
            const methods = useForm({ defaultValues: { doi: '', webLink: 'stale' } })
            const webLink = methods.watch('webLink')
            return (
                <FormProvider {...methods}>
                    <span data-testid="capture">{webLink}</span>
                    <Probe />
                </FormProvider>
            )
        }
        const { getByTestId } = render(<Wrapper />)
        expect(getByTestId('capture').textContent).toBe('')
    })
})
