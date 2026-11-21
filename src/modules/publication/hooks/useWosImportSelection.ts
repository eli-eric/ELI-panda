import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import {
    type PublicationWosFoundPreview,
    type PublicationWosImportField,
    type PublicationWosImportSelection,
    WOS_AUTHORS_PAGE_SIZE,
} from '../types/wos-import'
import {
    buildDefaultWosAuthorSelections,
    buildWosComparisonValues,
    buildWosFieldRows,
    getWosIsbnTargetField,
    type PublicationWosAuthorSelections,
} from '../utils/wos-import'
import { getWosFieldLabelId } from '../utils/wos-presentation'

interface Options {
    preview: PublicationWosFoundPreview
    currentValues: Record<string, unknown>
    onSubmit: (selection: PublicationWosImportSelection) => void | Promise<void>
}

/** Keeps import selections and ISBN destinations consistent while reviewing fields and authors. */
export const useWosImportSelection = ({ preview, currentValues, onSubmit }: Options) => {
    const { formatMessage: fm } = useIntl()
    const initialRows = useMemo(() => {
        const baseRows = buildWosFieldRows(currentValues, preview.values)
        const initiallySelected = baseRows
            .filter(row => row.selectedByDefault)
            .map(row => row.field)
        const comparisonValues = buildWosComparisonValues(
            currentValues,
            preview.values,
            initiallySelected,
        )
        return buildWosFieldRows(comparisonValues, preview.values)
    }, [currentValues, preview.values])
    const [selectedFields, setSelectedFields] = useState<Set<PublicationWosImportField>>(
        () => new Set(initialRows.filter(row => row.selectedByDefault).map(row => row.field)),
    )
    const [authorSelections, setAuthorSelections] = useState<PublicationWosAuthorSelections>(() =>
        buildDefaultWosAuthorSelections(preview.authors),
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showUnchanged, setShowUnchanged] = useState(false)
    const [differencesOnly, setDifferencesOnly] = useState(false)
    const [authorPage, setAuthorPage] = useState(0)
    const selectedFieldList = useMemo(() => Array.from(selectedFields), [selectedFields])
    const isbnTarget = getWosIsbnTargetField(currentValues, preview.values, selectedFieldList)
    const rows = useMemo(
        () =>
            buildWosFieldRows(
                buildWosComparisonValues(currentValues, preview.values, selectedFieldList),
                preview.values,
            ),
        [currentValues, preview.values, selectedFieldList],
    )

    const actionableRows = rows.filter(row => row.status !== 'same')
    const selectedActionableFields = actionableRows
        .filter(row => selectedFields.has(row.field))
        .map(row => row.field)
    const unchangedCount = rows.length - actionableRows.length
    const visibleRows = rows
        .filter(row =>
            differencesOnly ? row.status === 'different' : showUnchanged || row.status !== 'same',
        )
        .sort((a, b) => Number(a.status === 'same') - Number(b.status === 'same'))
    const authorPageCount = Math.ceil(preview.authors.length / WOS_AUTHORS_PAGE_SIZE)
    const visibleAuthors = preview.authors.slice(
        authorPage * WOS_AUTHORS_PAGE_SIZE,
        (authorPage + 1) * WOS_AUTHORS_PAGE_SIZE,
    )

    const fieldLabel = (field: string): string => {
        const id = getWosFieldLabelId(field, isbnTarget)
        return id ? fm({ id }) : field
    }

    const toggleField = (field: PublicationWosImportField, checked: boolean) => {
        setSelectedFields(current => {
            const next = new Set(current)
            if (checked) next.add(field)
            else next.delete(field)
            // A media-type change can move ISBN to a populated destination. Require
            // a fresh choice rather than silently retaining a previously safe selection.
            if (
                field === 'mediaTypeCb' &&
                getWosIsbnTargetField(currentValues, preview.values, Array.from(current)) !==
                    getWosIsbnTargetField(currentValues, preview.values, Array.from(next))
            )
                next.delete('isbn')
            return next
        })
    }

    const selectAllFields = () => {
        const allFields = rows.map(row => row.field)
        const comparison = buildWosComparisonValues(currentValues, preview.values, allFields)
        setSelectedFields(
            new Set(
                buildWosFieldRows(comparison, preview.values)
                    .filter(row => row.status !== 'same')
                    .map(row => row.field),
            ),
        )
    }

    const selectAuthor = (sourceIndex: number, researcherUid: string) => {
        setAuthorSelections(current => {
            const next = { ...current }
            if (researcherUid === 'none') delete next[sourceIndex]
            else next[sourceIndex] = researcherUid
            return next
        })
    }

    const handleSubmit = async () => {
        const authors = preview.authors.flatMap(author => {
            const selectedUid = authorSelections[author.sourceIndex]
            const researcher = author.match.candidates.find(
                candidate => candidate.uid === selectedUid,
            )
            return researcher ? [{ sourceIndex: author.sourceIndex, researcher }] : []
        })

        setIsSubmitting(true)
        try {
            await onSubmit({
                fields: selectedActionableFields,
                authors,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const wosMessages = message.publication.wosImport
    const missingFields = [
        preview.missingImportableFields.length > 0
            ? `${fm({ id: wosMessages.missingTitle })}: ${preview.missingImportableFields.map(fieldLabel).join(', ')}`
            : '',
        preview.unavailableFields.length > 0
            ? `${fm({ id: wosMessages.unavailableTitle })}: ${preview.unavailableFields.map(fieldLabel).join(', ')}`
            : '',
    ]
        .filter(Boolean)
        .join(' · ')

    return {
        isSubmitting,
        handleSubmit,
        missingFields,
        fieldsTableProps: {
            visibleRows,
            selectedFields,
            selectedCount: selectedActionableFields.length,
            actionableCount: actionableRows.length,
            unchangedCount,
            isSubmitting,
            differencesOnly,
            showUnchanged,
            fieldLabel,
            toggleField,
            selectAllFields,
            selectNone: () => setSelectedFields(new Set()),
            toggleDifferencesOnly: () => setDifferencesOnly(value => !value),
            toggleUnchanged: () => setShowUnchanged(value => !value),
        },
        authorMatchesProps: {
            visibleAuthors,
            authorSelections,
            totalAuthors: preview.authors.length,
            authorPage,
            authorPageCount,
            isSubmitting,
            selectAuthor,
            previousPage: () => setAuthorPage(page => page - 1),
            nextPage: () => setAuthorPage(page => page + 1),
        },
    }
}
