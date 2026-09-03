import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Minus, Plus } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAccessControl } from '@/hooks/useAccessControl'
import { useDebounce } from '@/hooks/useDebounce'
import { message } from '@/i18n/src/messages'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useOpenZoneEdit } from '@/modules/zones/hooks/useOpenZoneEdit'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

import { BATCH_LIMIT, ONLY_ROOT_ZONES } from '../../types/constants'
import type { SystemCodesErrorKind } from '../../utils/systemCodesErrors'
import { SYSTEM_CODES_ERROR } from '../../utils/systemCodesErrors'
import type { SystemCodesFormInput, SystemCodesFormValues } from './SystemCodesForm.schema'
import { systemCodesFormSchema } from './SystemCodesForm.schema'

interface Props {
    onPreview: (values: SystemCodesFormValues) => void
    onSubmit: (values: SystemCodesFormValues) => Promise<boolean>
    isPending?: boolean
    isPreviewLoading?: boolean
    previewErrorMessage?: string
    previewErrorKind?: SystemCodesErrorKind | null
}

export const SystemCodesForm = ({
    onPreview,
    onSubmit,
    isPending = false,
    isPreviewLoading = false,
    previewErrorMessage,
    previewErrorKind,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const canEditZones = useAccessControl(ROLE.ZONES_EDIT)()
    const { openZoneEdit } = useOpenZoneEdit()

    const defaultValues: SystemCodesFormInput = useMemo(
        () => ({
            zone: null,
            systemType: null,
            batch: 1,
        }),
        [],
    )

    const formMethods = useForm<SystemCodesFormInput>({
        resolver: zodResolver(systemCodesFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const { watch, register, setValue } = formMethods

    // Watch form values for preview
    const zone = watch('zone')
    const systemType = watch('systemType')
    const batch = watch('batch')

    // Debounce the values for preview
    const debouncedZoneUid = useDebounce(zone?.uid, 500)
    const debouncedSystemTypeUid = useDebounce(systemType?.uid, 500)
    const debouncedBatch = useDebounce(batch, 500)

    // Trigger preview when debounced values change
    useEffect(() => {
        // Guard ensures zone and systemType are non-null before calling onPreview
        if (
            zone &&
            systemType &&
            debouncedBatch >= 1 &&
            debouncedZoneUid &&
            debouncedSystemTypeUid
        ) {
            onPreview({
                zone,
                systemType,
                batch: debouncedBatch,
            } as SystemCodesFormValues)
        }
    }, [debouncedZoneUid, debouncedSystemTypeUid, debouncedBatch, zone, systemType, onPreview])

    // The debounced values are exactly what was previewed, so comparing against them
    // tells us whether the preview still describes the form the user is looking at.
    // Without this there is a ~500ms window after a change where Create is enabled
    // against state that was never validated.
    const isPreviewStale =
        zone?.uid !== debouncedZoneUid ||
        systemType?.uid !== debouncedSystemTypeUid ||
        Number(batch) !== Number(debouncedBatch)

    const canFixOnZone =
        previewErrorKind === SYSTEM_CODES_ERROR.MISSING_DEFAULT_PARENT_SYSTEM && !!zone

    const handleFormSubmit = useCallback(
        async (values: SystemCodesFormInput) => {
            // Zod validation ensures values are non-null at this point
            await onSubmit(values as SystemCodesFormValues)
        },
        [onSubmit],
    )

    return (
        <Form
            formMethods={formMethods}
            onSubmit={handleFormSubmit}
            className=" flex flex-col gap-4"
        >
            {/* Zone field */}
            <div className="space-y-2">
                <Combobox
                    name="zone"
                    codebook={CODEBOOK.ZONE}
                    filter={ONLY_ROOT_ZONES}
                    label={fm({ id: message.controlSystems.form.zone })}
                    placeholder={fm({ id: message.controlSystems.form.zone })}
                />
            </div>

            {/* System Type field */}
            <div className="space-y-2">
                <Label>{fm({ id: message.controlSystems.form.systemType })}</Label>
                <SystemTypeComboBox
                    systemTypeField={{
                        name: 'systemType',
                        label: '',
                        disabled: false,
                    }}
                />
            </div>

            {/* Batch field */}
            <div className="space-y-2">
                <Label htmlFor="batch">{fm({ id: message.controlSystems.form.batch })}</Label>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setValue('batch', Math.max(1, (Number(batch) || 1) - 1))}
                        disabled={Number(batch) <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        id="batch"
                        type="number"
                        min={1}
                        max={BATCH_LIMIT}
                        {...register('batch', { valueAsNumber: true })}
                        onChange={e => {
                            const value = Math.max(
                                1,
                                Math.min(BATCH_LIMIT, Number(e.target.value) || 1),
                            )
                            setValue('batch', value)
                        }}
                        className="text-center"
                        placeholder={fm({
                            id: message.controlSystems.form.batchPlaceholder,
                        })}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            setValue('batch', Math.min(BATCH_LIMIT, (Number(batch) || 1) + 1))
                        }
                        disabled={Number(batch) >= BATCH_LIMIT}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {previewErrorMessage && (
                <Alert variant="destructive">
                    <AlertTriangle />
                    <AlertDescription className="flex flex-col items-start gap-2">
                        <span>{previewErrorMessage}</span>
                        {canFixOnZone &&
                            (canEditZones ? (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openZoneEdit(zone.uid)}
                                >
                                    {fm(
                                        { id: message.controlSystems.errors.setOnZone },
                                        { zone: zone.name },
                                    )}
                                </Button>
                            ) : (
                                <span>{fm({ id: message.controlSystems.errors.askAdmin })}</span>
                            ))}
                    </AlertDescription>
                </Alert>
            )}

            {/* Submit button */}
            <Button
                type="submit"
                className="w-full"
                disabled={
                    isPending || isPreviewLoading || isPreviewStale || !!previewErrorMessage
                }
            >
                {fm({ id: message.controlSystems.buttons.create })}
            </Button>
        </Form>
    )
}
