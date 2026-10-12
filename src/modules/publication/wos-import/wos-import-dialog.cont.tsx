import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import {
    ResearcherModalContent,
    type SelectedResearcher,
} from '@/modules/shared/form/researcherSelect'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { queryMutate } from '@/utils/fetcher'

import { WOS_FIELD_LABEL_IDS, WOS_PREVIEW_STATUS } from '../types/wos-import'
import {
    mergeWosResearchers,
    useWosAuthorSelections,
    type WosResearcherIdToRemember,
} from './hooks/useWosAuthorSelections'
import { useWosFieldRows } from './hooks/useWosFieldRows'
import { useWosLookup } from './hooks/useWosLookup'
import {
    WOS_MATCH_CONFIDENCE,
    type WosImportValues,
    type WosLookupAuthor,
    type WosLookupResponse,
    type WosResearcherIdsRequest,
} from './types/wos-preview.types'
import { getCurrentResearchers, researchersDiffer } from './utils/wos-import'
import { WosImportDialog, WosImportDialogSkeleton } from './wos-import-dialog.comp'

const wosMessages = message.publication.wos
const NO_VALUES: WosImportValues = {}

interface ReviewProps {
    preview: WosLookupResponse
    canImport: boolean
    currentPublicationUid?: string
    /** Form snapshot taken when the dialog opened; the review never re-reads it. */
    currentValues: Record<string, unknown>
    /** Applies the confirmed patch to the form; the dialog itself is form-agnostic. */
    onApply: (patch: Record<string, unknown>) => void
    onClose: () => void
}

