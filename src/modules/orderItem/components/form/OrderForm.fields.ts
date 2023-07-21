import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import useOrderDetail from '../../hooks/useOrderDetail'

// messages
const { form } = message.ordersPage.orderDetail

const useOrderFormFields = () => {
  const { disabledEdit } = useOrderDetail()

  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md'
    },
    orderNumber: {
      name: 'orderNumber',
      label: form.orderNumber.label,
      placeholder: form.orderNumber.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md'
    },
    requestNumber: {
      name: 'requestNumber',
      label: form.requestNumber.label,
      placeholder: form.requestNumber.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md'
    },
    contractNumber: {
      name: 'contractNumber',
      label: form.contractNumber.label,
      placeholder: form.contractNumber.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md'
    },
    supplier: {
      name: 'supplier',
      label: form.supplier.label,
      placeholder: form.supplier.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md',
      codebook: CODEBOOK.SUPPLIER
    },

    procurementResponsible: {
      name: 'procurementResponsible',
      label: form.procurementResponsible.label,
      disabled: disabledEdit,
      rounded: 'rounded-md',
      emptyOption: true,
      codebook: CODEBOOK.PROCUREMENTER
    },
    requestor: {
      name: 'requestor',
      label: form.requestor.label,
      placeholder: form.requestor.placeholder,
      disabled: disabledEdit,
      rounded: 'rounded-md',
      codebook: CODEBOOK.EMPLOYEE
    },
    orderStatus: {
      name: 'orderStatus',
      label: form.orderStatus.label,
      disabled: disabledEdit,
      rounded: 'rounded-md',
      codebook: CODEBOOK.ORDER_STATUS
    },
    notes: {
      name: 'notes',
      label: form.notes.label,
      disabled: disabledEdit,
      rounded: 'rounded-md'
    },
    orderDate: {
      name: 'orderDate',
      label: form.orderDate.label,
      type: 'date',
      disabled: disabledEdit,
      rounded: 'rounded-md'
    }
  })
}
export default useOrderFormFields
