import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { object, string } from 'yup'

import { Button } from '@/components/Buttons'
import useFormModal from '@/hooks/useFormModal'
import useGeneralTable from '@/hooks/useGeneralTable'
import CatalogueSearchTable from '@/modules/systems/components/sections/catalogueItemSection/components/CatalogueSearchTable'

import { OrderLine } from '../../types'
import OrderLineItemForm from './form/OrderLine.form'

interface OrderLinesTableProps {
  orderLines?: OrderLine[]
}

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  system: string(),
  orderNumber: string(),
  price: string(),
  quantity: string()
})

const OrderLinesTable = ({ orderLines }: OrderLinesTableProps) => {
  const columns = useMemo(
    (): Column<OrderLine>[] => [
      {
        Header: 'Actions',
        Cell: () => <div>Buttons</div>
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
        Cell: ({ value }: CellProps<OrderLine>) => <span>{value.name}</span>
      },
      {
        Header: 'Price',
        accessor: 'price'
      }
    ],
    []
  )

  const { getTable } = useGeneralTable({ columns, data: orderLines, tableId: 'orderLines', className: 'col-span-6' })

  const modalSubmit = (data: OrderLine) => {
    // set data to order form of parent component
    console.log(data)
  }

  const { setOpen, FormModal } = useFormModal<OrderLine>({
    renderForm: () => <OrderLineItemForm />,
    renderOutsideForm: () => <CatalogueSearchTable setItem={() => {}} />,
    onSubmit: modalSubmit,
    schema: orderLineFormSchema
  })
  return (
    <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between">
      <div className="flex items-center mr-2">
        <Button
          primary
          onClick={() => {
            setOpen(true)
          }}
        >
          Add Order line
        </Button>
      </div>
      <div className="grid grid-cols-12">{getTable()}</div>
      <FormModal />
    </div>
  )
}

export default OrderLinesTable
