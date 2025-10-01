import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'

interface CatalogueFilterFooterProps {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaultFormValues: any
}

export const CatalogueFilterFooter = ({
  tableId,
  enableQueryURL,
  resetForm,
  defaultFormValues
}: CatalogueFilterFooterProps) => {
  const { formatMessage: fm } = useIntl()
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
        {fm({ id: message.common.ui.clearFilters })}
      </Button>
    </div>
  )
}