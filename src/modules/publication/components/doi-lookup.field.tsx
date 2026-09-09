import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { PATH } from '@/types/constants/paths'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { usePublicationWosPreview } from '../hooks/usePublicationWosPreview'
import type {
    PublicationWosImportSelection,
    PublicationWosPreviewResponse,
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
import {
    PublicationWosDuplicateDialog,
    PublicationWosImportDialog,
} from './publication-wos-import-dialog.comp'

const wosMessages = message.publication.wosImport

type FoundPreview = Extract<PublicationWosPreviewResponse, { status: 'found' }>
type DuplicatePreview = Extract<PublicationWosPreviewResponse, { status: 'already-exists' }>

export const DoiLookupField = () => {
    const router = useRouter()
    const { formatMessage: fm } = useIntl()
    const { doi: doiField } = usePublicationFields()
    const { clearErrors, getValues, setError, setValue } = useFormContext()
    const { fetchPreview, isPending } = usePublicationWosPreview()
    const { openModal, closeModal } = useDynamicModalStore()

    const currentPublicationUid = getValues('uid') as string | undefined
    const modalId = `publication-wos-preview-${currentPublicationUid ?? 'new'}`

    const applyPreview = (preview: FoundPreview, selection: PublicationWosImportSelection) => {
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

    const openImportPreview = (preview: FoundPreview) => {
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

    const openDuplicatePreview = (preview: DuplicatePreview) => {
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
            if (preview.status === 'already-exists') openDuplicatePreview(preview)
            else openImportPreview(preview)
        } catch (error) {
            const errorMessage = fm({ id: getWosErrorMessageId(error) })
            if (isWosInvalidDoiError(error))
                setError('doi', { type: 'manual', message: errorMessage })
            toast.error(errorMessage)
        }
    }

    return (
        <div className="space-y-2">
            <Input {...doiField} disabled={doiField.disabled || isPending} aria-busy={isPending} />
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={doiField.disabled || isPending}
                    onClick={handleLookup}
                    data-testid="publication-wos-preview-button"
                >
                    {isPending && (
                        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    )}
                    {fm({
                        id: currentPublicationUid ? wosMessages.refresh : wosMessages.fetch,
                    })}
                </Button>
                <span className="text-xs text-muted-foreground">
                    {fm({ id: isPending ? wosMessages.loading : wosMessages.helper })}
                </span>
            </div>
        </div>
    )
}
