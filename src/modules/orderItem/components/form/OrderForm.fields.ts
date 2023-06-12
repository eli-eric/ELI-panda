import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'

import useOrderDetail from '../../hooks/useOrderDetail'

// messages
const { form } = message.ordersPage.orderDetail

const useOrderFormFields = () => {
  const { disabledEdit: disabled } = useOrderDetail()

  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    orderNumber: {
      name: 'orderNumber',
      label: form.orderNumber.label,
      placeholder: form.orderNumber.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    requestNumber: {
      name: 'requestNumber',
      label: form.requestNumber.label,
      placeholder: form.requestNumber.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    contractNumber: {
      name: 'contractNumber',
      label: form.contractNumber.label,
      placeholder: form.contractNumber.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    // supplier: {
    //   name: 'supplier',
    //   label: form.supplier.label,
    //   placeholder: form.supplier.placeholder,
    //   disabled: disabled,
    //   isError: !!formState.errors.supplier,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.SUPPLIER
    // },
    // procurementResponsible: {
    //   name: 'procurementResponsible',
    //   label: form.procurementResponsible.label,
    //   disabled: disabled,
    //   isError: !!formState.errors.procurementResponsible,
    //   rounded: 'rounded-md',
    //   emptyOption: true,
    //   codebook: CODEBOOK.PROCUREMENTER
    // },
    // requestor: {
    //   name: 'requestor',
    //   label: form.requestor.label,
    //   placeholder: form.requestor.placeholder,
    //   disabled: disabled,
    //   isError: !!formState.errors.requestor,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.EMPLOYEE
    // },
    // orderStatus: {
    //   name: 'orderStatus',
    //   label: form.orderStatus.label,
    //   disabled: disabled,
    //   isError: !!formState.errors.orderStatus,
    //   rounded: 'rounded-md',
    //   codebook: CODEBOOK.ORDER_STATUS
    // },
    notes: {
      name: 'notes',
      label: form.notes.label,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    orderDate: {
      name: 'orderDate',
      label: form.orderDate.label,
      type: 'date',
      disabled: disabled,
      rounded: 'rounded-md'
    }
  })
}
export default useOrderFormFields
