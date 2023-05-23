import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import ComboboxComponent from '@/components/form/Combobox'
import ListBox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import useTableStateStore from '@/store/useTableStateStore'
import { CODEBOOK } from '@/types/constants/codebook'

import type { QueryFilter } from '../types'

type OrdersFilter = {
  supplier: CodebookType
  orderStatus: CodebookType
  procurementResponsible: CodebookType
  requestor: CodebookType
}

//TODO: 1. Create a new file in src/hooks/table/useOrdersFilter.tsx
//TODO: 2. Refactor the code to use the new useQueryState hook

const useOrdersFilter = () => {
  const [querySupplier, setQuerySupplier] = useQueryState('supplier')
  const [queryOrderStatus, setQueryOrderStatus] = useQueryState('orderStatus')
  const [queryProcurementResponsible, setQueryProcurementResponsible] = useQueryState('procurementResponsible')
  const [queryRequestor, setQueryRequestor] = useQueryState('requestor')
  const form = useForm<OrdersFilter>({
    defaultValues: {
      supplier: querySupplier ? JSON.parse(querySupplier) : null,
      orderStatus: queryOrderStatus ? JSON.parse(queryOrderStatus) : null,
      procurementResponsible: queryProcurementResponsible ? JSON.parse(queryProcurementResponsible) : null,
      requestor: queryRequestor ? JSON.parse(queryRequestor) : null
    }
  })
  const { watch } = form
  const [queryFilter, setQuery] = useState<QueryFilter>({} as QueryFilter)

  const supplier = useDebounce(watch('supplier'), 200)
  const orderStatus = useDebounce(watch('orderStatus'), 200)
  const procurementResponsible = useDebounce(watch('procurementResponsible'), 200)
  const requestor = useDebounce(watch('requestor'), 200)

  const { setFilter } = useTableStateStore()

  useEffect(() => {
    setFilter('orders', queryFilter)
  }, [queryFilter, setFilter])

  useEffect(() => {
    if (supplier) {
      setQuerySupplier(JSON.stringify(supplier))
      setQuery(prevQuery => ({ ...prevQuery, supplierUID: supplier.uid }))
    } else {
      setQuerySupplier(null)
      setQuery(prevQuery => {
        const { supplierUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [supplier]) // eslint-disable-line

  useEffect(() => {
    if (orderStatus) {
      setQueryOrderStatus(JSON.stringify(orderStatus))
      setQuery(prevQuery => ({ ...prevQuery, orderStatusUID: orderStatus.uid }))
    } else {
      setQueryOrderStatus(null)
      setQuery(prevQuery => {
        const { orderStatusUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [orderStatus]) // eslint-disable-line

  useEffect(() => {
    if (procurementResponsible) {
      setQueryProcurementResponsible(JSON.stringify(procurementResponsible))
      setQuery(prevQuery => ({ ...prevQuery, procurementResponsibleUID: procurementResponsible.uid }))
    } else {
      setQueryProcurementResponsible(null)
      setQuery(prevQuery => {
        const { procurementResponsibleUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [procurementResponsible]) // eslint-disable-line

  useEffect(() => {
    if (requestor) {
      setQueryRequestor(JSON.stringify(requestor))
      setQuery(prevQuery => ({ ...prevQuery, requestorUID: requestor.uid }))
    } else {
      setQueryRequestor(null)
      setQuery(prevQuery => {
        const { requestorUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [requestor]) // eslint-disable-line

  const getOrdersFilter = () => (
    <FormProvider {...form}>
      <form className="max-[1250px]:hidden w-[1000px] flex gap-x-2">
        <Grid>
          <Col>
            <ListBox
              register={form.register}
              name="orderStatus"
              placeholder="Order Status"
              codebook={CODEBOOK.ORDER_STATUS}
              emptyOption={true}
              emptyOptionName="All Order statuses"
            />
          </Col>
          <Col>
            <ComboboxComponent
              register={form.register}
              name="supplier"
              placeholder="Supplier"
              codebook={CODEBOOK.SUPPLIER}
              isObject={true}
            />
          </Col>
          <Col>
            <ListBox
              register={form.register}
              name="procurementResponsible"
              className="min-w-100"
              placeholder="Procurement Responsible"
              codebook={CODEBOOK.PROCUREMENTER}
              emptyOption={true}
              emptyOptionName="All Procurement Responsibles"
            />
          </Col>
          <Col>
            <ComboboxComponent
              register={form.register}
              name="requestor"
              placeholder="Requestor"
              codebook={CODEBOOK.EMPLOYEE}
              isObject={true}
            />
          </Col>
        </Grid>
      </form>
    </FormProvider>
  )

  return { getOrdersFilter }
}

export default useOrdersFilter
