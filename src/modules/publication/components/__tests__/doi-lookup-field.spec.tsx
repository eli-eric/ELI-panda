import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { usePublicationFields } from '../../hooks/usePublicationFields'
import { usePublicationWosPreview } from '../../hooks/usePublicationWosPreview'
import { useRememberResearcherId } from '../../hooks/useRememberResearcherId'
import type { PublicationWosPreviewResponse } from '../../types/wos-import'
import { DoiLookupField } from '../doi-lookup.field'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../hooks/usePublicationWosPreview', () => ({ usePublicationWosPreview: jest.fn() }))
jest.mock('../../hooks/useRememberResearcherId', () => ({ useRememberResearcherId: jest.fn() }))
jest.mock('../../hooks/usePublicationFields', () => ({ usePublicationFields: jest.fn() }))
jest.mock('@/store/useDynamicModalStore', () => ({ useDynamicModalStore: jest.fn() }))
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}))

const mockUseRouter = useRouter as jest.Mock
const mockUsePublicationWosPreview = usePublicationWosPreview as jest.Mock
const mockUseRememberResearcherId = useRememberResearcherId as jest.Mock
const mockUsePublicationFields = usePublicationFields as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockToastError = toast.error as unknown as jest.Mock
const mockToastSuccess = toast.success as unknown as jest.Mock

const fetchPreview = jest.fn()
const rememberResearcherId = jest.fn()
const openModal = jest.fn()
const closeModal = jest.fn()
const push = jest.fn()

const foundPreview: Extract<PublicationWosPreviewResponse, { status: 'found' }> = {
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
}

const FormValues = () => {
    const { control } = useFormContext()
    const values = useWatch({ control })

    return <output data-testid="form-values">{JSON.stringify(values)}</output>
}

const TestForm = ({ onSubmit = jest.fn() }: { onSubmit?: jest.Mock }) => (
    <form
        onSubmit={event => {
            event.preventDefault()
            onSubmit()
        }}
    >
        <DoiLookupField />
        <FormValues />
    </form>
)

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
    mockUsePublicationWosPreview.mockReturnValue({ fetchPreview, isPending: false })
    mockUseRememberResearcherId.mockReturnValue({ rememberResearcherId, isPending: false })
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
    rememberResearcherId.mockResolvedValue(undefined)
})

describe('DoiLookupField', () => {
    it('uses an explicit button and disables the field while a preview is pending', () => {
        mockUsePublicationWosPreview.mockReturnValue({ fetchPreview, isPending: true })

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
        fetchPreview.mockResolvedValue(foundPreview)

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
            expect(fetchPreview).toHaveBeenCalledWith({
                doi: '10.1234/laser.test',
                currentPublicationUid: 'publication-1',
            }),
        )
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({
                id: 'publication-wos-preview-publication-1',
                props: expect.objectContaining({
                    preview: foundPreview,
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
                researcherIdLinks: [{ researcherUid: 'ada', researcherId: 'A-0001-2020' }],
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
        expect(rememberResearcherId).toHaveBeenCalledWith({
            researcherUid: 'ada',
            researcherId: 'A-0001-2020',
        })
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
        expect(fetchPreview).not.toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
        expect(mockToastError).toHaveBeenCalledWith(
            'Enter a valid DOI before fetching from Web of Science.',
        )
    })

    it('offers to open the existing publication when the DOI is already registered', async () => {
        fetchPreview.mockResolvedValue({
            status: 'already-exists',
            doi: '10.1234/laser.test',
            existingPublication: {
                uid: 'existing-publication',
                code: 'PUB-42',
                title: 'Existing publication',
                doi: '10.1234/laser.test',
            },
        } satisfies PublicationWosPreviewResponse)

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
        fetchPreview.mockRejectedValue(
            Object.assign(new Error('upstream failed'), {
                status: 503,
                code: 'WOS_RATE_LIMITED',
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
