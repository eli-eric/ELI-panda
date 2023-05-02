import { useMemo, useState } from 'react'
import { CellProps, Column } from 'react-table'
import { object, string } from 'yup'

import { Button } from '@/components/Buttons'
import useFormModal from '@/hooks/useFormModal'
import useGeneralTable from '@/hooks/useGeneralTable'
import CatalogueSearchTable from '@/modules/systems/components/sections/catalogueItemSection/components/CatalogueSearchTable'
import { CatalogueItem } from '@/types/responses'

import { OrderLineFormType } from '../../types'
import OrderLineItemForm from './form/OrderLine.form'

interface OrderLinesTableProps {
  orderLines?: OrderLineFormType[]
}

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  orderNumber: string(),
  price: string(),
  quantity: string()
})

const OrderLinesTable = ({ orderLines }: OrderLinesTableProps) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined)

  const columns = useMemo(
    (): Column<OrderLineFormType>[] => [
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
        Cell: ({ value }: CellProps<OrderLineFormType>) => <span>{value.name}</span>
      },
      {
        Header: 'Price',
        accessor: 'price'
      }
    ],
    []
  )

  const { getTable } = useGeneralTable({ columns, data: orderLines, tableId: 'orderLines', className: 'col-span-6' })

  const modalSubmit = (data: OrderLineFormType) => {
    // set data to order form of parent component
    console.log(data)
  }

  const { setOpen, getFormModal } = useFormModal<OrderLineFormType>({
    renderForm: () => <OrderLineItemForm catalogueItem={catalogueItem} />,
    renderOutsideForm: () => <CatalogueSearchTable setItem={setCatalogueItem} itemName={catalogueItem?.name} />,
    onSubmit: modalSubmit,
    schema: orderLineFormSchema,
    defaultValues: {
      system: { name: 'CS built-in - Technological units', uid: '229d1a7d-7b9a-4df9-bc7e-685638b23c80' }
    }
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
      {getFormModal()}
    </div>
  )
}

export default OrderLinesTable
