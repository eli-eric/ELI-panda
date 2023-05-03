import { Fragment, useMemo } from 'react'
import { CellProps, Column } from 'react-table'

import { Button } from '@/components/Buttons'
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

  const columns = useMemo(
    (): Column<OrderLineFormType>[] => [
      {
        Header: 'Actions',
        Cell: (props: CellProps<OrderLineFormType>) => (
          <Fragment>
            {!disabledEdit && (
              <OrderLineActionButtons
                orderLine={props.row.original}
                setOrderLine={setOrderLine}
                deleteOrderLine={deleteOrderLine}
              />
            )}
          </Fragment>
        )
      },
      {
        Header: 'Name',
        accessor: 'name'
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
        accessor: 'priceEur',
        //TODO: format price
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value} €</span>
      }
    ],
    [setOrderLine, deleteOrderLine, disabledEdit]
  )

  const { getTable } = useGeneralTable({ columns, data: orderLines, tableId: 'orderLines', className: 'col-span-12' })

  return (
    <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between">
      {!disabledEdit && (
        <div className="flex items-center mr-2">
          <Button
            primary
            onClick={() => {
              setOpen(true)
            }}
            className="mb-2"
          >
            Add Order line
          </Button>
        </div>
      )}
      <div className="grid grid-cols-12">{getTable()}</div>
      {getFormModal()}
    </div>
  )
}

export default OrderLinesTable
