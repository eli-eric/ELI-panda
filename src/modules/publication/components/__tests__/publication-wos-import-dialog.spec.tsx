import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { MEDIA_TYPE_UID } from '../../types/constants'
import type { PublicationWosPreviewResponse } from '../../types/wos-import'
import { PublicationWosDuplicateDialog } from '../publication-wos-duplicate-dialog.comp'
import { PublicationWosImportDialog } from '../publication-wos-import-dialog.comp'

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
        expect(screen.getAllByText('Title from Web of Science')).toHaveLength(1)
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
                            uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS,
                            name: 'Conference proceedings',
                        },
                    },
                }}
                currentValues={{
                    mediaTypeCb: {
                        uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS,
                        name: 'Conference proceedings',
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

describe('import review controls', () => {
    it('distinguishes replacements, collapses unchanged fields, and supports bulk selection and filtering', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <PublicationWosImportDialog
                preview={{
                    ...preview,
                    values: { title: 'Incoming', longJournalTitle: 'Journal', issue: 1 },
                }}
                currentValues={{ title: 'Current', longJournalTitle: '', issue: 1 }}
                onSubmit={onSubmit}
                onClose={jest.fn()}
            />,
        )
        expect(screen.getByText('Replaces current value')).toBeInTheDocument()
        expect(screen.getByText('1 of 2 fields selected')).toBeInTheDocument()
        expect(screen.queryByText('Already up to date')).not.toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: '1 unchanged fields' }))
        expect(screen.getByText('Already up to date')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Select all fields' }))
        expect(screen.getByText('2 of 2 fields selected')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Show differing fields only' }))
        expect(screen.getByText('Incoming')).toBeInTheDocument()
        expect(screen.queryByText('Journal')).not.toBeInTheDocument()
        expect(screen.queryByText('Already up to date')).not.toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Select none' }))
        expect(screen.getByText('0 of 2 fields selected')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Apply selected fields' }))
        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ fields: [], authors: [] }))
    })
    it('does not render empty alerts or duplicate the record title', () => {
        renderWithProviders(
            <PublicationWosImportDialog
                preview={{ ...preview, missingImportableFields: [], unavailableFields: [] }}
                currentValues={{}}
                onSubmit={jest.fn()}
                onClose={jest.fn()}
            />,
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(screen.getAllByText('Title from Web of Science')).toHaveLength(1)
    })
    it('preserves author choices across pages in a 500-author record', async () => {
        const authors = Array.from({ length: 500 }, (_, index) => ({
            sourceIndex: index,
            displayName: `Author ${index}`,
            match: {
                kind: 'name' as const,
                candidates: [
                    { uid: `r-${index}`, firstName: String(index), lastName: 'Researcher' },
                ],
            },
        }))
        const onSubmit = jest.fn()
        renderWithProviders(
            <PublicationWosImportDialog
                preview={{ ...preview, authors, values: {} }}
                currentValues={{}}
                onSubmit={onSubmit}
                onClose={jest.fn()}
            />,
        )
        expect(screen.getAllByRole('radiogroup')).toHaveLength(20)
        expect(screen.getByText('Page 1 of 25 · 500 authors')).toBeInTheDocument()
        fireEvent.click(screen.getByLabelText('Researcher, 0'))
        fireEvent.click(screen.getByRole('button', { name: 'Next authors' }))
        expect(screen.queryByLabelText('Researcher, 0')).not.toBeInTheDocument()
        fireEvent.click(screen.getByLabelText('Researcher, 20'))
        fireEvent.click(screen.getByRole('button', { name: 'Previous authors' }))
        expect(screen.getByLabelText('Researcher, 0')).toBeChecked()
        fireEvent.click(screen.getByRole('button', { name: 'Apply selected fields' }))
        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith({
                fields: [],
                authors: [
                    { sourceIndex: 0, researcher: authors[0].match.candidates[0] },
                    { sourceIndex: 20, researcher: authors[20].match.candidates[0] },
                ],
            }),
        )
    })
    it('requires a new ISBN choice when media type changes its destination', async () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <PublicationWosImportDialog
                preview={{
                    ...preview,
                    values: {
                        isbn: 'Incoming ISBN',
                        mediaTypeCb: {
                            uid: MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS,
                            name: 'Conference proceedings',
                        },
                    },
                }}
                currentValues={{
                    mediaTypeCb: { uid: MEDIA_TYPE_UID.BOOK_CHAPTER, name: 'Book chapter' },
                    isbn: '',
                    proceedingsIsbn: 'Existing proceedings ISBN',
                }}
                onSubmit={onSubmit}
                onClose={jest.fn()}
            />,
        )
        expect(screen.getByLabelText('Import ISBN*')).toBeChecked()
        fireEvent.click(screen.getByLabelText('Import Media Type*'))
        expect(screen.getByLabelText('Import Proceedings ISBN*')).not.toBeChecked()
        expect(screen.getByText('Existing proceedings ISBN')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Apply selected fields' }))
        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith({ fields: ['mediaTypeCb'], authors: [] }),
        )
    })
})
