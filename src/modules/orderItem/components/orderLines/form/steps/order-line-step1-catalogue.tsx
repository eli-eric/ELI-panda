import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { CatalogueItemSelect } from '@/modules/shared/catalogue/select/CatalogueItemSelect'
import { TABLE_IDS } from '@/types/constants/tableIds'
import type { CatalogueItem } from '@/types/responses/catalogue'

interface OrderLineStep1Props {
  handleNext: () => void
  isProcessing: boolean
}

export const OrderLineStep1Catalogue = ({
  handleNext,
  isProcessing
}: OrderLineStep1Props) => {
  const { formatMessage: fm } = useIntl()
  const { setValue, watch } = useFormContext<OrderLineFormType>()

  // Read selected catalogue item from form state (single source of truth)
  const selectedCatalogueItem = watch('_selectedCatalogueItem') as
    | CatalogueItem
    | undefined

  // Derive hasSelectedItem from form state
  const hasSelectedItem = Boolean(selectedCatalogueItem)

  // Handle catalogue item selection - save to form state
  const handleItemSelect = (item: CatalogueItem | undefined) => {
    // Save entire item to form state for persistence
    setValue('_selectedCatalogueItem', item)
    if (item) {
      // Auto-fill form values when item is selected
      setValue('name', item.name || '')
      setValue('catalogueNumber', item.catalogueNumber || '')
      setValue('catalogueUid', item.uid || '')
    } else {
      // Clear form values when item is deselected
      setValue('catalogueUid', '')
    }
  }

  return (
    <div>
      <CatalogueItemSelect
        selectedItem={selectedCatalogueItem}
        onSelect={handleItemSelect}
        tableId={TABLE_IDS.CATALOGUE_ITEM_SELECT}
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
