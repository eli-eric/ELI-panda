import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import type { PublicationWosPreviewResponse } from '../../types/wos-import'
import {
    PublicationWosDuplicateDialog,
    PublicationWosImportDialog,
} from '../publication-wos-import-dialog.comp'

const preview: Extract<PublicationWosPreviewResponse, { status: 'found' }> = {
    status: 'found',
    doi: '10.1234/laser.test',
    values: {
        title: 'Title from Web of Science',
        longJournalTitle: 'Journal from Web of Science',
    },
    authors: [],
    missingImportableFields: ['issn'],
    unavailableFields: ['abstract'],
}

describe('PublicationWosImportDialog', () => {
    it('compares values and submits only the fields selected by the librarian', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <PublicationWosImportDialog
                preview={preview}
                currentValues={{
                    title: 'Title already typed',
                    longJournalTitle: '',
                }}
                onSubmit={onSubmit}
                onClose={jest.fn()}
            />,
        )

        expect(screen.getByText('Title already typed')).toBeInTheDocument()
        expect(screen.getAllByText('Title from Web of Science')).toHaveLength(2)
        expect(screen.getByLabelText('Import Title* (R06)')).not.toBeChecked()
        expect(screen.getByLabelText('Import Long Journal Title (R16)*')).toBeChecked()

        fireEvent.click(screen.getByRole('button', { name: 'Apply selected fields' }))

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith({
                fields: ['longJournalTitle'],
                authors: [],
            }),
        )
    })

    it('preselects ResearcherID matches and requires confirmation for name matches', async () => {
        const onSubmit = jest.fn()
        const authorPreview: Extract<PublicationWosPreviewResponse, { status: 'found' }> = {
            ...preview,
            values: { title: 'Same title' },
            authors: [
                {
                    sourceIndex: 0,
                    displayName: 'Ada Lovelace',
                    researcherId: 'A-1',
                    match: {
                        kind: 'researcher-id',
                        candidates: [{ uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' }],
                    },
                },
                {
                    sourceIndex: 1,
                    displayName: 'Grace Hopper',
                    researcherId: 'G-1',
                    match: {
                        kind: 'name',
                        candidates: [{ uid: 'grace', firstName: 'Grace', lastName: 'Hopper' }],
                    },
                },
            ],
        }

        renderWithProviders(
            <PublicationWosImportDialog
                preview={authorPreview}
                currentValues={{ title: 'Same title' }}
                onSubmit={onSubmit}
                onClose={jest.fn()}
            />,
        )

        expect(screen.getByLabelText('Lovelace, Ada')).toBeChecked()
        expect(screen.getByLabelText('Hopper, Grace')).not.toBeChecked()

        fireEvent.click(screen.getByLabelText('Hopper, Grace'))
        fireEvent.click(screen.getByRole('button', { name: 'Apply selected fields' }))

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith({
                fields: [],
                authors: [
                    {
                        sourceIndex: 0,
                        researcher: { uid: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
                    },
                    {
                        sourceIndex: 1,
                        researcher: { uid: 'grace', firstName: 'Grace', lastName: 'Hopper' },
                    },
                ],
            }),
        )
    })

    it('shows a single proceedings ISBN row for media type D', () => {
        renderWithProviders(
            <PublicationWosImportDialog
                preview={{
                    ...preview,
                    values: {
                        isbn: '978-1-4028-9462-6',
                        mediaTypeCb: {
                            uid: 'media-d',
                            name: 'Conference proceedings',
                            code: 'D',
                        },
                    },
                }}
                currentValues={{
                    mediaTypeCb: {
                        uid: 'media-d',
                        name: 'Conference proceedings',
                        code: 'D',
                    },
                    proceedingsIsbn: '978-0-0000-0000-0',
                }}
                onSubmit={jest.fn()}
                onClose={jest.fn()}
            />,
        )

        expect(screen.getByText('Proceedings ISBN*')).toBeInTheDocument()
        expect(screen.getByText('978-0-0000-0000-0')).toBeInTheDocument()
        expect(screen.queryByText('ISBN*')).not.toBeInTheDocument()
    })
})

describe('PublicationWosDuplicateDialog', () => {
    it('identifies the existing publication and opens it only on request', () => {
        const onOpenExisting = jest.fn()
        renderWithProviders(
            <PublicationWosDuplicateDialog
                preview={{
                    status: 'already-exists',
                    doi: '10.1234/laser.test',
                    existingPublication: {
                        uid: 'publication-1',
                        code: 'PUB-42',
                        title: 'Existing paper',
                        doi: '10.1234/laser.test',
                    },
                }}
                onOpenExisting={onOpenExisting}
                onClose={jest.fn()}
            />,
        )

        expect(screen.getByText('Existing paper')).toBeInTheDocument()
        expect(screen.getByText(/PUB-42.*10\.1234\/laser\.test/u)).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Open existing publication' }))
        expect(onOpenExisting).toHaveBeenCalledTimes(1)
    })
})
