import { fireEvent, render, screen } from '@testing-library/react'
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

const importActionLabel = 'Apply imported values'

const renderWithValues = (
    defaultValues: { doi: string; webLink: string },
    importedValues?: { doi: string; webLink: string },
) => {
    const Wrapper = () => {
        const methods = useForm({ defaultValues })
        const webLink = methods.watch('webLink')
        return (
            <FormProvider {...methods}>
                <span data-testid="capture">{webLink}</span>
                <input aria-label="DOI" {...methods.register('doi')} />
                <WebLinkField />
                {importedValues && (
                    <button
                        type="button"
                        onClick={() => {
                            methods.setValue('doi', importedValues.doi)
                            methods.setValue('webLink', importedValues.webLink)
                        }}
                    >
                        {importActionLabel}
                    </button>
                )}
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

describe('DOI edits', () => {
    it('refreshes and clears a derived resolver link', () => {
        const capture = renderWithValues({
            doi: '10.1234/old',
            webLink: 'https://doi.org/10.1234/old',
        })
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/new' } })
        expect(capture.textContent).toBe('https://doi.org/10.1234/new')
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/' } })
        expect(capture.textContent).toBe('')
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/fixed' } })
        expect(capture.textContent).toBe('https://doi.org/10.1234/fixed')
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '' } })
        expect(capture.textContent).toBe('')
    })
    it.each([
        'https://www.webofscience.com/wos/woscc/full-record/WOS:123',
        'https://publisher.example/article',
        'https://doi.org/10.1234/unrelated',
        'https://doi.org/10.1234/old?source=custom',
        'http://dx.doi.org/10.1234/old',
    ])('preserves independent link %s through hydration, DOI changes and removal', url => {
        const capture = renderWithValues({ doi: '10.1234/old', webLink: url })
        expect(capture.textContent).toBe(url)
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/new' } })
        expect(capture.textContent).toBe(url)
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '' } })
        expect(capture.textContent).toBe(url)
    })
    it('normalizes an exact legacy uppercase link and keeps following DOI edits', () => {
        const capture = renderWithValues({
            doi: '10.1234/Old',
            webLink: 'https://doi.org/10.1234/Old',
        })
        expect(capture.textContent).toBe('https://doi.org/10.1234/old')
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/new' } })
        expect(capture.textContent).toBe('https://doi.org/10.1234/new')
    })
    it('preserves an independently imported DOI resolver link', () => {
        const importedValues = { doi: '10.1234/new', webLink: 'https://doi.org/10.1234/other' }
        const capture = renderWithValues(
            { doi: '10.1234/old', webLink: 'https://doi.org/10.1234/old' },
            importedValues,
        )
        fireEvent.click(screen.getByRole('button', { name: importActionLabel }))
        expect(capture.textContent).toBe(importedValues.webLink)
        fireEvent.change(screen.getByLabelText('DOI'), { target: { value: '10.1234/changed' } })
        expect(capture.textContent).toBe(importedValues.webLink)
    })
})
