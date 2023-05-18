import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import ListBox from '@/components/form/Listbox'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'

type OrdersFilter = {
  supplier: CodebookType
  orderStatus: CodebookType
  procurementResponsible: CodebookType
  requestor: CodebookType
}

type QueryFilter = {
  supplierUID?: string
  orderStatusUID?: string
  procurementResponsibleUID?: string
  requestorUID?: string
}

const useOrdersFilter = () => {
  const router = useRouter()
  const { query } = router
  const form = useForm<OrdersFilter>()
  const { watch } = form
  const [queryFilter, setQuery] = useState<QueryFilter>()

  const supplier = watch('supplier')
  const orderStatus = watch('orderStatus')
  const procurementResponsible = watch('procurementResponsible')
  const requestor = watch('requestor')

  useEffect(() => {
    const queryFilter: QueryFilter = {
      supplierUID: supplier?.uid,
      orderStatusUID: orderStatus?.uid,
      procurementResponsibleUID: procurementResponsible?.uid,
      requestorUID: requestor?.uid
    }
    const newQuery = { ...query }
    if (supplier?.uid) {
      newQuery.supplierUID = supplier?.uid
    } else {
      delete newQuery.supplierUID
      delete queryFilter.supplierUID
    }
    if (orderStatus?.uid) {
      newQuery.orderStatusUID = orderStatus?.uid
    } else {
      delete newQuery.orderStatusUID
      delete queryFilter.orderStatusUID
    }
    if (procurementResponsible?.uid) {
      newQuery.procurementResponsibleUID = procurementResponsible?.uid
    } else {
      delete newQuery.procurementResponsibleUID
      delete queryFilter.procurementResponsibleUID
    }
    if (requestor?.uid) {
      newQuery.requestorUID = requestor?.uid
    } else {
      delete newQuery.requestorUID
      delete queryFilter.requestorUID
    }
    router.replace({ query: newQuery })

    setQuery(queryFilter)
  }, [supplier, orderStatus, procurementResponsible, requestor]) // eslint-disable-line react-hooks/exhaustive-deps

  const getOrdersFilter = () => (
    <div className="w-[800] lg:w-[1200px] flex gap-x-2">
      <FormProvider {...form}>
        <ComboboxComponent
          register={form.register}
          name="supplier"
          placeholder="Supplier"
          codebook={CODEBOOK.SUPPLIER}
          isObject={true}
        />
        <ListBox
          register={form.register}
          name="orderStatus"
          placeholder="Order Status"
          codebook={CODEBOOK.ORDER_STATUS}
          emptyOption={true}
          emptyOptionName="All Order statuses"
        />
        <ListBox
          register={form.register}
          name="procurementResponsible"
          className="min-w-100"
          placeholder="Procurement Responsible"
          codebook={CODEBOOK.PROCUREMENTER}
          emptyOption={true}
          emptyOptionName="All Procurement Responsibles"
        />
        <ComboboxComponent
          register={form.register}
          name="requestor"
          placeholder="Requestor"
          codebook={CODEBOOK.USER}
          isObject={true}
        />
      </FormProvider>
    </div>
  )

  return { getOrdersFilter, queryFilter }
}

export default useOrdersFilter
