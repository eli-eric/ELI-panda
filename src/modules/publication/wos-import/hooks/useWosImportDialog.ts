import { useCallback, useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { normalizeDoi } from '../../utils/doi'
import { resolveWosLookupError } from '../utils/wos-lookup-error'
import { WosImportDialogContainer } from '../wos-import-dialog.cont'
import { markWosNotConfigured, useWosAvailability } from './useWosAvailability'

export const WOS_IMPORT_MODAL_ID = 'wos-import'

const wosMessages = message.publication.wos
const LOOKUP_ROLES = [ROLE.PUBLICATIONS_VIEW, ROLE.PUBLICATIONS_EDIT]

/**
 * Drives the WoS lookup from a publication form: opens the `wos-import` dialog
 * with a form snapshot and an `onApply` callback, so the dialog itself stays
 * form-agnostic, and turns a failed lookup into per-code feedback. The lookup
 * runs inside the dialog; closing it closes the dialog, nothing left to abort
 * server-side (the provider already answered or will anyway).
 */
export const useWosImportDialog = () => {
    const { formatMessage: fm } = useIntl()
    const { control, getValues, setValue, setError, clearErrors } = useFormContext()
    const doi = normalizeDoi(String(useWatch({ control, name: 'doi' }) ?? '')) ?? ''
    const currentPublicationUid = useWatch({ control, name: 'uid' }) as string | undefined
    const canLookup = useAccessControl(LOOKUP_ROLES)()
    const canImport = useAccessControl(ROLE.PUBLICATIONS_EDIT)()
    const isAvailable = useWosAvailability()
    const isOpen = useDynamicModalStore(state => state.modalOrder.includes(WOS_IMPORT_MODAL_ID))
    // Retry lives in a toast created before `open` exists; the ref hands it the
    // latest closure without a declaration cycle.
    const openRef = useRef<() => void>(() => {})
    // Routes lookup failures inside the dialog's lifetime: the dialog closes,
    // the reason appears where the user can act on it.
    const handleError = useCallback(
        (error: unknown) => {
            if (!useDynamicModalStore.getState().modals[WOS_IMPORT_MODAL_ID]) return
            useDynamicModalStore.getState().closeModal(WOS_IMPORT_MODAL_ID)

            const { kind, messageId } = resolveWosLookupError(error)
            const text = fm({ id: messageId })
            switch (kind) {
                case 'invalidDoi':
                    setError('doi', { type: 'manual', message: text })
                    break
                case 'notConfigured':
                    markWosNotConfigured()
                    toast.info(text)
                    break
                case 'upstream':
                    toast.error(text, {
                        action: {
                            label: fm({ id: wosMessages.retry }),
                            onClick: () => openRef.current(),
                        },
                    })
                    break
                case 'notFound':
                case 'rateLimited':
                    toast.error(text)
                    break
            }
        },
        [fm, setError],
    )

    const open = () => {
        if (!doi) return
        clearErrors('doi')
        // Snapshot once at open: the review compares against what the user saw,
        // and applying stays a plain field patch marked dirty.
        const currentValues = getValues() as Record<string, unknown>
        const applyChanges = (patch: Record<string, unknown>) =>
            Object.entries(patch).forEach(([field, value]) =>
                setValue(field, value, { shouldDirty: true }),
            )
        // A cancelled lookup may settle after another dialog with this ID opens.
        const onError = (error: unknown) => {
            if (
                useDynamicModalStore.getState().modals[WOS_IMPORT_MODAL_ID]?.props?.onError !==
                onError
            )
                return
            handleError(error)
        }

        useDynamicModalStore.getState().openModal('dialog', {
            id: WOS_IMPORT_MODAL_ID,
            component: WosImportDialogContainer,
            props: {
                title: fm({ id: wosMessages.dialogTitle }),
                size: 'xl',
                doi,
                currentPublicationUid,
                canImport,
                currentValues,
                onApply: applyChanges,
                onError,
            },
        })
    }

    useEffect(() => {
        openRef.current = open
    })

    return {
        isVisible: isAvailable && canLookup,
        isDisabled: !doi || isOpen,
        isLoading: isOpen,
        label: fm({ id: currentPublicationUid ? wosMessages.refresh : wosMessages.fetch }),
        open,
    }
}
