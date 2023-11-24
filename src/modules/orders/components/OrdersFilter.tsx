import type { Options} from 'next-usequerystate';
import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useDebounce } from 'usehooks-ts'

import Combobox from '@/components/form/Combobox'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import useTableStateStore from '@/store/useTableStateStore'
import { CODEBOOK } from '@/types/constants/codebook'

import type { QueryFilter } from '../types'

type OrdersFilterForm = {
  supplier: CodebookType
  orderStatus: CodebookType
  procurementResponsible: CodebookType
  requestor: CodebookType
}

//TODO: 1. Create a new file in src/hooks/table/useOrdersFilter.tsx
//TODO: 2. Refactor the code to use the new useQueryState hook

const ordersFilterMessages = message.ordersPage.orderDetail.form

export const OrdersFilter = () => {
  const { setFilter, instances } = useTableStateStore()
  const filter = instances.orders?.filter
  const { formatMessage: fm } = useIntl()

  const [querySupplier, setQuerySupplier] = useQueryState(
    'supplier',
    {defaultValue: JSON.stringify(filter?.supplier)}
  )
  const [queryOrderStatus, setQueryOrderStatus] = useQueryState(
    'orderStatus',
    {defaultValue:JSON.stringify(filter?.orderStatus)}
  )
  const [queryProcurementResponsible, setQueryProcurementResponsible] = useQueryState(
    'procurementResponsible',
    {defaultValue:JSON.stringify(filter?.procurementResponsible)}
  )
  const [queryRequestor, setQueryRequestor] = useQueryState(
    'requestor',
    {defaultValue:JSON.stringify(filter?.requestor)}
  )
  const form = useForm<OrdersFilterForm>({
    defaultValues: {
      supplier: querySupplier ? JSON.parse(querySupplier) : filter?.supplier ? filter.supplier : null,
      orderStatus: queryOrderStatus ? JSON.parse(queryOrderStatus) : filter?.orderStatus ? filter.orderStatus : null,
      procurementResponsible: queryProcurementResponsible
        ? JSON.parse(queryProcurementResponsible)
        : filter?.procurementResponsible
        ? filter.procurementResponsible
        : null,
      requestor: queryRequestor ? JSON.parse(queryRequestor) : filter?.requestor ? filter.supplier : null
    }
  })
  const [queryFilter, setQuery] = useState<QueryFilter>({} as QueryFilter)

  const { control } = form

  const supplier = useDebounce(useWatch({ control, name: 'supplier' }), 300)
  const orderStatus = useDebounce(useWatch({ control, name: 'orderStatus' }), 300)
  const procurementResponsible = useDebounce(useWatch({ control, name: 'procurementResponsible' }), 300)
  const requestor = useDebounce(useWatch({ control, name: 'requestor' }), 300)

  useEffect(() => {
    setFilter('orders', queryFilter)
  }, [queryFilter, setFilter])

  const handleFieldUpdate = (
    fieldName: string,
    fieldCodebook: CodebookType,
    setFieldQuery: (value: string | ((old: string) => string | null) | null, options?: Options | undefined) => Promise<URLSearchParams>
  ) => {
    const fieldUIDKey = fieldName
    if (fieldCodebook) {
      setFieldQuery(() => JSON.stringify(fieldCodebook), { shallow: false })
      setQuery(prevQuery => ({ ...prevQuery, [fieldUIDKey]: fieldCodebook }))
    } else {
      setFieldQuery(() => null)
      setQuery(prevQuery => {
        const rest = {}
        for (const key in prevQuery) {
          if (key !== fieldUIDKey) {
            rest[key] = prevQuery[key]
          }
        }
        return rest
      })
    }
  }

  useEffect(() => {
    handleFieldUpdate('supplier', supplier, setQuerySupplier)
  }, [supplier, setQuerySupplier])

  useEffect(() => {
    handleFieldUpdate('orderStatus', orderStatus, setQueryOrderStatus)
  }, [orderStatus, setQueryOrderStatus])

  useEffect(() => {
    handleFieldUpdate('procurementResponsible', procurementResponsible, setQueryProcurementResponsible)
  }, [procurementResponsible, setQueryProcurementResponsible])

  useEffect(() => {
    handleFieldUpdate('requestor', requestor, setQueryRequestor)
  }, [requestor, setQueryRequestor])

  return (
    <FormProvider {...form}>
      <form className="max-[1250px]:hidden w-[1000px] flex gap-x-2">
        <Grid>
          <Col>
            <Listbox
              name="orderStatus"
              placeholder={fm({ id: ordersFilterMessages.orderStatus.label })}
              codebook={CODEBOOK.ORDER_STATUS}
              allowEmptyOption={true}
              emptyOption="All Order statuses"
            />
          </Col>
          <Col>
            <Combobox
              name="supplier"
              placeholder={fm({ id: ordersFilterMessages.supplier.label })}
              codebook={CODEBOOK.SUPPLIER}
            />
          </Col>
          <Col>
            <Listbox
              name="procurementResponsible"
              placeholder={fm({ id: ordersFilterMessages.procurementResponsible.label })}
              codebook={CODEBOOK.PROCUREMENTER}
              allowEmptyOption={true}
              emptyOption="All Procurement Responsibles"
            />
          </Col>
          <Col>
            <Combobox
              name="requestor"
              placeholder={fm({ id: ordersFilterMessages.requestor.label })}
              codebook={CODEBOOK.EMPLOYEE}
            />
          </Col>
        </Grid>
      </form>
    </FormProvider>
  )
}
