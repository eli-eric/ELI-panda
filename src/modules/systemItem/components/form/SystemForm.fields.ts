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
  const criticalityOption = useCodebookSelectValues(CODEBOOK.SYSTEM_CRITICALITY_CLASS)

  // @TODO: Parent field
  // const parentPath = formState.defaultValues?.parentPath?.length ? formState.defaultValues?.parentPath : []
  // const parentUID = parentPath.length ? parentPath[parentPath.length - 1].uid : ''

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
    // systemTypeUID: {
    //   name: 'systemTypeUID',
    //   label: form.systemTypeUID.label,
    //   isError: !!formState.errors.systemTypeUID,
    //   rounded: 'rounded-md',
    //   options: systemTypeOption && [getDefaultOption('none'), ...systemTypeOption]
    // },
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
    // locationUID: {
    //   name: 'locationUID',
    //   label: form.locationUID.label,
    //   placeholder: form.locationUID.placeholder,
    //   isError: !!formState.errors.locationUID,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.LOCATION
    // },
    // ownerUID: {
    //   name: 'ownerUID',
    //   label: form.ownerUID.label,
    //   placeholder: form.ownerUID.placeholder,
    //   isError: !!formState.errors.ownerUID,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.USER
    // },
    // importanceUID: {
    //   name: 'importanceUID',
    //   label: form.importanceUID.label,
    //   isError: !!formState.errors.importanceUID,
    //   rounded: 'rounded-md',
    //   options: importanceOption && [getDefaultOption('none'), ...importanceOption]
    // },
    // zoneUID: {
    //   name: 'zoneUID',
    //   label: form.zoneUID.label,
    //   isError: !!formState.errors.zoneUID,
    //   rounded: 'rounded-md',
    //   options: zoneOption && [getDefaultOption('none'), ...zoneOption]
    // },
    criticalityClassUID: {
      name: 'criticalityClassUID',
      label: form.criticalityClassUID.label,
      rounded: 'rounded-md',
      options: criticalityOption && [getDefaultOption('none'), ...criticalityOption]
    }
    // parentUID: {
    //   name: 'parentUID',
    //   label: form.parentUID.label,
    //   isError: !!formState.errors.parentUID,
    //   rounded: 'rounded-md',
    // }
  })
}
export default useSystemEditFormFields
