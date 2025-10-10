import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const messages = message.common.spareAssignment.form

export const useSpareAssignmentFields = () => {
  return useMakeFormFields({
    oldItemCondition: {
      name: 'oldItemCondition',
      label: messages.oldItemCondition.label,
      codebook: CODEBOOK.ITEM_CONDITION_STATUS,
      required: false, // Validation happens at submit time
      rounded: 'rounded-md'
    },
    newItemLocation: {
      name: 'newItemLocation',
      label: messages.newItemLocation.label,
      codebook: CODEBOOK.LOCATION,
      required: false, // Validation happens at submit time
      rounded: 'rounded-md'
    },
    autoAssignParent: {
      name: 'autoAssignParent',
      label: messages.autoAssignParent.label,
      type: 'checkbox',
      rounded: 'rounded-md'
    }
  })
}
