import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'
import { queryFetcher } from '@/utils/fetcher'

import { useZoneMutation } from '../hooks/useZoneMutation'
import type { Zone, ZonesResponse } from '../types/zone.types'
import { ZoneFormFields } from './zone-form.comp'
import { type ZoneFormData, zoneSchema } from './zone-form.schema'

interface Props {
    zone?: Zone
    onSuccess?: () => void
}

const getModalId = (uid?: string) => (uid ? `zone-edit-${uid}` : 'zone-create')

export const ZoneFormContainer: FC<Props> = ({ zone, onSuccess }) => {
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
        toast.promise(mutateAsync(data), {
            loading: zone ? 'Saving zone...' : 'Creating zone...',
            success: () => {
                onSuccess?.()
                closeModal(getModalId(zone?.uid))
                return zone ? 'Zone saved' : 'Zone created'
            },
            error: 'Failed to save zone',
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
                saveLabel={zone ? 'Save Zone' : 'Create Zone'}
                loadingText={zone ? 'Saving zone...' : 'Creating zone...'}
            />
            <ZoneFormFields disabled={isPending} parentZoneOptions={parentZoneOptions} />
        </Form>
    )
}
