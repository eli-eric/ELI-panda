import { useState } from 'react'
import type { FieldValues, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
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
import { getCurrentResearchers, researchersDiffer } from '../utils/wos-import'
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
import { WosImportDialog, WosImportDialogSkeleton } from './wos-import-dialog.comp'

const wosMessages = message.publication.wos
const NO_VALUES: WosImportValues = {}

interface ReviewProps {
    preview: WosLookupResponse
    canImport: boolean
    getValues: UseFormGetValues<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    onClose: () => void
}

const WosImportReview = ({ preview, canImport, getValues, setValue, onClose }: ReviewProps) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()
    const values = preview.values ?? NO_VALUES
    const fieldRows = useWosFieldRows({ values, warnings: preview.warnings, getValues })
    const authors = useWosAuthorSelections(preview.authors)
    const [currentResearchers] = useState(() => getCurrentResearchers(getValues('eliResearchers')))

    // eliResearchers is applied once, as the union of an accepted incoming list
    // and the confirmed authors; eliAuthorsCount follows from the form itself.
    const incomingResearchersRow = fieldRows.changes.find(row => row.field === 'eliResearchers')
    const researchers = mergeWosResearchers(
        incomingResearchersRow
            ? getCurrentResearchers(incomingResearchersRow.incoming)
            : currentResearchers,
        authors.confirmedResearchers,
    )
    const researchersChange = researchersDiffer(currentResearchers, researchers)
    const fieldChanges = fieldRows.changes.filter(row => row.field !== 'eliResearchers')
    const importCount = fieldChanges.length + (researchersChange ? 1 : 0)

    const fieldLabel = (field: string) => {
        const id = WOS_FIELD_LABEL_IDS[field]
        return id ? fm({ id }) : field
    }

    const rememberResearcherId = ({ researcher, researcherId }: WosResearcherIdToRemember) => {
        void queryMutate<unknown, WosResearcherIdsRequest>('researcherIds', 'patch', {
            uid: researcher.uid,
        })({ researcherIds: [researcherId] }).catch(() =>
            toast.error(
                fm(
                    { id: wosMessages.rememberFailed },
                    { researcherId, name: `${researcher.firstName} ${researcher.lastName}` },
                ),
            ),
        )
    }

    const handleImport = () => {
        fieldChanges.forEach(row => setValue(row.field, row.incoming, { shouldDirty: true }))
        if (researchersChange) setValue('eliResearchers', researchers, { shouldDirty: true })
        authors.researcherIdsToRemember.forEach(rememberResearcherId)
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
                title: values.title ?? preview.existingPublication?.title,
                citation: [values.longJournalTitle, values.yearOfPublication, volume]
                    .filter(Boolean)
                    .join(' · '),
                wosUid: preview.wosUid,
                recordUrl: preview.recordUrl,
            }}
            existingPublication={
                preview.status === WOS_PREVIEW_STATUS.ALREADY_EXISTS
                    ? preview.existingPublication
                    : undefined
            }
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
    currentPublicationUid?: string
}

/** Opened as dynamic modal `wos-import`; errors are handled by the opener, which closes it. */
export const WosImportDialogContainer = ({
    doi,
    currentPublicationUid,
    onClose,
    ...props
}: Props) => {
    const { data, isFetching } = useWosLookup(doi, currentPublicationUid)

    if (isFetching || !data) return <WosImportDialogSkeleton onCancel={onClose} />
    return <WosImportReview preview={data} onClose={onClose} {...props} />
}
