import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const { form } = message.systemsPage.systemDetail

export const useFormFields = () => {
  const disabledEdit = !usePermission([ROLE.SYSTEM_EDIT])
  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    location: {
      name: 'location',
      label: form.location.label,
      codebook: CODEBOOK.LOCATION,
      disabled: disabledEdit
    },
    itemUsage: {
      name: 'itemUsage',
      label: form.physicalItem.itemUsage.label,
      codebook: CODEBOOK.ITEM_USAGE,
      disabled: disabledEdit
    },
    // TODO: add itemConditionStatus
    itemConditionStatus: {
      name: 'conditionStatus',
      label: form.physicalItem.conditionStatus.label,
      codebook: CODEBOOK.ITEM_CONDITION_STATUS,
      disabled: disabledEdit
    }
  })
}