const WosImportReview = ({
    preview,
    canImport,
    currentPublicationUid,
    currentValues,
    onApply,
    onClose,
}: ReviewProps) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()
    const queryClient = useQueryClient()
    const values = preview.values ?? NO_VALUES
    const fieldRows = useWosFieldRows({ values, warnings: preview.warnings, currentValues })
    const authors = useWosAuthorSelections(preview.authors)
    const currentResearchers = getCurrentResearchers(currentValues.eliResearchers)

    // eliResearchers is applied once, as the union of the current selection and
    // the confirmed authors; eliAuthorsCount follows from the form itself.
    const researchers = mergeWosResearchers(currentResearchers, authors.confirmedResearchers)
    const researchersChange = researchersDiffer(currentResearchers, researchers)
    const importCount = fieldRows.changes.length + (researchersChange ? 1 : 0)
    const existingPublication =
        preview.status === WOS_PREVIEW_STATUS.ALREADY_EXISTS
            ? preview.existingPublication
            : undefined
    const importBlocked =
        preview.status === WOS_PREVIEW_STATUS.ALREADY_EXISTS &&
        (!existingPublication || existingPublication.uid !== currentPublicationUid)

    const fieldLabel = (field: string) => {
        const id = WOS_FIELD_LABEL_IDS[field === 'isbn' ? fieldRows.isbnTarget : field]
        return id ? fm({ id }) : field
    }

    const persistResearcherIds = async (targets: WosResearcherIdToRemember[]) => {
        await Promise.all(
            targets.map(({ researcher, researcherId }) =>
                queryMutate<unknown, WosResearcherIdsRequest>('researcherIds', 'patch', {
                    uid: researcher.uid,
                })({ researcherIds: [researcherId] }),
            ),
        )
        queryClient.invalidateQueries({ queryKey: ['researchers'] })
    }

    const handleImport = () => {
        if (!canImport || importBlocked || importCount === 0) return
        const patch: Record<string, unknown> = {}
        fieldRows.changes.forEach(row => {
            // ISBN must land in the field the media type actually renders.
            const field = row.field === 'isbn' ? fieldRows.isbnTarget : row.field
            patch[field] = row.incoming
        })
        if (researchersChange) patch.eliResearchers = researchers
        onApply(patch)

        // ResearcherIDs are facts about the researcher register, not about the
        // publication being edited, so they persist at once — visibly, and with
        // the researchers tables invalidated so an open list refreshes.
        const targets = authors.researcherIdsToRemember
        if (targets.length > 0) {
            toast.promise(persistResearcherIds(targets), {
                success: fm({ id: wosMessages.idsSaved }, { count: targets.length }),
                error: fm({ id: wosMessages.idsSaveFailed }),
            })
        }

        toast.success(fm({ id: wosMessages.imported }, { count: importCount }))
        onClose()
    }

    // Stacks above this dialog; the last researcher picked replaces the proposal.
    const openAuthorPicker = (author: WosLookupAuthor) => {
        const current = authors.selections[author.sourceIndex].researcher
        openModal('dialog', {
            id: 'wos-import-researcher',
            component: ResearcherModalContent,
            props: {
                title: fm({ id: wosMessages.chooseTitle }, { author: author.displayName }),
                size: 'xl',
                initialSelected: current ? [current] : [],
                onSelect: (selected: SelectedResearcher[]) => {
                    const picked = selected.at(-1)
                    if (picked) authors.choose(author.sourceIndex, picked)
                },
            },
        })
    }

    const handEntryFields = Array.from(
        new Set([...preview.unavailableFields, ...preview.missingImportableFields]),
    ).filter(field => !fieldRows.rows.some(row => row.field === field))

    const volume =
        values.volume === undefined
            ? ''
            : values.issue === undefined
              ? fm({ id: wosMessages.volume }, { volume: values.volume })
              : fm({ id: wosMessages.volumeIssue }, { volume: values.volume, issue: values.issue })

    return (
        <WosImportDialog
            header={{
                title: values.title ?? existingPublication?.title,
                citation: [values.longJournalTitle, values.yearOfPublication, volume]
                    .filter(Boolean)
                    .join(' · '),
                wosUid: preview.wosUid,
                recordUrl: preview.recordUrl,
            }}
            existingPublication={existingPublication}
            // Refreshing one's own record is allowed; an unidentified duplicate is not.
            importBlocked={importBlocked}
            fieldLabel={fieldLabel}
            fieldRows={fieldRows.rows}
            selectedFields={fieldRows.selected}
            onToggleField={fieldRows.toggle}
            onSelectAll={fieldRows.selectAll}
            onSelectOnlyEmpty={fieldRows.selectOnlyEmpty}
            onSelectNone={fieldRows.selectNone}
            authors={preview.authors}
            authorSelections={authors.selections}
            matchedAuthorCount={
                preview.authors.filter(
                    author => author.match.confidence !== WOS_MATCH_CONFIDENCE.NONE,
                ).length
            }
            onToggleAuthor={authors.toggle}
            onChooseAuthor={authors.choose}
            onOpenAuthorPicker={openAuthorPicker}
            onToggleRemember={authors.toggleRemember}
            handEntryFields={handEntryFields}
            importCount={importCount}
            canImport={canImport}
            onImport={handleImport}
            onCancel={onClose}
        />
    )
}

interface Props extends Omit<ReviewProps, 'preview'> {
    doi: string
    onError: (error: unknown) => void
}

/**
 * Opened as dynamic modal `wos-import`. The lookup runs on open (it spends
 * provider quota, never on render); a failure is routed by the opener, which
 * closes this dialog and shows the per-code feedback.
 */
export const WosImportDialogContainer = ({
    doi,
    currentPublicationUid,
    onClose,
    onError,
    ...props
}: Props) => {
    const lookup = useWosLookup({ doi, currentPublicationUid })

    useEffect(() => {
        void lookup.mutate()
        // One lookup per dialog open; the dialog lifetime is the effect lifetime.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { isError, error } = lookup
    useEffect(() => {
        if (isError && error) onError(error)
    }, [isError, error, onError])

    if (lookup.isPending || !lookup.data) return <WosImportDialogSkeleton onCancel={onClose} />
    return (
        <WosImportReview
            preview={lookup.data}
            currentPublicationUid={currentPublicationUid}
            onClose={onClose}
            {...props}
        />
    )
}
