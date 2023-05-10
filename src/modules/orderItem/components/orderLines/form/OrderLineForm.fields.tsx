import { useFormContext } from 'react-hook-form'

import { useMakeFormFields } from '@/hooks/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.ordersPage.orderLines

const useOrderLineFormFields = (enabled: boolean) => {
  const { register, formState } = useFormContext<OrderLineFormType>()

  return useMakeFormFields(register, {
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      isError: !!formState.errors.name,
      disabled: !enabled,
      rounded: 'rounded-md'
    },
    catalogueNumber: {
      name: 'catalogueNumber',
      label: form.catalogueNumber.label,
      placeholder: form.catalogueNumber.placeholder,
      isError: !!formState.errors.catalogueNumber,
      disabled: !enabled,
      rounded: 'rounded-md'
    },
    system: {
      name: 'system',
      label: form.systemName.label,
      placeholder: form.systemName.placeholder,
      isError: !!formState.errors.system,
      rounded: 'rounded-md',
      codebook: CODEBOOK.SYSTEM
    },
    price: {
      name: 'price',
      label: form.price.label,
      placeholder: form.price.placeholder,
      isError: !!formState.errors.price,
      rounded: 'rounded-md',
      type: 'number',
      inputMode: 'numeric',
      pattern: 'd*',
      defaultValue: undefined
    },
    quantity: {
      name: 'quantity',
      label: form.quantity.label,
      placeholder: form.quantity.placeholder,
      isError: !!formState.errors.quantity,
      rounded: 'rounded-md',
      type: 'number'
    },
    location: {
      name: 'location',
      label: form.location.label,
      placeholder: form.location.placeholder,
      isError: !!formState.errors.location,
      rounded: 'rounded-md',
      codebook: CODEBOOK.LOCATION
    },
    itemUsage: {
      name: 'itemUsage',
      label: form.itemUsage.label,
      isError: !!formState.errors.itemUsage,
      rounded: 'rounded-md',
      codebook: CODEBOOK.ITEM_USAGE
    }
  })
}
export default useOrderLineFormFields
