import { QueryClient } from '@tanstack/react-query'
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react'
import { toast } from 'sonner'

import { message, messages } from '@/i18n/src/messages'
import { MEDIA_TYPE_UID } from '@/modules/publication/types/constants'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { queryMutate } from '@/utils/fetcher'

import fixture from '../__fixtures__/wos-lookup-preview.json'
import type { WosLookupResponse } from '../types/wos-preview.types'
import { WosImportDialogContainer } from '../wos-import-dialog.cont'

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn(), info: jest.fn(), promise: jest.fn() },
}))
jest.mock('@/utils/fetcher', () => ({
    ...jest.requireActual('@/utils/fetcher'),
    queryMutate: jest.fn(),
}))

const preview = fixture as WosLookupResponse
const DOI = preview.doi
const EXISTING_UID = preview.existingPublication?.uid
const mockQueryMutate = queryMutate as jest.Mock
const patchResearcherIds = jest.fn()
const onClose = jest.fn()
const onApply = jest.fn()

let currentData: WosLookupResponse | null = preview
const onError = jest.fn()
const label = (id: string) => messages.en[id]
const form = message.publication.form

// The DOI typed by the editor differs only in case from the canonical WoS DOI
// (the same DOI, not an overwrite), and a volume is already filled in (an
// overwrite: offered, never pre-checked). The form is the record PANDA already
// holds, so refreshing it stays allowed and the duplicate gate stays silent.
const FORM_VALUES: Record<string, unknown> = {
    doi: '10.1103/physrevresearch.6.013126',
    title: '',
    volume: 7,
    eliResearchers: [],
    eliAuthorsCount: 0,
}

const Harness = ({
    canImport,
    currentValues = FORM_VALUES,
    currentPublicationUid,
}: {
    canImport?: boolean
    currentValues?: Record<string, unknown>
    // null models "no current record" (create); an omitted prop falls back to
    // the fixture's own publication so the duplicate gate stays silent.
    currentPublicationUid?: string | null
}) => {
    const uid = currentPublicationUid === undefined ? EXISTING_UID : currentPublicationUid
    return (
        <WosImportDialogContainer
            doi={DOI}
            currentPublicationUid={uid ?? undefined}
            canImport={canImport ?? true}
            currentValues={currentValues}
            onApply={onApply}
            onError={onError}
            onClose={onClose}
        />
    )
}

const openDialog = async (
    options: {
        data?: WosLookupResponse | null
        canImport?: boolean
        currentValues?: Record<string, unknown>
        currentPublicationUid?: string | null
    } = {},
) => {
    const { data = preview, currentValues, currentPublicationUid, canImport } = options
    currentData = data
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const utils = renderWithProviders(
        <Harness
            canImport={canImport}
            currentValues={currentValues}
            currentPublicationUid={currentPublicationUid}
        />,
        { queryClient },
    )
    if (data) await screen.findByTestId('wos-import-dialog')
    return { ...utils, queryClient }
}

const row = (field: string) => screen.getByTestId(`wos-field-row-${field}`)
const author = (index: number) => screen.getByTestId(`wos-import-author-${index}`)
const importButton = () => screen.getByRole('button', { name: /^Import \d+ fields?$/u })
const appliedPatch = () => onApply.mock.calls[0][0] as Record<string, unknown>

beforeEach(() => {
    jest.clearAllMocks()
    currentData = preview
    useDynamicModalStore.setState({ modals: {}, modalOrder: [] })
    patchResearcherIds.mockResolvedValue({ data: {} })
    mockQueryMutate.mockImplementation((endpoint: string) =>
        endpoint === 'wosLookup'
            ? jest.fn(() =>
                  currentData
                      ? Promise.resolve({ data: currentData })
                      : Promise.withResolvers<never>().promise,
              )
            : patchResearcherIds,
    )
})

