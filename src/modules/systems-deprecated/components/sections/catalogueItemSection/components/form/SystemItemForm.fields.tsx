import { useCodebookSelectValues } from '@/hooks/fetch/useCodebook'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.systemsPage.catalogueItem.addItemModal

const useSystemItemFormFields = () => {
  const itemsConditionalValues = useCodebookSelectValues(CODEBOOK.ITEM_CONDITION_STATUS)
  const itemUsageUidValues = useCodebookSelectValues(CODEBOOK.ITEM_USAGE)

  return useMakeFormFields({
    catalogueItemUid: {
      name: 'catalogueItemUID',
      label: form.catalogueItemUID.label,
      disabled: true,
      rounded: 'rounded-md'
    },
    itemUsageUid: {
      name: 'itemUsageUID',
      label: form.itemUsageUID.label,
      rounded: 'rounded-md',
      options: itemUsageUidValues
    },
    eun: {
      name: 'eun',
      label: form.eun.label,
      placeholder: form.eun.placeholder,
      rounded: 'rounded-md'
    },
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      rounded: 'rounded-md'
    },
    serialNumber: {
      name: 'serialNumber',
      label: form.serialNumber.label,
      placeholder: form.serialNumber.placeholder,
      rounded: 'rounded-md',
      options: itemUsageUidValues
    },
    batchNumber: {
      name: 'batchNumber',
      label: form.batchNumber.label,
      placeholder: form.batchNumber.placeholder,
      rounded: 'rounded-md'
    },
    obsolete: {
      name: 'obsolete',
      label: form.obsolete.label,
      placeholder: form.obsolete.placeholder,
      rounded: 'rounded-md',
      options: [{ value: 'false' }, { value: 'true' }]
    },
    estimatedLifeTimeMonths: {
      name: 'estimatedLifeTimeMonths',
      label: form.estimatedLifeTimeMonths.label,
      placeholder: form.estimatedLifeTimeMonths.placeholder,
      rounded: 'rounded-md',
      type: 'number'
    },
    conditionStatusUID: {
      name: 'conditionStatusUID',
      label: form.conditionStatusUID.label,
      rounded: 'rounded-md',
      options: itemsConditionalValues
    },
    description: {
      name: 'description',
      label: form.description.label,
      rounded: 'rounded-md'
    }
  })
}
export default useSystemItemFormFields
