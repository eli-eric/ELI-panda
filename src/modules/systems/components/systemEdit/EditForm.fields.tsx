import { useFormContext } from 'react-hook-form'

import { useMakeFormFields } from '@/hooks/form'
import { useCodebookSelectValues } from '@/hooks/useCodebook'
import { message } from '@/i18n/src/messages'
import { SystemEditFormType } from '@/modules/systems/types/form'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.systemsPage.systemDetail

const useSystemEditFormFields = () => {
  const { register, formState, watch } = useFormContext<SystemEditFormType>()

  const zone = watch('zoneUID')

  const systemTypeOption = useCodebookSelectValues(CODEBOOK.SYSTEM_TYPE)
  const importanceOption = useCodebookSelectValues(CODEBOOK.SYSTEM_IMPORTANCE)
  const zoneOption = useCodebookSelectValues(CODEBOOK.ZONE)
  const subZoneOption = useCodebookSelectValues(
    CODEBOOK.SUB_ZONE,
    `?parentUID=${zone}`
  )
  const criticalityOption = useCodebookSelectValues(
    CODEBOOK.SYSTEM_CRITICALITY_CLASS
  )

  return useMakeFormFields(register, {
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      isError: !!formState.errors.name,
      rounded: 'rounded-md'
    },
    description: {
      name: 'description',
      label: form.description.label,
      isError: !!formState.errors.description,
      rounded: 'rounded-md'
    },
    systemTypeUID: {
      name: 'systemTypeUID',
      label: form.systemTypeUID.label,
      isError: !!formState.errors.systemTypeUID,
      rounded: 'rounded-md',
      options: systemTypeOption
    },
    systemCode: {
      name: 'systemCode',
      label: form.systemCode.label,
      placeholder: form.systemCode.placeholder,
      isError: !!formState.errors.systemCode,
      rounded: 'rounded-md'
    },
    systemAlias: {
      name: 'systemAlias',
      label: form.systemAlias.label,
      placeholder: form.systemAlias.placeholder,
      isError: !!formState.errors.systemAlias,
      rounded: 'rounded-md'
    },
    locationUID: {
      name: 'locationUID',
      label: form.locationUID.label,
      placeholder: form.locationUID.placeholder,
      isError: !!formState.errors.locationUID,
      rounded: 'rounded-md',
      codebook: CODEBOOK.LOCATION
    },
    ownerUID: {
      name: 'ownerUID',
      label: form.ownerUID.label,
      placeholder: form.ownerUID.placeholder,
      isError: !!formState.errors.ownerUID,
      rounded: 'rounded-md',
      codebook: CODEBOOK.USER
    },
    importanceUID: {
      name: 'importanceUID',
      label: form.importanceUID.label,
      isError: !!formState.errors.importanceUID,
      rounded: 'rounded-md',
      options: importanceOption
    },
    zoneUID: {
      name: 'zoneUID',
      label: form.zoneUID.label,
      isError: !!formState.errors.zoneUID,
      rounded: 'rounded-md',
      options: zoneOption
    },
    subZoneCode: {
      name: 'subZone',
      label: form.subZone.label,
      isError: !!formState.errors.subZone,
      rounded: 'rounded-md',
      options: subZoneOption
    },
    criticalityClassUID: {
      name: 'criticalityClassUID',
      label: form.criticalityClassUID.label,
      isError: !!formState.errors.criticalityClassUID,
      rounded: 'rounded-md',
      options: criticalityOption
    }
  })
}
export default useSystemEditFormFields
