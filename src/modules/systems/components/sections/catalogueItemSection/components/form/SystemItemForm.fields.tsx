import { useFormContext } from 'react-hook-form'

import { useCodebookSelectValues } from '@/hooks/fetch/useCodebook'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import type { SystemItemFormType } from '@/modules/systems/types/form'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.systemsPage.catalogueItem.addItemModal

const useSystemItemFormFields = () => {
  const { register, formState } = useFormContext<SystemItemFormType>()

  const itemsConditionalValues = useCodebookSelectValues(CODEBOOK.ITEM_CONDITION_STATUS)
  const itemUsageUidValues = useCodebookSelectValues(CODEBOOK.ITEM_USAGE)

  return useMakeFormFields(register, {
    catalogueItemUid: {
      name: 'catalogueItemUID',
      label: form.catalogueItemUID.label,
      isError: !!formState.errors.catalogueItemUID,
      disabled: true,
      rounded: 'rounded-md'
    },
    itemUsageUid: {
      name: 'itemUsageUID',
      label: form.itemUsageUID.label,
      isError: !!formState.errors.itemUsageUID,
      rounded: 'rounded-md',
      options: itemUsageUidValues
    },
    eun: {
      name: 'eun',
      label: form.eun.label,
      placeholder: form.eun.placeholder,
      isError: !!formState.errors.eun,
      rounded: 'rounded-md'
    },
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      isError: !!formState.errors.name,
      rounded: 'rounded-md'
    },
    serialNumber: {
      name: 'serialNumber',
      label: form.serialNumber.label,
      placeholder: form.serialNumber.placeholder,
      isError: !!formState.errors.serialNumber,
      rounded: 'rounded-md',

      options: itemUsageUidValues
    },
    batchNumber: {
      name: 'batchNumber',
      label: form.batchNumber.label,
      placeholder: form.batchNumber.placeholder,
      isError: !!formState.errors.batchNumber,
      rounded: 'rounded-md'
    },
    obsolete: {
      name: 'obsolete',
      label: form.obsolete.label,
      placeholder: form.obsolete.placeholder,
      isError: !!formState.errors.obsolete,
      rounded: 'rounded-md',
      options: [{ value: 'false' }, { value: 'true' }]
    },
    estimatedLifeTimeMonths: {
      name: 'estimatedLifeTimeMonths',
      label: form.estimatedLifeTimeMonths.label,
      placeholder: form.estimatedLifeTimeMonths.placeholder,
      isError: !!formState.errors.estimatedLifeTimeMonths,
      rounded: 'rounded-md',
      type: 'number'
    },
    conditionStatusUID: {
      name: 'conditionStatusUID',
      label: form.conditionStatusUID.label,
      isError: !!formState.errors.conditionStatusUID,
      rounded: 'rounded-md',
      options: itemsConditionalValues
    },
    description: {
      name: 'description',
      label: form.description.label,
      isError: !!formState.errors.desctription,
      rounded: 'rounded-md'
    }
  })
}
export default useSystemItemFormFields
