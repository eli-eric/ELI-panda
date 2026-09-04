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
    // The real field is read-only, so the derivation below is the only writer.
    mockUsePublicationFields.mockReturnValue({
        webLink: { name: 'webLink', disabled: true },
    })
})

const renderWithValues = (defaultValues: { doi: string; webLink: string }) => {
    const Wrapper = () => {
        const methods = useForm({ defaultValues })
        const webLink = methods.watch('webLink')
        return (
            <FormProvider {...methods}>
                <span data-testid="capture">{webLink}</span>
                <WebLinkField />
            </FormProvider>
        )
    }

    return render(<Wrapper />).getByTestId('capture')
}

describe('WebLinkField', () => {
    it('derives the canonical doi.org link when the web link is blank', () => {
        const capture = renderWithValues({ doi: '10.1000/xyz', webLink: '' })
        expect(capture.textContent).toBe('https://doi.org/10.1000/xyz')
    })

    it('normalizes a pasted doi.org URL instead of nesting it', () => {
        const capture = renderWithValues({ doi: 'https://doi.org/10.1000/xyz', webLink: '' })
        expect(capture.textContent).toBe('https://doi.org/10.1000/xyz')
    })

    it('leaves an applied Web of Science record link untouched', () => {
        const capture = renderWithValues({
            doi: '10.1000/xyz',
            webLink: 'https://www.webofscience.com/wos/woscc/full-record/WOS:000123456700001',
        })
        expect(capture.textContent).toBe(
            'https://www.webofscience.com/wos/woscc/full-record/WOS:000123456700001',
        )
    })

    it('does not derive a link from a malformed DOI', () => {
        const capture = renderWithValues({ doi: 'not-a-doi', webLink: '' })
        expect(capture.textContent).toBe('')
    })

    it('does not overwrite an existing web link when the DOI is empty', () => {
        const capture = renderWithValues({ doi: '', webLink: 'stale' })
        expect(capture.textContent).toBe('stale')
    })
})
