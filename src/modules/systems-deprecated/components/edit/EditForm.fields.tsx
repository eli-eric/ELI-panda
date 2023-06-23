import { useCodebookSelectValues } from '@/hooks/fetch/useCodebook'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.systemsPage.systemDetail

//TODO: move to utils
const getDefaultOption = (name, disabled = false) => ({
  value: '',
  name,
  disabled
})

const useSystemEditFormFields = () => {
  const systemTypeOption = useCodebookSelectValues(CODEBOOK.SYSTEM_TYPE)
  const importanceOption = useCodebookSelectValues(CODEBOOK.SYSTEM_IMPORTANCE)
  const zoneOption = useCodebookSelectValues(CODEBOOK.ZONE)

  const criticalityOption = useCodebookSelectValues(CODEBOOK.SYSTEM_CRITICALITY_CLASS)

  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      rounded: 'rounded-md'
    },
    description: {
      name: 'description',
      label: form.description.label,
      rounded: 'rounded-md'
    },
    systemTypeUID: {
      name: 'systemTypeUID',
      label: form.systemType.label,
      rounded: 'rounded-md',
      options: systemTypeOption && [getDefaultOption('none'), ...systemTypeOption]
    },
    systemCode: {
      name: 'systemCode',
      label: form.systemCode.label,
      placeholder: form.systemCode.placeholder,
      rounded: 'rounded-md',
      disabled: true
    },
    systemAlias: {
      name: 'systemAlias',
      label: form.systemAlias.label,
      placeholder: form.systemAlias.placeholder,
      rounded: 'rounded-md'
    },
    locationUID: {
      name: 'locationUID',
      label: form.location.label,
      placeholder: form.location.placeholder,
      rounded: 'rounded-md',
      codebook: CODEBOOK.LOCATION
    },
    ownerUID: {
      name: 'ownerUID',
      label: form.owner.label,
      placeholder: form.owner.placeholder,
      rounded: 'rounded-md',
      codebook: CODEBOOK.USER
    },
    importanceUID: {
      name: 'importanceUID',
      label: form.importance.label,
      rounded: 'rounded-md',
      options: importanceOption && [getDefaultOption('none'), ...importanceOption]
    },
    zoneUID: {
      name: 'zoneUID',
      label: form.zone.label,
      rounded: 'rounded-md',
      options: zoneOption && [getDefaultOption('none'), ...zoneOption]
    },
    criticalityClassUID: {
      name: 'criticalityClassUID',
      label: form.criticalityClass.label,
      rounded: 'rounded-md',
      options: criticalityOption && [getDefaultOption('none'), ...criticalityOption]
    },
    //TODO: add codebook
    parentUID: {
      name: 'parentUID',
      label: form.parentUID.label,
      rounded: 'rounded-md'
    }
  })
}
export default useSystemEditFormFields
