import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { publicationResolver } from '../../form/resolver'
import { usePublicationEnrichmentPreview } from '../../hooks/usePublicationEnrichmentPreview'
import { usePublicationFields } from '../../hooks/usePublicationFields'
import type { EnrichmentPreviewResponse } from '../../types/enrichment'
import { WOS_ERROR_CODES } from '../../types/wos-import'
import { DoiLookupField } from '../doi-lookup.field'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../hooks/usePublicationEnrichmentPreview', () => ({
    usePublicationEnrichmentPreview: jest.fn(),
}))
jest.mock('../../hooks/usePublicationFields', () => ({ usePublicationFields: jest.fn() }))
jest.mock('@/store/useDynamicModalStore', () => ({ useDynamicModalStore: jest.fn() }))
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}))

const mockUseRouter = useRouter as jest.Mock
const mockUsePublicationEnrichmentPreview = usePublicationEnrichmentPreview as jest.Mock
const mockUsePublicationFields = usePublicationFields as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockToastError = toast.error as unknown as jest.Mock
const mockToastSuccess = toast.success as unknown as jest.Mock

const fetchEnrichmentPreview = jest.fn()
const openModal = jest.fn()
const closeModal = jest.fn()
const push = jest.fn()

const foundPreview: EnrichmentPreviewResponse = {
    status: 'found',
    doi: '10.1234/laser.test',
    values: {
        doi: '10.1234/laser.test',
        title: 'Title returned by Web of Science',
        longJournalTitle: 'Journal of Deterministic Tests',
    },
    authors: [
        {
            sourceIndex: 0,
            displayName: 'Ada Lovelace',
            researcherId: 'A-0001-2020',
            match: {
                kind: 'researcher-id',
                candidates: [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
            },
        },
    ],
    missingImportableFields: ['issn'],
    unavailableFields: ['abstract'],
    // One provider answered and one is not configured, which the dialog reports
    // so a blank field is distinguishable from an unconsulted source.
    sources: [
        { provider: 'crossref', status: 'ok', retryable: false },
        { provider: 'wos-starter', status: 'not-configured', retryable: false },
        { provider: 'unpaywall', status: 'not-configured', retryable: false },
    ],
    provenance: { title: { provider: 'crossref', retrievedAt: '2026-01-01T00:00:00Z' } },
    conflicts: [],
    authorRolesStatus: 'unknown',
    affiliationStatus: 'unknown',
}

const FormValues = () => {
    const { control } = useFormContext()
    const values = useWatch({ control })

    return <output data-testid="form-values">{JSON.stringify(values)}</output>
}

const saveLabel = 'Save'

const TestForm = ({ onSubmit = jest.fn() }: { onSubmit?: jest.Mock }) => {
    const { handleSubmit } = useFormContext()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DoiLookupField />
            <FormValues />
            <button type="submit">{saveLabel}</button>
        </form>
    )
}

const getFormValues = (): Record<string, unknown> =>
    JSON.parse(screen.getByTestId('form-values').textContent ?? '{}')

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ push })
    mockUsePublicationFields.mockReturnValue({
        doi: {
            name: 'doi',
            label: 'DOI',
            disabled: false,
            'data-testid': 'doi',
        },
    })
    mockUsePublicationEnrichmentPreview.mockReturnValue({
        fetchEnrichmentPreview,
        isPending: false,
    })
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
})

