import { Fragment, useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { cx } from '@/utils'

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
  const orderLinesData = useWatch({ control, name: 'orderLines' })

  // Memoize the orderLines data to prevent unnecessary re-renders
  // This will only create a new reference when the data actually changes
  const orderLines = useMemo(
    () => orderLinesData,
    [
      // Convert to JSON and back to compare actual values, not references
      JSON.stringify(orderLinesData)
    ]
  )

  const handleOpenOrderLineForm = () => {
    setOpenOrderLineForm(true)
  }

  return (
    <Fragment>
      <Heading text={messages.orderLines} showBorder={false}>
        {!disabledEdit && (
          <div className="flex items-center mr-2">
            <PlusButton
              primary
              type="button"
              buttonSize="large"
              onClick={handleOpenOrderLineForm}
              className="mb-2"
            />
          </div>
        )}
      </Heading>
      {orderLines?.length > 0 && (
        <div className="w-full overflow-hidden">
          <Table
            columns={columns}
            data={orderLines}
            enablePagination
            enableFiltering
            enableFooter
            enablePinning
            className="overflow-x-auto overflow-y-auto"
            headerClassName="whitespace-nowrap sticky"
            rowClassName="whitespace-nowrap group"
            getRowProps={(orderLine, index) => ({
              className: cx(
                orderLine?.isDelivered
                  ? index % 2 === 0
                    ? 'bg-green-200 dark:bg-green-800 '
                    : 'bg-green-100 dark:bg-green-700 '
                  : index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800',
                'transition-colors duration-150 hover:bg-gray-100 hover:dark:bg-gray-700/50'
              )
            })}
          />
        </div>
      )}
      <OrderLineForm open={openOrderLineForm} setOpen={setOpenOrderLineForm} />
    </Fragment>
  )
}

export default OrderLinesTable
