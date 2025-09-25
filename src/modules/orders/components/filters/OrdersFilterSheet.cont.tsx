import { useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'

import { OrdersFilter } from './OrdersFilter'
import { OrdersFilterFooter } from './OrdersFilterFooter.comp'

type OrderFilterType = {
  name: string
  orderNumber: string
  requestNumber: string
  contractNumber: string
  supplier: string
  requestor: string
  procurementResponsible: string
  orderStatus: string[]
  notes: string
  orderDate: string
  lastUpdateTime: string
  lastUpdateBy: string
}

interface OrdersFilterSheetProps {
  tableId: string
  enableQueryURL: boolean
}

export const OrdersFilterSheet = ({
  tableId,
  enableQueryURL
}: OrdersFilterSheetProps) => {
  const defaultValues = useMemo<OrderFilterType>(
    () => ({
      name: '',
      orderNumber: '',
      requestNumber: '',
      contractNumber: '',
      supplier: '',
      requestor: '',
      procurementResponsible: '',
      orderStatus: [],
      notes: '',
      orderDate: '',
      lastUpdateTime: '',
      lastUpdateBy: ''
    }),
    []
  )

  const formMethods = useFormFilter<OrderFilterType>({
    tableId,
    defValues: defaultValues,
    enableQueryURL: enableQueryURL
  })

  return (
    <Form
      className="flex flex-col h-full justify-between"
      formMethods={formMethods}
    >
      <OrdersFilter />
      <OrdersFilterFooter
        tableId={tableId}
        enableQueryURL={enableQueryURL}
        resetForm={formMethods.reset}
        defaultFormValues={defaultValues}
      />
    </Form>
  )
}