describe('DoiLookupField', () => {
    it('uses an explicit button and disables the field while a preview is pending', () => {
        mockUsePublicationEnrichmentPreview.mockReturnValue({
            fetchEnrichmentPreview,
            isPending: true,
        })

        renderWithProviders(<TestForm />, {
            withForm: true,
            formProps: { defaultValues: { doi: '10.1234/laser.test' } },
        })

        expect(screen.getByTestId('doi')).toBeDisabled()
        expect(screen.getByTestId('doi')).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByRole('button', { name: 'Fetch from Web of Science' })).toBeDisabled()
    })

    it('opens a review and applies only the confirmed selection without submitting', async () => {
        const onSubmit = jest.fn()
        fetchEnrichmentPreview.mockResolvedValue(foundPreview)

        renderWithProviders(<TestForm onSubmit={onSubmit} />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    uid: 'publication-1',
                    doi: 'https://doi.org/10.1234/LASER.TEST',
                    title: 'Title entered by the librarian',
                    longJournalTitle: '',
                    eliResearchers: [
                        { uid: 'existing', firstName: 'Existing', lastName: 'Researcher' },
                    ],
                    eliAuthorsCount: 1,
                },
            },
        })

        fireEvent.click(screen.getByRole('button', { name: 'Refresh from Web of Science' }))

        await waitFor(() =>
            expect(fetchEnrichmentPreview).toHaveBeenCalledWith({
                doi: '10.1234/laser.test',
                currentPublicationUid: 'publication-1',
            }),
        )
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({
                id: 'publication-wos-preview-publication-1',
                props: expect.objectContaining({
                    // The dialog receives the importable subset; the per-provider
                    // outcome travels beside it rather than inside the preview.
                    preview: expect.objectContaining({
                        status: 'found',
                        doi: foundPreview.doi,
                        values: foundPreview.values,
                        authors: foundPreview.authors,
                    }),
                    sources: foundPreview.sources,
                    conflicts: [],
                    description: expect.stringContaining(foundPreview.values!.title!),
                    currentValues: expect.objectContaining({
                        title: 'Title entered by the librarian',
                    }),
                }),
            }),
        )
        expect(getFormValues()).toEqual(
            expect.objectContaining({
                title: 'Title entered by the librarian',
                longJournalTitle: '',
            }),
        )

        const modalConfig = openModal.mock.calls[0][1]
        await act(async () => {
            await modalConfig.onSubmit({
                fields: ['longJournalTitle'],
                authors: [
                    {
                        sourceIndex: 0,
                        researcher: { uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
                    },
                ],
            })
        })

        expect(getFormValues()).toEqual(
            expect.objectContaining({
                doi: 'https://doi.org/10.1234/LASER.TEST',
                title: 'Title entered by the librarian',
                longJournalTitle: 'Journal of Deterministic Tests',
                eliResearchers: [
                    { uid: 'existing', firstName: 'Existing', lastName: 'Researcher' },
                    { uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
                ],
                eliAuthorsCount: 2,
            }),
        )
        expect(closeModal).toHaveBeenCalledWith('publication-wos-preview-publication-1')
        expect(mockToastSuccess).toHaveBeenCalledWith(
            'Selected Web of Science values were applied to the form.',
        )
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('rejects invalid input without calling the preview endpoint', async () => {
        renderWithProviders(<TestForm />, {
            withForm: true,
            formProps: { defaultValues: { doi: 'not a DOI' } },
        })

        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))

        await waitFor(() =>
            expect(screen.getByTestId('doi')).toHaveAttribute('aria-invalid', 'true'),
        )
        expect(fetchEnrichmentPreview).not.toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
        expect(mockToastError).toHaveBeenCalledWith(
            'Enter a valid DOI before fetching from Web of Science.',
        )
    })

    it('saves a legacy DOI after a failed preview without changing the stored value', async () => {
        const onSubmit = jest.fn()
        const codebook = { uid: 'other', name: 'Other' }
        const values = {
            code: 'PUB-001',
            doi: 'legacy DOI with spaces ',
            title: 'An unrelated title edit',
            allAuthors: 'Ada Lovelace',
            allAuthorsCount: 1,
            eliResearchers: [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
            eliAuthorsCount: 1,
            longJournalTitle: 'Journal of Testing',
            pages: '1-10',
            pagesCount: 10,
            citeAs: 'Lovelace (2024)',
            yearOfPublication: '2024',
            dateOfPublication: '2024-01-01',
            abstract: 'Abstract',
            keywords: 'test',
            openAccessType: codebook,
            publishingCountry: codebook,
            mediaTypeCb: codebook,
        }
        renderWithProviders(<TestForm onSubmit={onSubmit} />, {
            withForm: true,
            formProps: { defaultValues: values, resolver: publicationResolver },
        })

        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))
        await waitFor(() =>
            expect(screen.getByTestId('doi')).toHaveAttribute('aria-invalid', 'true'),
        )
        expect(fetchEnrichmentPreview).not.toHaveBeenCalled()
        fireEvent.click(screen.getByRole('button', { name: saveLabel }))
        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
        expect(onSubmit.mock.calls[0][0]).toMatchObject({ doi: values.doi, title: values.title })
        expect(screen.getByTestId('doi')).not.toHaveAttribute('aria-invalid', 'true')
    })

    it('offers to open the existing publication when the DOI is already registered', async () => {
        fetchEnrichmentPreview.mockResolvedValue({
            status: 'already-exists',
            doi: '10.1234/laser.test',
            existingPublication: {
                uid: 'existing-publication',
                code: 'PUB-42',
                title: 'Existing publication',
                doi: '10.1234/laser.test',
            },
            authors: [],
            missingImportableFields: [],
            unavailableFields: [],
            sources: [
                { provider: 'crossref', status: 'skipped', retryable: false },
                { provider: 'wos-starter', status: 'skipped', retryable: false },
                { provider: 'unpaywall', status: 'skipped', retryable: false },
            ],
            provenance: {},
            conflicts: [],
            authorRolesStatus: 'unknown',
            affiliationStatus: 'unknown',
        } satisfies EnrichmentPreviewResponse)

        renderWithProviders(<TestForm />, {
            withForm: true,
            formProps: { defaultValues: { doi: '10.1234/laser.test' } },
        })

        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))
        await waitFor(() => expect(openModal).toHaveBeenCalledTimes(1))

        const modalConfig = openModal.mock.calls[0][1]
        await act(async () => modalConfig.props.onOpenExisting())

        expect(closeModal).toHaveBeenCalledWith('publication-wos-preview-new')
        expect(push).toHaveBeenCalledWith('/publication/existing-publication')
    })

    it('maps typed API failures to a clear message without changing the form', async () => {
        fetchEnrichmentPreview.mockRejectedValue(
            Object.assign(new Error('upstream failed'), {
                status: 503,
                code: WOS_ERROR_CODES.WOS_RATE_LIMITED,
            }),
        )
        const initialValues = { doi: '10.1234/laser.test', title: '' }

        renderWithProviders(<TestForm />, {
            withForm: true,
            formProps: { defaultValues: initialValues },
        })

        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))

        await waitFor(() =>
            expect(mockToastError).toHaveBeenCalledWith(
                'The Web of Science lookup limit has been reached. Please try again later.',
            ),
        )
        expect(getFormValues()).toEqual(initialValues)
        expect(openModal).not.toHaveBeenCalled()
    })
})

