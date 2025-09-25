import type { UseFormReset } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'

interface OrdersFilterFooterProps {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaultFormValues: any
}

export const OrdersFilterFooter = ({
  tableId,
  enableQueryURL,
  resetForm,
  defaultFormValues
}: OrdersFilterFooterProps) => {
  const { setColumnFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: enableQueryURL
  })

  const handleClearFilters = () => {
    resetForm(defaultFormValues, { keepValues: false })
    setColumnFilters([])
  }

  return (
    <div className="flex flex-col gap-4 pt-4 border-t">
      <FilterSaveSettings
        tableId={tableId}
        enableQueryURL={enableQueryURL}
        resetForm={resetForm}
        defaulFormValues={defaultFormValues}
      />
      <Button
        type="button"
        className="w-full justify-center"
        onClick={handleClearFilters}
      >
        Clear filters
      </Button>
    </div>
  )
}