import { QueryClient } from '@tanstack/react-query'
import { act, fireEvent, screen, within } from '@testing-library/react'
import { type FieldValues, useForm, type UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { message, messages } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { queryMutate } from '@/utils/fetcher'

import fixture from '../__fixtures__/wos-lookup-preview.json'
import { getWosLookupQueryKey } from '../hooks/useWosLookup'
import type { WosLookupResponse } from '../types/wos-preview.types'
import { WosImportDialogContainer } from '../wos-import-dialog.cont'

jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn() } }))
jest.mock('@/utils/fetcher', () => ({
    ...jest.requireActual('@/utils/fetcher'),
    queryMutate: jest.fn(),
}))

const preview = fixture as WosLookupResponse
const DOI = preview.doi
const mockQueryMutate = queryMutate as jest.Mock
const patchResearcherIds = jest.fn()
const onClose = jest.fn()
const label = (id: string) => messages.en[id]
const form = message.publication.form

// The DOI typed by the editor differs only in case from the canonical WoS DOI,
// and a volume is already filled in: both must be offered, neither pre-checked.
const FORM_VALUES = {
    doi: '10.1103/physrevresearch.6.013126',
    title: '',
    volume: 7,
    eliResearchers: [],
    eliAuthorsCount: 0,
}

let formMethods: UseFormReturn
const Harness = ({ canImport }: { canImport: boolean }) => {
    formMethods = useForm<FieldValues>({ defaultValues: FORM_VALUES })
    return (
        <WosImportDialogContainer
            doi={DOI}
            canImport={canImport}
            getValues={formMethods.getValues}
            setValue={formMethods.setValue}
            onClose={onClose}
        />
    )
}

const renderDialog = ({
    data = preview,
    canImport = true,
}: { data?: WosLookupResponse | null; canImport?: boolean } = {}) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    if (data) queryClient.setQueryData(getWosLookupQueryKey(DOI), data)
    return renderWithProviders(<Harness canImport={canImport} />, { queryClient })
}

const row = (field: string) => screen.getByTestId(`wos-field-row-${field}`)
const author = (index: number) => screen.getByTestId(`wos-import-author-${index}`)
const importButton = () => screen.getByRole('button', { name: /^Import \d+ fields?$/u })

beforeEach(() => {
    jest.clearAllMocks()
    useDynamicModalStore.setState({ modals: {}, modalOrder: [] })
    patchResearcherIds.mockResolvedValue({ data: {} })
    mockQueryMutate.mockReturnValue(patchResearcherIds)
})

