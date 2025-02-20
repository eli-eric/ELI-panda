import { Fragment, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
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
  const orderLines = useWatch({ control, name: 'orderLines' })

  const table = usePandaTable({
    columns,
    data: orderLines,
    tableId: 'orderLines',
    settings: {
      enableFooter: true,
      enableFiltering: true,
      manualFiltering: false,
      enableQueryURL: false,
      enableSorting: true,
      manualSorting: false,
      defaultColumnOrder: [
        'name',
        'partNumber',
        'serialNumber',
        'eun',
        'isDelivered'
      ]
    }
  })

  const handleOpenOrderLineForm = () => {
    setOpenOrderLineForm(true)
  }

  return (
    <Fragment>
      <Heading text={messages.orderLines}>
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
      {orderLines?.length && (
        <div className="flex flex-col max-h-[500px] mb-5">
          <PandaTableControlled
            data={orderLines}
            table={table}
            tableId={'orderLines'}
            className={'relative overflow-x-auto'}
            getRowProps={({ original: { isDelivered } }) => ({
              className: cx(
                isDelivered
                  ? 'bg-green-100 dark:bg-green-700'
                  : 'bg-white dark:bg-gray-800'
              )
            })}
            settings={{
              enableFooter: true,
              enableFiltering: true,
              manualFiltering: false,
              enableQueryURL: false,
              enableSorting: true,
              manualSorting: false
            }}
          />
        </div>
      )}
      <OrderLineForm open={openOrderLineForm} setOpen={setOpenOrderLineForm} />
    </Fragment>
  )
}

export default OrderLinesTable
