import { useFormContext } from 'react-hook-form'

import { useMakeFormFields } from '@/hooks/form'
import { message } from '@/i18n/src/messages'
import { SystemItemFormType } from '@/modules/systems/types/form'
import { Option } from '@/types/form'

const { form } = message.systemsPage.catalogueItem.addItemModal

const itemUsageUidValues: Option[] = [
  { value: '0119a645-5155-46a4-95a4-4ad576d4fff2', name: 'Spare Part' },
  { value: 'd5ab8e98-2cbe-4c03-98d3-52d3a1bbdaa3', name: 'In System Part' },
  {
    value: 'b7199329-8ba4-43d2-a31d-20f8774b3a62',
    name: 'Experimental loan pool part'
  },
  {
    value: 'f1849b4b-947f-4c31-8c76-b5eca91d18a6',
    name: 'Test and measurement equipment'
  },
  { value: '00961288-4c88-4632-9003-3c9c18b80fc0', name: 'Stock item' },
  { value: 'f3fd12d8-d975-4aac-afb2-b9f244316d77', name: 'Other' }
]

const useSystemItemFormFields = () => {
  const { register, formState } = useFormContext<SystemItemFormType>()

  return useMakeFormFields(register, {
    catalogueItemUid: {
      name: 'catalogueItemUID',
      label: form.catalogueItemUID.label,
      isError: !!formState.errors.catalogueItemUID,
      disabled: true,
      padding: true,
      rounded: 'rounded-md'
    },
    itemUsageUid: {
      name: 'itemUsageUID',
      label: form.itemUsageUID.label,
      isError: !!formState.errors.catalogueItemUID,
      rounded: 'rounded-md',
      padding: true,
      options: itemUsageUidValues
    },
    eun: {
      name: 'eun',
      label: form.eun.label,
      placeholder: form.eun.placeholder,
      isError: !!formState.errors.catalogueItemUID,
      rounded: 'rounded-md',
      padding: true
    },
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      isError: !!formState.errors.catalogueItemUID,
      rounded: 'rounded-md',
      padding: true
    },
    serialNumber: {
      name: 'serialNumber',
      label: form.serialNumber.label,
      placeholder: form.serialNumber.placeholder,
      isError: !!formState.errors.catalogueItemUID,
      padding: true,
      options: itemUsageUidValues
    },
    batchNumber: {
      name: 'batchNumber',
      label: form.batchNumber.label,
      placeholder: form.batchNumber.placeholder,
      isError: !!formState.errors.catalogueItemUID,
      rounded: 'rounded-md',
      padding: true
    },
    obsolete: {
      name: 'obsolete',
      label: form.obsolete.label,
      placeholder: form.obsolete.placeholder,
      isError: !!formState.errors.catalogueItemUID,

      padding: true,
      options: [{ value: 'false' }, { value: 'true' }]
    },
    estimatedLifeTimeMonths: {
      name: 'estimatedLifeTimeMonths',
      label: form.estimatedLifeTimeMonths.label,
      placeholder: form.estimatedLifeTimeMonths.placeholder,
      isError: !!formState.errors.catalogueItemUID,
      rounded: 'rounded-md',
      padding: true,
      type: 'number'
    }
  })
}
export default useSystemItemFormFields