describe('WosImportDialogContainer — shared API fixture', () => {
    it('pre-checks empty fields and leaves overwrites unchecked and marked', () => {
        renderDialog()

        expect(within(row('title')).getByRole('checkbox')).toBeChecked()
        expect(within(row('longJournalTitle')).getByRole('checkbox')).toBeChecked()
        for (const field of ['volume', 'doi']) {
            expect(within(row(field)).getByRole('checkbox')).not.toBeChecked()
            expect(within(row(field)).getByText('overwrites')).toBeInTheDocument()
        }
        expect(within(row('volume')).getByText('7')).toBeInTheDocument()
        expect(within(row('volume')).getByText('6')).toBeInTheDocument()
        expect(
            within(row('mediaTypeCb')).getByText('J - Peer-reviewed article'),
        ).toBeInTheDocument()
        // Absent from values and without a warning: no row that would do nothing.
        expect(screen.queryByTestId('wos-field-row-isbn')).not.toBeInTheDocument()
    })

    it('shows warnings inline on the row they belong to', () => {
        renderDialog()

        expect(within(row('dateOfPublication')).getByRole('checkbox')).toBeChecked()
        expect(within(row('dateOfPublication')).getByText('day missing')).toBeInTheDocument()
        const issue = row('issue')
        expect(within(issue).queryByRole('checkbox')).not.toBeInTheDocument()
        expect(within(issue).getByText('1-2')).toBeInTheDocument()
        expect(within(issue).getByText('not a number — enter it by hand')).toBeInTheDocument()
    })

    it('clamps long values to two lines with the full value as tooltip', () => {
        renderDialog()
        const title = within(row('title')).getByText(preview.values?.title ?? '')
        expect(title).toHaveClass('line-clamp-2')
        expect(title).toHaveAttribute('title', preview.values?.title)
    })

    it('renders author confidence chips straight from matches', () => {
        renderDialog()

        expect(
            screen.getByText('Authors · 4 found, 3 matched to ELI researchers'),
        ).toBeInTheDocument()
        expect(within(author(0)).getByText('Exact ID')).toBeInTheDocument()
        expect(within(author(0)).getAllByRole('checkbox')[0]).toBeChecked()
        expect(within(author(1)).getByText('Name match')).toBeInTheDocument()
        expect(within(author(1)).getAllByRole('checkbox')[0]).not.toBeChecked()
        expect(within(author(2)).getByText('Ambiguous')).toBeInTheDocument()
        expect(within(author(2)).getByText('2 candidates…')).toBeInTheDocument()
        expect(within(author(2)).getAllByRole('checkbox')[0]).toBeDisabled()
        expect(within(author(3)).getByText('external author')).toBeInTheDocument()
        expect(within(author(3)).queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('offers to remember the ResearcherID only for a name match that lacks it', () => {
        renderDialog()

        const remember = screen.getByLabelText('also remember AAC-5678-2021 for Petr Dvořák')
        expect(remember).toBeDisabled()
        fireEvent.click(within(author(1)).getAllByRole('checkbox')[0])
        expect(remember).toBeEnabled()
        expect(screen.queryByText(/also remember AAB-1234-2020/u)).not.toBeInTheDocument()
    })

    it('resolves an ambiguous author from its candidate list', () => {
        renderDialog()

        fireEvent.click(within(author(2)).getAllByRole('radio')[1])
        expect(within(author(2)).getAllByRole('checkbox')[0]).toBeChecked()
        expect(within(author(2)).getByText('Martin Svoboda')).toBeInTheDocument()
    })

    it('stacks the researcher picker above the dialog for change', () => {
        renderDialog()

        fireEvent.click(within(author(0)).getByRole('button', { name: 'change' }))
        const picker = useDynamicModalStore.getState().modals['wos-import-researcher']
        expect(picker.props?.initialSelected).toEqual([
            { uid: 'res-novak', firstName: 'Jan', lastName: 'Novák' },
        ])
        act(() =>
            picker.props?.onSelect([
                { uid: 'res-novak', firstName: 'Jan', lastName: 'Novák' },
                { uid: 'res-other', firstName: 'Eva', lastName: 'Jiná' },
            ]),
        )
        expect(within(author(0)).getByText('Eva Jiná')).toBeInTheDocument()
    })

    it('shows the already-in-PANDA banner and the record header', () => {
        renderDialog()

        expect(
            screen.getByText('This DOI is already in PANDA as ELI-2024-017.'),
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Open record' })).toHaveAttribute(
            'href',
            '/publication/pub-eli-2024-017',
        )
        expect(screen.getByText('PHYSICAL REVIEW RESEARCH · 2024 · vol 6')).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: 'Open WOS:001164928200001 in Web of Science' }),
        ).toHaveAttribute('href', preview.recordUrl)
    })

    it('always lists what WoS cannot supply', () => {
        renderDialog()

        expect(
            screen.getByText('Not available from WoS — 16 fields to complete by hand'),
        ).toBeInTheDocument()
        const unavailable = screen.getByTestId('wos-import-unavailable').textContent
        for (const id of [
            form.abstract.label,
            form.openAccessType.label,
            form.publishingCountry.label,
            form.oecdFord.label,
        ])
            expect(unavailable).toContain(label(id))
    })

    it('still renders the not-available block when nothing is missing', () => {
        renderDialog({ data: { ...preview, unavailableFields: [], missingImportableFields: [] } })

        expect(
            screen.getByText('Not available from WoS — 0 fields to complete by hand'),
        ).toBeInTheDocument()
        expect(screen.getByTestId('wos-import-unavailable')).toHaveTextContent(
            label(message.publication.wos.unavailableEmpty),
        )
    })

    it('counts the fields that will change and imports only those', () => {
        renderDialog()

        // 14 empty fields plus the ELI researcher list gaining the exact-ID author.
        expect(importButton()).toHaveTextContent('Import 15 fields')
        fireEvent.click(within(author(1)).getAllByRole('checkbox')[0])
        fireEvent.click(screen.getByLabelText('also remember AAC-5678-2021 for Petr Dvořák'))
        expect(importButton()).toHaveTextContent('Import 15 fields')
        fireEvent.click(importButton())

        const values = formMethods.getValues()
        expect(values.title).toBe(preview.values?.title)
        expect(values.mediaTypeCb).toEqual(preview.values?.mediaTypeCb)
        expect(values.volume).toBe(7)
        expect(values.doi).toBe(FORM_VALUES.doi)
        expect(values.eliResearchers).toEqual([
            { uid: 'res-novak', firstName: 'Jan', lastName: 'Novák' },
            { uid: 'res-dvorak', firstName: 'Petr', lastName: 'Dvořák' },
        ])
        // The count follows from eliResearchers inside the form, never from the import.
        expect(values.eliAuthorsCount).toBe(0)
        expect(formMethods.getFieldState('title').isDirty).toBe(true)
        expect(formMethods.getFieldState('volume').isDirty).toBe(false)

        expect(mockQueryMutate).toHaveBeenCalledWith('researcherIds', 'patch', {
            uid: 'res-dvorak',
        })
        expect(patchResearcherIds).toHaveBeenCalledWith({ researcherIds: ['AAC-5678-2021'] })
        expect(toast.success).toHaveBeenCalledWith('Imported 15 fields from Web of Science.')
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('disables Import when nothing would change', () => {
        renderDialog()

        fireEvent.click(screen.getByRole('button', { name: 'None' }))
        fireEvent.click(within(author(0)).getAllByRole('checkbox')[0])
        expect(importButton()).toHaveTextContent('Import 0 fields')
        expect(importButton()).toBeDisabled()
        fireEvent.click(screen.getByRole('button', { name: 'Only empty' }))
        expect(importButton()).toHaveTextContent('Import 14 fields')
        fireEvent.click(screen.getByRole('button', { name: 'All' }))
        expect(importButton()).toHaveTextContent('Import 16 fields')
    })

    it('lets a view-only user review but not import', () => {
        renderDialog({ canImport: false })

        expect(importButton()).toBeDisabled()
        expect(
            screen.getByText(label(message.publication.wos.importRequiresEdit)),
        ).toBeInTheDocument()
    })

    it('shows cancellable skeleton rows until the lookup answers', () => {
        renderDialog({ data: null })

        expect(screen.getByTestId('wos-import-dialog-loading')).toBeInTheDocument()
        expect(importButton()).toBeDisabled()
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
