import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import Heading from '@/components/layout/Heading'
import { classNames } from '@/helpers'
import useGeneralTable from '@/hooks/table/useGeneralTable-deprecated'
import { message } from '@/i18n/src/messages'

import type { OrderLineFormType } from '../../types'
import useOrderLinesColumns from './components/OrderLines.columns'
import useOrderLineForm from './form/OrderLineForm.cont'

const messages = message.ordersPage.orderDetail.sectionHeadings

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
    withFooter: true,
    tableId: 'orderLines',
    className: 'col-span-12',
    getRowProps: ({ original: { isDelivered } }) => ({
      className: classNames(isDelivered ? 'bg-green-100' : 'bg-white')
    }),
    getCellProps: () => ({
      className: classNames('border-b  border-gray-300')
    })
  })

  return (
    <Fragment>
      <Heading text={messages.orderLines} />
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
    </Fragment>
  )
}

export default OrderLinesTable
