import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

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
  const { supplier: s, orderStatus: oS, procurementResponsible: pR, requestor: r } = query
  const form = useForm<OrdersFilter>({
    defaultValues: {
      supplier: s ? JSON.parse(s as string) : null,
      orderStatus: oS ? JSON.parse(oS as string) : null,
      procurementResponsible: pR ? JSON.parse(pR as string) : null,
      requestor: r ? JSON.parse(r as string) : null
    }
  })
  const { watch } = form
  const [queryFilter, setQuery] = useState<QueryFilter>({} as QueryFilter)

  const supplier = useDebounce(watch('supplier'), 200)
  const orderStatus = useDebounce(watch('orderStatus'), 200)
  const procurementResponsible = useDebounce(watch('procurementResponsible'), 200)
  const requestor = useDebounce(watch('requestor'), 200)

  useEffect(() => {
    if (supplier) {
      router.replace({ query: { ...query, supplier: JSON.stringify(supplier) } })
      setQuery(prevQuery => ({ ...prevQuery, supplierUID: supplier.uid }))
    } else {
      const { supplier, ...rest } = query // eslint-disable-line
      router.replace({ query: rest })
      setQuery(prevQuery => {
        const { supplierUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [supplier]) // eslint-disable-line

  useEffect(() => {
    if (orderStatus) {
      router.replace({ query: { ...query, orderStatus: JSON.stringify(orderStatus) } })
      setQuery(prevQuery => ({ ...prevQuery, orderStatusUID: orderStatus.uid }))
    } else {
      const { orderStatus, ...rest } = query // eslint-disable-line
      router.replace({ query: rest })
      setQuery(prevQuery => {
        const { orderStatusUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [orderStatus]) // eslint-disable-line

  useEffect(() => {
    if (procurementResponsible) {
      router.replace({ query: { ...query, procurementResponsible: JSON.stringify(procurementResponsible) } })
      setQuery(prevQuery => ({ ...prevQuery, procurementResponsibleUID: procurementResponsible.uid }))
    } else {
      const { procurementResponsible, ...rest } = query // eslint-disable-line
      router.replace({ query: rest })
      setQuery(prevQuery => {
        const { procurementResponsibleUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [procurementResponsible]) // eslint-disable-line

  useEffect(() => {
    if (requestor) {
      router.replace({ query: { ...query, requestor: JSON.stringify(requestor) } })
      setQuery(prevQuery => ({ ...prevQuery, requestorUID: requestor.uid }))
    } else {
      const { requestor, ...rest } = query // eslint-disable-line
      router.replace({ query: rest })
      setQuery(prevQuery => {
        const { requestorUID, ...rest } = prevQuery // eslint-disable-line
        return rest
      })
    }
  }, [requestor]) // eslint-disable-line

  const getOrdersFilter = () => (
    <FormProvider {...form}>
      <form className="max-[1250px]:hidden w-[1000px] flex gap-x-2">
        <ListBox
          register={form.register}
          name="orderStatus"
          placeholder="Order Status"
          codebook={CODEBOOK.ORDER_STATUS}
          emptyOption={true}
          emptyOptionName="All Order statuses"
        />
        <ComboboxComponent
          register={form.register}
          name="supplier"
          placeholder="Supplier"
          codebook={CODEBOOK.SUPPLIER}
          isObject={true}
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
          codebook={CODEBOOK.EMPLOYEE}
          isObject={true}
        />
      </form>
    </FormProvider>
  )

  return { getOrdersFilter, queryFilter }
}

export default useOrdersFilter
