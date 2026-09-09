import { fireEvent, screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'

import { message } from '@/i18n/src/messages'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { PublicationYearField } from '../publication-year.field'

jest.mock('../../hooks/usePublicationFields', () => ({
    usePublicationFields: () => ({
        yearOfPublication: {
            name: 'yearOfPublication',
            label: message.publication.form.yearOfPublication.label,
        },
    }),
}))
jest.mock('@/hooks/fetch/useCodebook', () => ({ useCodebook: () => ({ data: undefined }) }))
const importActionLabel = 'Apply imported year'
const Harness = () => {
    const { setValue } = useFormContext()
    return (
        <>
            <PublicationYearField />
            <button type="button" onClick={() => setValue('yearOfPublication', '2011')}>
                {importActionLabel}
            </button>
        </>
    )
}
it('shows a loaded historical year in the listbox and follows a confirmed import', () => {
    renderWithProviders(<Harness />, {
        withForm: true,
        formProps: { defaultValues: { yearOfPublication: '1998' } },
    })
    expect(screen.getByRole('combobox')).toHaveTextContent('1998')
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: importActionLabel }))
    expect(screen.getByRole('combobox')).toHaveTextContent('2011')
})
