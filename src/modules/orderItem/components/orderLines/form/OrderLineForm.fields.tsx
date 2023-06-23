import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.ordersPage.orderLines

const useOrderLineFormFields = (enabled: boolean) =>
  useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      disabled: !enabled,
      rounded: 'rounded-md'
    },
    catalogueNumber: {
      name: 'catalogueNumber',
      label: form.catalogueNumber.label,
      placeholder: form.catalogueNumber.placeholder,
      disabled: !enabled,
      rounded: 'rounded-md'
    },
    system: {
      name: 'system',
      label: form.systemName.label,
      placeholder: form.systemName.placeholder,
      rounded: 'rounded-md',
      codebook: CODEBOOK.SYSTEM
    },
    price: {
      name: 'price',
      label: form.price.label,
      placeholder: form.price.placeholder,
      rounded: 'rounded-md',
      type: 'number',
      inputMode: 'numeric'
    },
    quantity: {
      name: 'quantity',
      label: form.quantity.label,
      placeholder: form.quantity.placeholder,
      rounded: 'rounded-md',
      type: 'number'
    },
    location: {
      name: 'location',
      label: form.location.label,
      placeholder: form.location.placeholder,
      rounded: 'rounded-md',
      codebook: CODEBOOK.LOCATION
    },
    notes: {
      name: 'notes',
      label: form.notes.label,
      placeholder: form.notes.placeholder,
      rounded: 'rounded-md'
    },
    // itemUsage: {
    //   name: 'itemUsage',
    //   label: form.itemUsage.label,
    //   isError: !!formState.errors.itemUsage,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.ITEM_USAGE
    // },
    serialNumber: {
      name: 'serialNumber',
      label: form.serialNumber.label,
      placeholder: form.serialNumber.placeholder,
      rounded: 'rounded-md'
    }
  })
export default useOrderLineFormFields
