import { useEffect, useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import type { CodebookType } from '@/types/responses/codebook'

import { useMinMaxPrice } from '../../hooks/useMinMaxPrice'
import { SystemsFilterForm } from './form/SystemsFilter.form'
import type { DisabledFields } from './SystemsFilterButton.cont'
import { SystemsFilterFooter } from './SystemsFilterFooter.comp'

type SystemFilterType = {
  name: string
  systemLevel: string[]
  systemCode: string
  systemType: CodebookType | null
  zone: CodebookType | null
  location: CodebookType | null
  responsible: CodebookType | null
  description: string
  importance: CodebookType | null
  itemUsage: string[]
  eun: string
  order: string
  serialNumber: string
  catalogueName: string
  catalogueNumber: string
  category: CodebookType | null
  catalogueDescription: string
  supplier: CodebookType | null
  price: [number | undefined, number | undefined]
  parentSystem: CodebookType | null
}

interface SystemsFilterSheetProps {
  tableId: string
  enableQueryURL: boolean
  disabledFields?: DisabledFields
}

export const SystemsFilterSheet = ({
  tableId,
  enableQueryURL,
  disabledFields
}: SystemsFilterSheetProps) => {
  const { minMaxPrice } = useMinMaxPrice()

  const defaultValues = useMemo<SystemFilterType>(
    () => ({
      name: '',
      systemLevel: [],
      systemCode: '',
      systemType: null,
      zone: null,
      location: null,
      responsible: null,
      description: '',
      importance: null,
      itemUsage: [],
      eun: '',
      order: '',
      serialNumber: '',
      catalogueName: '',
      catalogueNumber: '',
      category: null,
      catalogueDescription: '',
      supplier: null,
      parentSystem: null,
      price: [minMaxPrice?.min, minMaxPrice?.max]
    }),
    [minMaxPrice]
  )

  const formMethods = useFormFilter<SystemFilterType>({
    tableId,
    defValues: defaultValues,
    enableQueryURL: enableQueryURL
  })

  const { toggleDeleteCustom } = useFormControlStore()
  const { watch } = formMethods

  const category = watch('category')

  useEffect(() => {
    if (!category) {
      toggleDeleteCustom()
    }
  }, [category, toggleDeleteCustom])

  return (
    <Form
      className="flex flex-col h-full justify-between"
      formMethods={formMethods}
    >
      <SystemsFilterForm
        tableId={tableId}
        enableQueryUrl={enableQueryURL}
        disabledFields={disabledFields}
      />
      <SystemsFilterFooter
        tableId={tableId}
        enableQueryURL={enableQueryURL}
        resetForm={formMethods.reset}
        defaultFormValues={defaultValues}
      />
    </Form>
  )
}
