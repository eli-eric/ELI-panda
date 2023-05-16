import { PlusButton } from '@/components/Buttons'
import useGeneralTable from '@/hooks/table/useGeneralTable'

import type { OrderLineFormType } from '../../types'
import useOrderLinesColumns from './components/OrderLines.columns'
import useOrderLineForm from './form/OrderLineForm.cont'

interface OrderLinesTableProps {
  orderLines?: OrderLineFormType[]
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  disabledEdit?: boolean
}

const OrderLinesTable = ({ orderLines, setOrderLine, deleteOrderLine, disabledEdit }: OrderLinesTableProps) => {
  const { setOpen, getFormModal } = useOrderLineForm({ setOrderLine })
  const columns = useOrderLinesColumns({ setOrderLine, deleteOrderLine, disabledEdit })
  const { getTable } = useGeneralTable<OrderLineFormType>({
    columns,
    data: orderLines,
    tableId: 'orderLines',
    className: 'col-span-12',
    getRowProps: ({ original: { isDelivered } }) => ({ className: isDelivered ? 'bg-green-100 border-b' : '' })
  })

  return (
    <div className="flex flex-col">
      {!disabledEdit && (
        <div className="flex items-center mr-2">
          <PlusButton
            primary
            buttonSize="large"
            onClick={() => {
              setOpen(true)
            }}
            className="mb-2"
          />
        </div>
      )}
      <div className="grid grid-cols-12">{getTable()}</div>
      {getFormModal()}
    </div>
  )
}

export default OrderLinesTable
