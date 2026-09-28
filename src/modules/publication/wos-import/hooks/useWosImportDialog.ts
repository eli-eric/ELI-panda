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
import { useWosLookup } from './useWosLookup'

export const WOS_IMPORT_MODAL_ID = 'wos-import'

const wosMessages = message.publication.wos
const LOOKUP_ROLES = [ROLE.PUBLICATIONS_VIEW, ROLE.PUBLICATIONS_EDIT]

/**
 * Drives the WoS lookup from the publication form: opens the `wos-import`
 * dialog at once (skeleton while loading, cancel aborts the request) and turns
 * a failed lookup into the per-code feedback, closing the dialog.
 */
export const useWosImportDialog = () => {
    const { formatMessage: fm } = useIntl()
    const { control, getValues, setValue, setError, clearErrors } = useFormContext()
    const doi = normalizeDoi(String(useWatch({ control, name: 'doi' }) ?? '')) ?? ''
    const currentPublicationUid = useWatch({ control, name: 'uid' }) as string | undefined
    const canLookup = useAccessControl(LOOKUP_ROLES)()
    const canImport = useAccessControl(ROLE.PUBLICATIONS_EDIT)()
    const isAvailable = useWosAvailability()
    const { openModal, closeModal, getModalById } = useDynamicModalStore()
    const { isFetching, lookup, cancel } = useWosLookup(doi, currentPublicationUid)

    const open = async () => {
        if (!doi) return
        clearErrors('doi')
        openModal('dialog', {
            id: WOS_IMPORT_MODAL_ID,
            component: WosImportDialogContainer,
            props: {
                title: fm({ id: wosMessages.dialogTitle }),
                size: 'xl',
                doi,
                currentPublicationUid,
                canImport,
                getValues,
                setValue,
            },
            onClose: cancel,
        })

        const { error } = await lookup()
        // A cancelled lookup resolves without an error; a closed dialog wants no toast.
        if (!error || !getModalById(WOS_IMPORT_MODAL_ID)) return
        closeModal(WOS_IMPORT_MODAL_ID)

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
                    action: { label: fm({ id: wosMessages.retry }), onClick: () => void open() },
                })
                break
            case 'notFound':
            case 'rateLimited':
                toast.error(text)
                break
        }
    }

    return {
        isVisible: isAvailable && canLookup,
        isDisabled: !doi || isFetching,
        isLoading: isFetching,
        label: fm({ id: currentPublicationUid ? wosMessages.refresh : wosMessages.fetch }),
        open,
    }
}
