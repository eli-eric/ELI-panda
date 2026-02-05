import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import type { CatalogueItem as CatalogueItemAPI } from '@/modules/catalogueItem/types/responses'
import { mapAPIItemToUIItem } from '@/modules/catalogueItem/utils/catalogueItemAdapter'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { UseItemCreateDialog } from '@/modules/shared/catalogue/create/use-item-create.dialog'
import { CatalogueItemSelect } from '@/modules/shared/catalogue/select/CatalogueItemSelect'
import { TABLE_IDS } from '@/types/constants/tableIds'
import type { CatalogueItem } from '@/types/responses/catalogue'

interface OrderLineStep1Props {
    handleNext: () => void
    isProcessing: boolean
}

export const OrderLineStep1Catalogue = ({ handleNext, isProcessing }: OrderLineStep1Props) => {
    const { formatMessage: fm } = useIntl()
    const { setValue, watch } = useFormContext<OrderLineFormType>()
    const openCreateDialog = UseItemCreateDialog()
    const [isApplyingFilter, setIsApplyingFilter] = useState(false)

    // Table filter state for applying UID filter
    const { setColumnFilters } = useFormFilterState({
        tableId: TABLE_IDS.CATALOGUE_ITEM_SELECT,
        enableQueryUrl: false,
    })

    // Read selected catalogue item from form state (single source of truth)
    const selectedCatalogueItem = watch('_selectedCatalogueItem') as CatalogueItem | undefined

    // Derive hasSelectedItem from form state
    const hasSelectedItem = Boolean(selectedCatalogueItem)

    // Handle catalogue item selection - save to form state
    const handleItemSelect = useCallback(
        (item: CatalogueItem | undefined) => {
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

                // Clear itemUID filter so table shows all items again
                setColumnFilters(prev => prev.filter(f => f.id !== 'itemUID'))
            }
        },
        [setValue, setColumnFilters],
    )

    // Handle newly created item - filter to show it and select it
    const handleItemCreated = useCallback(
        (item: CatalogueItemAPI) => {
            setIsApplyingFilter(true)

            // Apply UID filter to show only the newly created item
            setColumnFilters([{ id: 'itemUID', value: item.uid }])

            // Convert API type to UI type and select the newly created item
            const uiItem = mapAPIItemToUIItem(item)
            handleItemSelect(uiItem)

            // Reset filter applying state after a short delay
            // to allow the table to update
            setTimeout(() => setIsApplyingFilter(false), 500)
        },
        [setColumnFilters, handleItemSelect],
    )

    return (
        <div>
            <CatalogueItemSelect
                selectedItem={selectedCatalogueItem}
                onSelect={handleItemSelect}
                tableId={TABLE_IDS.CATALOGUE_ITEM_SELECT}
                pageSizeDefault={10}
                right={
                    <Button
                        onClick={() => openCreateDialog(handleItemCreated)}
                        disabled={isApplyingFilter}
                    >
                        <FormattedMessage
                            id={
                                message.ordersPage.orderLines.wizard.steps.step1
                                    .createCatalogueEntry
                            }
                        />
                    </Button>
                }
            />

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Tooltip
                    content={
                        hasSelectedItem
                            ? undefined
                            : 'Please select or create a catalogue item to proceed.'
                    }
                >
                    <div>
                        <Button
                            type="button"
                            onClick={handleNext}
                            disabled={!hasSelectedItem || isProcessing}
                            variant={'default'}
                        >
                            {fm({ id: message.common.buttons.next })}
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}
