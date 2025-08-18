import { sortBy } from 'lodash'
import { useCallback,useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { ServiceLine } from '@/modules/orderItem/types/form'

import { DetailPropertiesList } from '../form/details/detail-properties.list'
import { useServiceLineFields } from '../form/hooks/useServiceLineFields'

interface ServiceLineEditSheetProps {
  serviceLine: ServiceLine
  onSubmit?: (data: ServiceLine) => void
  onClose?: () => void
}

export const ServiceLineEditSheet: React.FC<ServiceLineEditSheetProps> = ({
  serviceLine,
  onSubmit,
  onClose
}) => {
  const fields = useServiceLineFields()
  const formMethods = useForm<ServiceLine>({
    defaultValues: {
      uuid: serviceLine.uuid,
      uid: serviceLine.uid,
      name: serviceLine.name,
      price: serviceLine.price,
      currency: serviceLine.currency,
      serviceType: serviceLine.serviceType,
      notes: serviceLine.notes,
      item: serviceLine.item,
      eun: serviceLine.eun,
      isDelivered: serviceLine.isDelivered,
      details: Array.isArray(serviceLine.details) ? serviceLine.details : []
    }
  })

  const handleSubmit = useCallback((data: ServiceLine) => {
    const dataToSave = {
      ...data,
      details: Array.isArray(data.details) ? data.details : []
    }
    // Call the onSubmit prop which comes from modal store
    onSubmit?.(dataToSave)
  }, [onSubmit])

  const handleCancel = useCallback(() => {
    formMethods.reset()
    onClose?.()
  }, [formMethods, onClose])

  // Transform details for properties list - memoized to prevent infinite loops
  const details = formMethods.watch('details') ?? []
  const detailsMap = useMemo(() => {
    const map = Array.isArray(details)
      ? details.reduce((map, detail) => {
          if (!detail?.propertyGroup) return map
          const group = detail.propertyGroup
          if (!map.has(group)) {
            map.set(group, [])
          }
          map.get(group)?.push(detail)
          return map
        }, new Map<string, CatalogueItemDetail[]>())
      : new Map<string, CatalogueItemDetail[]>()

    // Sort properties within each group
    map.forEach((properties, group) => {
      map.set(group, sortBy(properties, ['property.name']))
    })

    return map
  }, [details])

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <Form formMethods={formMethods}>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div className="space-y-4">
                <Input {...fields.name} />
                
                <Listbox {...fields.serviceType} disabled />
                
                <InputAmountCurrency
                  amountName={fields.price.name}
                  label={fields.price.label}
                  currencyName={fields.currency.name}
                />
                
                <TextArea {...fields.notes} />
              </div>
            </div>

            {/* Details Properties */}
            {detailsMap.size > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Properties</h3>
                <DetailPropertiesList groupMap={detailsMap} disabled={false} />
              </div>
            )}
          </div>
        </Form>
      </div>

      {/* Footer Actions */}
      <div className="border-t bg-background p-6">
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={formMethods.handleSubmit(handleSubmit)}
          >
            Update Service Line
          </Button>
        </div>
      </div>
    </div>
  )
}