describe('lookup error field state', () => {
    it.each([
        ...Object.values(WOS_ERROR_CODES)
            .filter(code => code !== WOS_ERROR_CODES.DOI_INVALID)
            .map(code => ({ code })),
        null,
        undefined,
        { name: 'AbortError' },
    ])('shows a toast without invalidating the DOI for %p', async error => {
        fetchEnrichmentPreview.mockRejectedValue(error)
        const values = { doi: '10.1234/laser.test', title: 'Existing title' }
        renderWithProviders(<TestForm />, { withForm: true, formProps: { defaultValues: values } })
        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))
        await waitFor(() => expect(mockToastError).toHaveBeenCalledTimes(1))
        expect(screen.getByTestId('doi')).not.toHaveAttribute('aria-invalid', 'true')
        expect(getFormValues()).toEqual(values)
        expect(openModal).not.toHaveBeenCalled()
    })
    it('marks DOI invalid only when the server rejects its syntax', async () => {
        fetchEnrichmentPreview.mockRejectedValue({ code: WOS_ERROR_CODES.DOI_INVALID })
        renderWithProviders(<TestForm />, {
            withForm: true,
            formProps: { defaultValues: { doi: '10.1234/laser.test' } },
        })
        fireEvent.click(screen.getByRole('button', { name: 'Fetch from Web of Science' }))
        await waitFor(() =>
            expect(screen.getByTestId('doi')).toHaveAttribute('aria-invalid', 'true'),
        )
    })
})
