import { useFormContext } from 'react-hook-form'

import { useMakeFormFields } from '@/hooks/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { OrderDetailFormType } from '../../types'

// messages
const { form } = message.ordersPage.orderDetail

const useOrderFormFields = (disabled?: boolean) => {
  const { register, formState } = useFormContext<OrderDetailFormType>()

  return useMakeFormFields(register, {
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      disabled: disabled,
      isError: !!formState.errors.name,
      rounded: 'rounded-md'
    },
    orderNumber: {
      name: 'orderNumber',
      label: form.orderNumber.label,
      placeholder: form.orderNumber.placeholder,
      disabled: disabled,
      isError: !!formState.errors.atLeastOneFilled,
      rounded: 'rounded-md'
    },
    requestNumber: {
      name: 'requestNumber',
      label: form.requestNumber.label,
      placeholder: form.requestNumber.placeholder,
      disabled: disabled,
      isError: !!formState.errors.atLeastOneFilled,
      rounded: 'rounded-md'
    },
    contractNumber: {
      name: 'contractNumber',
      label: form.contractNumber.label,
      placeholder: form.contractNumber.placeholder,
      disabled: disabled,
      isError: !!formState.errors.atLeastOneFilled,
      rounded: 'rounded-md'
    },
    supplier: {
      name: 'supplier',
      label: form.supplier.label,
      placeholder: form.supplier.placeholder,
      disabled: disabled,
      isError: !!formState.errors.supplier,
      rounded: 'rounded-md',
      codebook: CODEBOOK.SUPPLIER
    },
    procurementer: {
      name: 'procurementer',
      label: form.procurementer.label,
      placeholder: form.procurementer.placeholder,
      disabled: disabled,
      isError: !!formState.errors.procurementer,
      rounded: 'rounded-md',
      codebook: CODEBOOK.USERS
    },
    requester: {
      name: 'requester',
      label: form.requester.label,
      placeholder: form.requester.placeholder,
      disabled: disabled,
      isError: !!formState.errors.requester,
      rounded: 'rounded-md',
      codebook: CODEBOOK.USERS
    },
    orderStatus: {
      name: 'orderStatus',
      label: form.orderStatus.label,
      disabled: disabled,
      isError: !!formState.errors.orderStatus,
      rounded: 'rounded-md',
      codebook: CODEBOOK.ORDER_STATUS
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
      type: 'date',
      disabled: disabled,
      isError: !!formState.errors.orderDate,
      rounded: 'rounded-md'
    }
  })
}
export default useOrderFormFields
