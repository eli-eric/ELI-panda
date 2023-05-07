import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'

import { PlusButton } from '@/components/Buttons'
import useGeneralTable from '@/hooks/useGeneralTable'

import { OrderLineFormType } from '../../types'
import OrderLineActionButtons from './components/OrderLine.actions'
import useOrderLineForm from './form/OrderLineForm.cont'

interface OrderLinesTableProps {
  orderLines?: OrderLineFormType[]
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  disabledEdit?: boolean
}

const OrderLinesTable = ({ orderLines, setOrderLine, deleteOrderLine, disabledEdit }: OrderLinesTableProps) => {
  const { setOpen, getFormModal } = useOrderLineForm({ setOrderLine })

  const columns = useMemo((): Column<OrderLineFormType>[] => {
    const cols: Column<OrderLineFormType>[] = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value, row: { original } }: CellProps<OrderLineFormType>) => (
          <div className="flex items-center my-1">
            <OrderLineActionButtons
              orderLine={original}
              setOrderLine={setOrderLine}
              deleteOrderLine={deleteOrderLine}
            />
            <span>{value}</span>
          </div>
        )
      },
      {
        Header: 'Catalogue Number',
        accessor: 'catalogueNumber'
      },
      {
        Header: 'System',
        accessor: 'system',
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value?.name}</span>
      },
      {
        Header: 'Price',
        accessor: 'price',
        //TODO: format price
        Cell: ({ value, row: { original } }: CellProps<OrderLineFormType>) => (
          <span>
            {value} <span className="font-medium">{original.currency}</span>
          </span>
        )
      }
    ]
    disabledEdit && cols.shift()

    return cols
  }, [setOrderLine, deleteOrderLine, disabledEdit])

  const { getTable } = useGeneralTable({ columns, data: orderLines, tableId: 'orderLines', className: 'col-span-12' })

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
