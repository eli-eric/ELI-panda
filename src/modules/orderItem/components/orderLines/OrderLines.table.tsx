import type { Table } from '@tanstack/react-table'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { classNames } from '@/helpers'
import { message } from '@/i18n/src/messages'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import type { OrderLineFormType } from '../../types'
import useOrderLinesColumns from './components/OrderLines.columns'
import { OrderLineForm } from './form/OrderLineForm.cont'

const messages = message.ordersPage.orderDetail.sectionHeadings

interface OrderLinesTableProps {
  disabledEdit?: boolean
}

const OrderLinesTable = ({ disabledEdit }: OrderLinesTableProps) => {
  const columns = useOrderLinesColumns()
  const [openOrderLineForm, setOpenOrderLineForm] = useState(false)
  const { control } = useFormContext()
  const orderLines = useWatch({ control, name: 'orderLines' })

  const tableRef = useRef<Table<OrderLineFormType>>()

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.setColumnOrder(['name', 'partNumber', 'serialNumber', 'eun', 'isDelivered'])
    }
  }, [tableRef])

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
                setOpenOrderLineForm(true)
              }}
              className="mb-2"
            />
          </div>
        )}
        <PandaTable
          ref={tableRef}
          columns={columns}
          data={orderLines}
          tableId={'orderLines'}
          className={'relative overflow-x-auto'}
          getRowProps={({ original: { isDelivered } }) => ({
            className: classNames(isDelivered ? 'bg-green-100' : 'bg-white')
          })}
          settings={{
            enableFooter: true,
            enableQueryURL: false,
            enableSorting: true,
            manualSorting: false
          }}
        />
      </div>
      <OrderLineForm open={openOrderLineForm} setOpen={setOpenOrderLineForm} />
    </Fragment>
  )
}

export default OrderLinesTable
