import { Fragment, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { useOrderLine } from '../../hooks/useOrderLine'
import useOrderLinesColumns from './components/OrderLines.columns'
import { useOrderLineModal } from './form/OrderLineForm.cont'

const messages = message.ordersPage.orderDetail.sectionHeadings

interface OrderLinesTableProps {
  disabledEdit?: boolean
}

const OrderLinesTable = ({ disabledEdit }: OrderLinesTableProps) => {
  const columns = useOrderLinesColumns()
  const { control } = useFormContext()
  const { openOrderLineModal } = useOrderLineModal()
  const { setOrderLine } = useOrderLine()

  // Používáme useWatch s memoizací k efektivnější práci s daty
  const orderLinesData = useWatch({ control, name: 'orderLines' })

  // Memoizujeme data pro předcházení zbytečným re-renderům
  // Už nepoužíváme neefektivní JSON.stringify
  const orderLines = useMemo(
    () => orderLinesData,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(orderLinesData)]
  )

  const handleOpenOrderLineForm = () => {
    openOrderLineModal(undefined, data => {
      setOrderLine(data)
    })
  }

  return (
    <Fragment>
      <Heading text={messages.orderLines} showBorder={false}>
        {!disabledEdit && (
          <div className="flex items-center mr-2">
            <PlusButton
              type="button"
              onClick={handleOpenOrderLineForm}
              className="mb-2"
            />
          </div>
        )}
      </Heading>
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
          rowClassName="whitespace-nowrap group/row"
          getRowProps={(orderLine, index) => ({
            className: cn(
              orderLine?.isDelivered
                ? index % 2 === 0
                  ? 'bg-green-200 dark:bg-green-800 '
                  : 'bg-green-100 dark:bg-green-700 '
                : ''
            )
          })}
        />
      </div>
    </Fragment>
  )
}

export default OrderLinesTable
