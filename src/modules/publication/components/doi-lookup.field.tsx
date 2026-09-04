import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import type { NormalizedHttpError } from '@/core/http/fetchClient'
import { message } from '@/i18n/src/messages'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { PATH } from '@/types/constants/paths'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { usePublicationWosPreview } from '../hooks/usePublicationWosPreview'
import type {
    PublicationWosImportSelection,
    PublicationWosPreviewResponse,
} from '../types/wos-import'
import { normalizeDoi } from '../utils/doi'
import {
    buildSelectedWosResearchers,
    buildWosFormPatch,
    type PublicationWosAuthorSelections,
} from '../utils/wos-import'
import {
    PublicationWosDuplicateDialog,
    PublicationWosImportDialog,
} from './publication-wos-import-dialog.comp'

const wosMessages = message.publication.wosImport

type FoundPreview = Extract<PublicationWosPreviewResponse, { status: 'found' }>
type DuplicatePreview = Extract<PublicationWosPreviewResponse, { status: 'already-exists' }>

const getErrorMessageId = (error: unknown): string => {
    const { code, status } = error as NormalizedHttpError

    switch (code) {
        case 'INVALID_DOI':
            return wosMessages.errors.invalid
        case 'WOS_RECORD_NOT_FOUND':
            return wosMessages.errors.notFound
        case 'WOS_RECORD_AMBIGUOUS':
            return wosMessages.errors.ambiguous
        case 'WOS_NOT_CONFIGURED':
            return wosMessages.errors.notConfigured
        case 'WOS_AUTHENTICATION_FAILED':
            return wosMessages.errors.authentication
        case 'WOS_RATE_LIMITED':
            return wosMessages.errors.rateLimited
        case 'WOS_UPSTREAM_TIMEOUT':
            return wosMessages.errors.timeout
        case 'WOS_UPSTREAM_ERROR':
            return wosMessages.errors.unavailable
        default:
            if ((error as Error)?.name === 'AbortError') return wosMessages.errors.timeout
            if (status === 502 || status === 503 || status === 504) {
                return wosMessages.errors.unavailable
            }
            return wosMessages.errors.failed
    }
}

const getCurrentResearchers = (value: unknown): SelectedResearcher[] =>
    Array.isArray(value) ? value : []

const researchersDiffer = (
    current: SelectedResearcher[],
    incoming: SelectedResearcher[],
): boolean =>
    current.length !== incoming.length ||
    current.some((researcher, index) => researcher.uid !== incoming[index]?.uid)

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
                description: fm({ id: wosMessages.dialogDescription }),
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
            const errorMessage = fm({ id: getErrorMessageId(error) })
            setError('doi', { type: 'manual', message: errorMessage })
            toast.error(errorMessage)
        }
    }

    return (
        <Input {...doiField} disabled={doiField.disabled || isPending} aria-busy={isPending}>
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={doiField.disabled || isPending}
                    onClick={handleLookup}
                    data-testid="publication-wos-preview-button"
                >
                    {isPending && <LoaderCircle className="animate-spin" aria-hidden="true" />}
                    {fm({
                        id: currentPublicationUid ? wosMessages.refresh : wosMessages.fetch,
                    })}
                </Button>
                <span className="text-xs text-muted-foreground">
                    {fm({ id: isPending ? wosMessages.loading : wosMessages.helper })}
                </span>
            </div>
        </Input>
    )
}
