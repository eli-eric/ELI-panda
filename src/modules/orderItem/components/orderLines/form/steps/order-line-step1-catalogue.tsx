import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import type { CatalogueItem } from '@/types/responses/catalogue'

interface OrderLineStep1Props {
  handleNext: () => void
  isProcessing: boolean
  hasSelectedItem: boolean
}

export const OrderLineStep1Catalogue = ({
  handleNext,
  isProcessing,
  hasSelectedItem
}: OrderLineStep1Props) => {
  const { formatMessage: fm } = useIntl()
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | undefined>()
  const { setValue } = useFormContext<OrderLineFormType>()

  // Handle catalogue item selection - auto-fill form values
  const handleItemSelect = useCallback(
    (value: React.SetStateAction<CatalogueItem | undefined>) => {
      // Handle both direct value and function updater
      if (typeof value === 'function') {
        setSelectedItem(prev => {
          const newValue = value(prev)
          if (newValue) {
            // Auto-fill form values when item is selected
            setValue('name', newValue.name || '')
            setValue('catalogueNumber', newValue.catalogueNumber || '')
            setValue('catalogueUid', newValue.uid || '')
          }
          return newValue
        })
      } else {
        setSelectedItem(value)
        if (value) {
          // Auto-fill form values when item is selected
          setValue('name', value.name || '')
          setValue('catalogueNumber', value.catalogueNumber || '')
          setValue('catalogueUid', value.uid || '')
        }
      }
    },
    [setValue]
  )

  return (
    <div>
      <CatalogueTableSelect
        setItem={handleItemSelect}
        selectedItem={selectedItem}
      />

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          type="button"
          onClick={handleNext}
          disabled={isProcessing}
          variant={hasSelectedItem ? 'default' : 'outline'}
        >
          {hasSelectedItem
            ? fm({ id: message.common.buttons.next })
            : fm({
                id: message.ordersPage.orderLines.wizard.steps.step1
                  .continueWithoutSelection
              })}
        </Button>
      </div>
    </div>
  )
}
