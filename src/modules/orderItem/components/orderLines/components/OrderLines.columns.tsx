import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'
import type { CellProps, Column, FooterProps } from 'react-table'

import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types'

import { OrderisDeliveredAction, OrderLineActionButtons } from './OrderLine.actions'

const messages = message.ordersPage.orderLines.orderLinesTable.header

interface Props {
  setOrderLine: (orderLines: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  disabledEdit?: boolean
}

const useOrderLinesColumns = ({ setOrderLine, deleteOrderLine, disabledEdit }: Props) => {
  const uid = useRouter().query.uid as string
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
        ),
        Footer: ({ rows }: FooterProps<OrderLineFormType>) => {
          const total = rows.reduce((sum, { original: { price } }) => sum + (price || 0), 0)
          return (
            <Fragment>
              {rows.length > 0 && (
                <div className="flex flex-col">
                  <span className="font-medium">{'Total:'}</span>
                  <span className="font-medium">{`${total} ${rows[0].original.currency}`}</span>
                </div>
              )}
            </Fragment>
          )
        }
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

  return columns
}

export default useOrderLinesColumns
