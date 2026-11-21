import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { PATH } from '@/types/constants/paths'

import { PublicationWosDuplicateDialog } from '../components/publication-wos-duplicate-dialog.comp'
import { PublicationWosImportDialog } from '../components/publication-wos-import-dialog.comp'
import {
    type PublicationWosDuplicatePreview,
    type PublicationWosFoundPreview,
    type PublicationWosImportSelection,
    WOS_PREVIEW_STATUS,
} from '../types/wos-import'
import { normalizeDoi } from '../utils/doi'
import { getWosErrorMessageId, isWosInvalidDoiError } from '../utils/wos-errors'
import {
    buildSelectedWosResearchers,
    buildWosFormPatch,
    getCurrentResearchers,
    type PublicationWosAuthorSelections,
    researchersDiffer,
} from '../utils/wos-import'
import { getWosPreviewDescription } from '../utils/wos-presentation'
import { usePublicationWosPreview } from './usePublicationWosPreview'

const wosMessages = message.publication.wosImport

/** Looks up a DOI and applies only the import choices confirmed in the review dialog. */
export const useWosLookup = () => {
    const router = useRouter()
    const { formatMessage: fm } = useIntl()
    const { clearErrors, getValues, setError, setValue } = useFormContext()
    const { fetchPreview, isPending } = usePublicationWosPreview()
    const { openModal, closeModal } = useDynamicModalStore()

    const currentPublicationUid = getValues('uid') as string | undefined
    const modalId = `publication-wos-preview-${currentPublicationUid ?? 'new'}`

    const applyPreview = (
        preview: PublicationWosFoundPreview,
        selection: PublicationWosImportSelection,
    ) => {
        const patch = buildWosFormPatch(getValues(), preview.values, selection.fields)
        Object.entries(patch).forEach(([field, value]) => {
            setValue(field, value, { shouldDirty: true, shouldValidate: true })
        })

        const currentResearchers = getCurrentResearchers(getValues('eliResearchers'))
        const authorSelections: PublicationWosAuthorSelections = Object.fromEntries(
            selection.authors.map(author => [author.sourceIndex, author.researcher.uid]),
        )
        const selectedResearchers = buildSelectedWosResearchers(
            currentResearchers,
            preview.authors,
            authorSelections,
        )

        if (researchersDiffer(currentResearchers, selectedResearchers)) {
            setValue('eliResearchers', selectedResearchers, {
                shouldDirty: true,
                shouldValidate: true,
            })
            setValue('eliAuthorsCount', selectedResearchers.length, {
                shouldDirty: true,
                shouldValidate: true,
            })
        }

        closeModal(modalId)
        toast.success(fm({ id: wosMessages.applied }))
    }

    const openImportPreview = (preview: PublicationWosFoundPreview) => {
        openModal('dialog', {
            id: modalId,
            component: PublicationWosImportDialog,
            props: {
                title: fm({ id: wosMessages.dialogTitle }),
                description: getWosPreviewDescription(
                    preview.values,
                    preview.doi,
                    fm({ id: wosMessages.dialogDescription }),
                ),
                size: 'xl',
                preview,
                currentValues: getValues(),
            },
            onSubmit: (selection: PublicationWosImportSelection) =>
                applyPreview(preview, selection),
        })
    }

    const openDuplicatePreview = (preview: PublicationWosDuplicatePreview) => {
        openModal('dialog', {
            id: modalId,
            component: PublicationWosDuplicateDialog,
            props: {
                title: fm({ id: wosMessages.duplicate.title }),
                size: 'm',
                preview,
                onOpenExisting: async () => {
                    closeModal(modalId)
                    await router.push(`${PATH.PUBLICATION}/${preview.existingPublication.uid}`)
                },
            },
        })
    }

    const handleLookup = async () => {
        const doi = normalizeDoi(String(getValues('doi') ?? ''))
        if (!doi) {
            const errorMessage = fm({ id: wosMessages.errors.invalid })
            setError('doi', { type: 'manual', message: errorMessage })
            toast.error(errorMessage)
            return
        }

        clearErrors('doi')

        try {
            const preview = await fetchPreview({ doi, currentPublicationUid })
            if (preview.status === WOS_PREVIEW_STATUS.ALREADY_EXISTS) openDuplicatePreview(preview)
            else openImportPreview(preview)
        } catch (error) {
            // Syntax failures need a DOI field error as well as a toast.
            const errorMessage = fm({ id: getWosErrorMessageId(error) })
            if (isWosInvalidDoiError(error))
                setError('doi', { type: 'manual', message: errorMessage })
            toast.error(errorMessage)
        }
    }

    return { currentPublicationUid, isPending, handleLookup }
}
