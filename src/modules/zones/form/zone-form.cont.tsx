import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'
import { getErrorMessageText, isBadRequestError } from '@/types/http'
import { queryFetcher } from '@/utils/fetcher'

import { useZoneMutation } from '../hooks/useZoneMutation'
import type { Zone, ZoneRequest, ZonesResponse } from '../types/zone.types'
import { ZoneFormFields } from './zone-form.comp'
import { type ZoneFormData, zoneSchema } from './zone-form.schema'

interface Props {
    zone?: Zone
    onSuccess?: () => void
}

const getModalId = (uid?: string) => (uid ? `zone-edit-${uid}` : 'zone-create')

const isInvalidDefaultParentSystem = (error: unknown) =>
    isBadRequestError(error) &&
    getErrorMessageText(error).toLowerCase().includes('default parent system not found')

export const ZoneFormContainer: FC<Props> = ({ zone, onSuccess }) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.zonesPage.form
    const { closeModal } = useDynamicModalStore()
    const { setIsDirty, reset: resetModalFormState } = useModalFormStateStore()

    const { data: allZones } = useQuery({
        queryKey: ['zones', { query: { pageSize: 200 } }],
        queryFn: queryFetcher<ZonesResponse>('zones'),
    })

    const defaultValues: ZoneFormData = {
        name: zone?.name ?? '',
        code: zone?.code ?? '',
        parentUid: zone?.parentZone?.uid ?? null,
        defaultParentSystem: zone?.defaultParentSystem ?? null,
        notes: zone?.notes ?? '',
    }

    const formMethods = useForm<ZoneFormData>({
        resolver: zodResolver(zoneSchema),
        defaultValues,
        mode: 'onSubmit',
    })

    const { isDirty } = formMethods.formState

    useEffect(() => {
        setIsDirty(isDirty)
        return resetModalFormState
    }, [isDirty, setIsDirty, resetModalFormState])

    const { withDirtyProtection } = useFormDirtyProtection(formMethods)

    const { mutateAsync, isPending } = useZoneMutation({
        uid: zone?.uid,
    })

    const handleSubmit = formMethods.handleSubmit(async data => {
        // Relationship fields are tri-state on the API: null leaves the link untouched,
        // so "nothing selected" has to be sent as '' or the old value survives.
        const payload: ZoneRequest = {
            name: data.name,
            code: data.code,
            notes: data.notes ?? '',
            parentUid: data.parentUid ?? '',
            defaultParentSystemUid: data.defaultParentSystem?.uid ?? '',
        }

        toast.promise(mutateAsync(payload), {
            loading: fm({ id: zone ? labels.saving : labels.creating }),
            success: () => {
                onSuccess?.()
                closeModal(getModalId(zone?.uid))
                return fm({ id: zone ? labels.saved : labels.created })
            },
            error: err =>
                isInvalidDefaultParentSystem(err)
                    ? fm({ id: labels.defaultParentSystemInvalid })
                    : fm({ id: labels.saveFailed }),
        })
    })

    const handleExit = withDirtyProtection(() => {
        closeModal(getModalId(zone?.uid))
    })

    // Filter out the current zone from parent options to prevent self-reference
    const parentZoneOptions = (allZones?.data ?? []).filter(z => z.uid !== zone?.uid)

    return (
        <Form formMethods={formMethods}>
            <SheetFormButtons
                editRole={ROLE.ZONES_EDIT}
                loading={isPending}
                onSubmit={handleSubmit}
                onExit={handleExit}
                isFormDirty={isDirty}
                saveLabel={fm({ id: zone ? labels.saveLabel : labels.createLabel })}
                loadingText={fm({ id: zone ? labels.saving : labels.creating })}
            />
            <ZoneFormFields disabled={isPending} parentZoneOptions={parentZoneOptions} />
        </Form>
    )
}