describe('WosImportDialogContainer — shared API fixture', () => {
    it('pre-checks empty fields and leaves overwrites unchecked and marked', async () => {
        await openDialog()

        expect(within(row('title')).getByRole('checkbox')).toBeChecked()
        expect(within(row('longJournalTitle')).getByRole('checkbox')).toBeChecked()
        expect(within(row('volume')).getByRole('checkbox')).not.toBeChecked()
        expect(within(row('volume')).getByText('overwrites')).toBeInTheDocument()
        expect(within(row('doi')).queryByText('overwrites')).not.toBeInTheDocument()
        expect(within(row('volume')).getByText('7')).toBeInTheDocument()
        expect(within(row('volume')).getByText('6')).toBeInTheDocument()
        expect(
            within(row('mediaTypeCb')).getByText('J - Peer-reviewed article'),
        ).toBeInTheDocument()
        // Absent from values and without a warning: no row that would do nothing.
        expect(screen.queryByTestId('wos-field-row-isbn')).not.toBeInTheDocument()
    })

    it('shows warnings inline on the row they belong to', async () => {
        await openDialog()

        expect(within(row('dateOfPublication')).getByRole('checkbox')).toBeChecked()
        expect(within(row('dateOfPublication')).getByText('day missing')).toBeInTheDocument()
        const issue = row('issue')
        expect(within(issue).queryByRole('checkbox')).not.toBeInTheDocument()
        expect(within(issue).getByText('1-2')).toBeInTheDocument()
        expect(within(issue).getByText('not a number — enter it by hand')).toBeInTheDocument()
    })

    it('clamps long values to two lines with the full value as tooltip', async () => {
        await openDialog()
        const title = within(row('title')).getByText(preview.values?.title ?? '')
        expect(title).toHaveClass('line-clamp-2')
        expect(title).toHaveAttribute('title', preview.values?.title)
    })

    it('renders author confidence chips straight from matches', async () => {
        await openDialog()

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

    it('offers to remember the ResearcherID only for a name match that lacks it', async () => {
        await openDialog()

        const remember = screen.getByLabelText('also remember AAC-5678-2021 for Petr Dvořák')
        expect(remember).toBeDisabled()
        fireEvent.click(within(author(1)).getAllByRole('checkbox')[0])
        expect(remember).toBeEnabled()
        expect(screen.queryByText(/also remember AAB-1234-2020/u)).not.toBeInTheDocument()
    })

    it('resolves an ambiguous author from its candidate list', async () => {
        await openDialog()

        fireEvent.click(within(author(2)).getAllByRole('radio')[1])
        expect(within(author(2)).getAllByRole('checkbox')[0]).toBeChecked()
        expect(within(author(2)).getByText('Martin Svoboda')).toBeInTheDocument()
    })

    it('stacks the researcher picker above the dialog for change', async () => {
        await openDialog()

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

    it('shows the already-in-PANDA banner and the record header', async () => {
        await openDialog()

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

    it('renders the WoS UID without an unsafe record link', async () => {
        await openDialog({ data: { ...preview, recordUrl: 'javascript:alert(1)' } })

        expect(screen.getAllByText('WOS:001164928200001').length).toBeGreaterThan(0)
        expect(
            screen.queryByRole('link', { name: `Open ${preview.wosUid} in Web of Science` }),
        ).not.toBeInTheDocument()
    })

    it('always lists what WoS cannot supply', async () => {
        await openDialog()

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

    it('still renders the not-available block when nothing is missing', async () => {
        await openDialog({
            data: { ...preview, unavailableFields: [], missingImportableFields: [] },
        })

        expect(
            screen.getByText('Not available from WoS — 0 fields to complete by hand'),
        ).toBeInTheDocument()
        expect(screen.getByTestId('wos-import-unavailable')).toHaveTextContent(
            label(message.publication.wos.unavailableEmpty),
        )
    })

    it('counts the fields that will change and imports only those', async () => {
        await openDialog()

        // 14 empty fields plus the ELI researcher list gaining the exact-ID author.
        expect(importButton()).toHaveTextContent('Import 15 fields')
        fireEvent.click(within(author(1)).getAllByRole('checkbox')[0])
        fireEvent.click(screen.getByLabelText('also remember AAC-5678-2021 for Petr Dvořák'))
        expect(importButton()).toHaveTextContent('Import 15 fields')
        fireEvent.click(importButton())

        const patch = appliedPatch()
        expect(patch.title).toBe(preview.values?.title)
        expect(patch.mediaTypeCb).toEqual(preview.values?.mediaTypeCb)
        // The volume overwrite was left unchecked: the form keeps its own value.
        expect(patch.volume).toBeUndefined()
        expect(patch.doi).toBeUndefined()
        expect(patch.eliResearchers).toEqual([
            { uid: 'res-novak', firstName: 'Jan', lastName: 'Novák' },
            { uid: 'res-dvorak', firstName: 'Petr', lastName: 'Dvořák' },
        ])
        // The count follows from eliResearchers inside the form, never from the import.
        expect(patch.eliAuthorsCount).toBeUndefined()

        // Remembered IDs are persisted visibly and refresh open researcher lists.
        expect(toast.promise).toHaveBeenCalledTimes(1)
        await waitFor(() =>
            expect(patchResearcherIds).toHaveBeenCalledWith({ researcherIds: ['AAC-5678-2021'] }),
        )
        expect(mockQueryMutate).toHaveBeenCalledWith('researcherIds', 'patch', {
            uid: 'res-dvorak',
        })
        expect(toast.success).toHaveBeenCalledWith('Imported 15 fields from Web of Science.')
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('routes an ISBN into the field the media type actually renders', async () => {
        await openDialog({
            data: { ...preview, values: { ...preview.values, isbn: '978-80-0000-000-1' } },
            currentValues: {
                ...FORM_VALUES,
                mediaTypeCb: { uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS, name: 'D' },
            },
        })
        expect(within(row('isbn')).getByText(/Proceedings ISBN/u)).toBeInTheDocument()

        fireEvent.click(importButton())
        const patch = appliedPatch()
        expect(patch.proceedingsIsbn).toBe('978-80-0000-000-1')
        expect(patch.isbn).toBeUndefined()
    })

    it('blocks Import when a different publication already holds the DOI', async () => {
        // Editing a new record: the DOI belongs to someone else's publication.
        await openDialog({ currentPublicationUid: null })

        expect(screen.getByTestId('wos-import-existing')).toBeInTheDocument()
        expect(importButton()).toBeDisabled()
    })

    it('blocks an unidentified already-existing DOI instead of treating it as a new record', async () => {
        await openDialog({
            data: { ...preview, existingPublication: undefined },
            currentPublicationUid: null,
        })

        expect(importButton()).toBeDisabled()
        fireEvent.click(importButton())
        expect(onApply).not.toHaveBeenCalled()
        expect(patchResearcherIds).not.toHaveBeenCalled()
    })

    it('blocks Import while editing a different publication too', async () => {
        await openDialog({ currentPublicationUid: 'other-publication' })
        expect(importButton()).toBeDisabled()
        fireEvent.click(importButton())
        expect(onApply).not.toHaveBeenCalled()
    })

    it('allows refreshing the record the dialog was opened from', async () => {
        await openDialog({ currentPublicationUid: EXISTING_UID })

        expect(importButton()).toBeEnabled()
    })

    it('disables Import when nothing would change', async () => {
        await openDialog()

        fireEvent.click(screen.getByRole('button', { name: 'None' }))
        fireEvent.click(within(author(0)).getAllByRole('checkbox')[0])
        expect(importButton()).toHaveTextContent('Import 0 fields')
        expect(importButton()).toBeDisabled()
        fireEvent.click(screen.getByRole('button', { name: 'Only empty' }))
        expect(importButton()).toHaveTextContent('Import 14 fields')
        fireEvent.click(screen.getByRole('button', { name: 'All' }))
        // Every importable row: the 14 empty ones plus the volume overwrite.
        expect(importButton()).toHaveTextContent('Import 15 fields')
    })

    it('lets a view-only user review but not import', async () => {
        await openDialog({ canImport: false })

        expect(importButton()).toBeDisabled()
        expect(
            screen.getByText(label(message.publication.wos.importRequiresEdit)),
        ).toBeInTheDocument()
    })

    it('shows a cancellable skeleton while the lookup runs', async () => {
        await openDialog({ data: null })

        expect(screen.getByTestId('wos-import-dialog-loading')).toBeInTheDocument()
        expect(importButton()).toBeDisabled()
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('hands a failed lookup to the opener without touching the form', async () => {
        mockQueryMutate.mockImplementation((endpoint: string) =>
            endpoint === 'wosLookup'
                ? jest.fn(() => Promise.reject({ code: 'WOS_NOT_FOUND' }))
                : patchResearcherIds,
        )
        currentData = null
        renderWithProviders(<Harness />)

        await waitFor(() => expect(onError).toHaveBeenCalledWith({ code: 'WOS_NOT_FOUND' }))
        expect(onApply).not.toHaveBeenCalled()
    })
})
