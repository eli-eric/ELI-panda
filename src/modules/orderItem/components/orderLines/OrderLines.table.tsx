import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import type { CellProps, Column } from 'react-table'

import { PlusButton } from '@/components/Buttons'
import useGeneralTable from '@/hooks/useGeneralTable'
import { message } from '@/i18n/src/messages'

import type { OrderLineFormType } from '../../types'
import { OrderisDeliveredAction, OrderLineActionButtons } from './components/OrderLine.actions'
import useOrderLineForm from './form/OrderLineForm.cont'

const messages = message.ordersPage.orderLines.orderLinesTable.header

interface OrderLinesTableProps {
  orderLines?: OrderLineFormType[]
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  disabledEdit?: boolean
}

const OrderLinesTable = ({ orderLines, setOrderLine, deleteOrderLine, disabledEdit }: OrderLinesTableProps) => {
  const uid = useRouter().query.uid as string
  const { setOpen, getFormModal } = useOrderLineForm({ setOrderLine })
  const { formatMessage } = useIntl()

  const columns = useMemo((): Column<OrderLineFormType>[] => {
    const cols: Column<OrderLineFormType>[] = [
      {
        Header: formatMessage({ id: messages.name }),
        accessor: 'name',
        Cell: ({ value, row: { original } }: CellProps<OrderLineFormType>) => (
          <div className="flex items-center my-1">
            {!disabledEdit && (
              <OrderLineActionButtons
                orderLine={original}
                setOrderLine={setOrderLine}
                deleteOrderLine={deleteOrderLine}
              />
            )}
            <span>{value}</span>
          </div>
        )
      },
      {
        Header: formatMessage({ id: messages.catalogueNumber }),
        accessor: 'catalogueNumber'
      },
      {
        Header: formatMessage({ id: messages.serialNumber }),
        accessor: 'serialNumber'
      },
      {
        Header: formatMessage({ id: messages.itemUsage }),
        accessor: 'itemUsage',
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value?.name}</span>
      },
      {
        Header: formatMessage({ id: messages.system }),
        accessor: 'system',
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value?.name.split('-')[0]}</span>
      },
      /* {
        Header: formatMessage({ id: messages.location }),
        accessor: 'location',
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value?.name.split('-')[0]}</span>
      }, */
      {
        Header: formatMessage({ id: messages.price }),
        accessor: 'price',
        Cell: ({ value, row: { original } }: CellProps<OrderLineFormType>) => (
          <span>
            {value} <span className="font-medium">{original.currency}</span>
          </span>
        )
      },
      {
        Header: formatMessage({ id: messages.eun }),
        accessor: 'eun'
      },
      {
        Header: formatMessage({ id: messages.isDelivered }),
        accessor: 'isDelivered',
        Cell: ({ value, row: { original } }: CellProps<OrderLineFormType>) => (
          <OrderisDeliveredAction orderLine={original} setOrderLine={setOrderLine} checked={value} />
        )
      }
    ]
    !uid && cols.pop()

    return cols
  }, [setOrderLine, deleteOrderLine, disabledEdit, uid, formatMessage])

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
