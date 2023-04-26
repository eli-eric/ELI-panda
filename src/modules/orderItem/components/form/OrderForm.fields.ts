import { useFormContext } from 'react-hook-form'

import { useMakeFormFields } from '@/hooks/form'
import { message } from '@/i18n/src/messages'

import { OrderFormType } from '../../types'

// messages
const { form } = message.ordersPage.orderDetail

const useOrderFormFields = (disabled?: boolean) => {
  const { register, formState } = useFormContext<OrderFormType>()

  return useMakeFormFields(register, {
    name: {
      name: 'name',
      label: form.name.label,
      disabled: disabled,
      isError: !!formState.errors.name,
      rounded: 'rounded-md'
    },
    orderNumber: {
      name: 'orderNumber',
      label: form.orderNumber.label,
      disabled: disabled,
      isError: !!formState.errors.orderNumber,
      rounded: 'rounded-md'
    },
    requestNumber: {
      name: 'requestNumber',
      label: form.requestNumber.label,
      disabled: disabled,
      isError: !!formState.errors.requestNumber,
      rounded: 'rounded-md'
    },
    contractNumber: {
      name: 'contractNumber',
      label: form.contractNumber.label,
      disabled: disabled,
      isError: !!formState.errors.contractNumber,
      rounded: 'rounded-md'
    },
    supplier: {
      name: 'supplier',
      label: form.supplier.label,
      disabled: disabled,
      isError: !!formState.errors.supplier,
      rounded: 'rounded-md'
    },
    orderStatus: {
      name: 'orderStatus',
      label: form.orderStatus.label,
      disabled: disabled,
      isError: !!formState.errors.orderStatus,
      rounded: 'rounded-md'
    },
    notes: {
      name: 'notes',
      label: form.notes.label,
      disabled: disabled,
      isError: !!formState.errors.notes,
      rounded: 'rounded-md'
    },
    orderDate: {
      name: 'orderDate',
      label: form.orderDate.label,
      disabled: disabled,
      isError: !!formState.errors.orderDate,
      rounded: 'rounded-md'
    }
  })
}
export default useOrderFormFields
