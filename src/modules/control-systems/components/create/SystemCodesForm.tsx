import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/hooks/useDebounce'
import { message } from '@/i18n/src/messages'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import type { SystemCodesFormValues } from './SystemCodesForm.schema'
import { systemCodesFormSchema } from './SystemCodesForm.schema'

interface Props {
  onPreview: (values: SystemCodesFormValues) => void
  onSubmit: (values: SystemCodesFormValues) => void
  isPending?: boolean
}

export const SystemCodesForm = ({ onPreview, onSubmit, isPending }: Props) => {
  const { formatMessage: fm } = useIntl()

  const defaultValues = useMemo(
    () => ({
      zone: null as CodebookType | null,
      systemType: null as CodebookType | null,
      batch: 1
    }),
    []
  )

  const formMethods = useForm({
    resolver: zodResolver(systemCodesFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  const { watch, handleSubmit, formState, register } = formMethods
  const { isValid, errors } = formState

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
    if (zone && systemType && debouncedBatch >= 1 && debouncedZoneUid && debouncedSystemTypeUid) {
      onPreview({ zone, systemType, batch: debouncedBatch })
    }
  }, [debouncedZoneUid, debouncedSystemTypeUid, debouncedBatch, zone, systemType, onPreview])

  const handleFormSubmit = useCallback(
    (values: SystemCodesFormValues) => {
      onSubmit(values)
    },
    [onSubmit]
  )

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Zone field */}
        <div className="space-y-2">
          <Combobox
            name="zone"
            codebook={CODEBOOK.ZONE}
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
              disabled: false
            }}
          />
        </div>

        {/* Batch field */}
        <div className="space-y-2">
          <Label htmlFor="batch">{fm({ id: message.controlSystems.form.batch })}</Label>
          <Input
            id="batch"
            type="number"
            min={1}
            max={100}
            {...register('batch', { valueAsNumber: true })}
            placeholder={fm({ id: message.controlSystems.form.batchPlaceholder })}
          />
          {errors.batch && (
            <p className="text-sm text-destructive">{errors.batch.message}</p>
          )}
        </div>

        {/* Submit button */}
        <Button type="submit" disabled={!isValid || isPending} className="w-full">
          {fm({ id: message.controlSystems.buttons.create })}
        </Button>
      </form>
    </FormProvider>
  )
}
