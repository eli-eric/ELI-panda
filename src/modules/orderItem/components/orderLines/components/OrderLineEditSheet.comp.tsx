import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/components/form/Form'
import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Button } from '@/components/ui/button'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'

import useOrderLineFormFields from '../form/OrderLineForm.fields'

const orderLineFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  catalogueNumber: z.string().min(1, 'Catalogue number is required'),
  price: z.preprocess(val => {
    if (val === '' || val === null || val === undefined) return null
    const num = Number(val)
    return isNaN(num) ? null : num
  }, z.number().nullable().optional()),
  quantity: z.preprocess(val => {
    if (val === '' || val === null || val === undefined) return null
    const num = Number(val)
    return isNaN(num) ? null : num
  }, z.number().max(100).nullable().optional()),
  system: z
    .object({
      uid: z.string().optional(),
      name: z.string().optional()
    })
    .nullable()
    .refine(val => val !== null && val !== undefined, { message: 'Parent system is required' }),
  serialNumbers: z.string().nullable().optional()
})

interface OrderLineEditSheetProps {
  orderLine: OrderLineFormType
  onSubmit?: (data: OrderLineFormType) => void
  onClose?: () => void
}

export const OrderLineEditSheet = ({
  orderLine,
  onSubmit,
  onClose
}: OrderLineEditSheetProps) => {
  const formFields = useOrderLineFormFields(true)

  const defaultValues = useMemo(
    () => ({
      name: orderLine?.name || '',
      catalogueNumber: orderLine?.catalogueNumber || '',
      catalogueUid: orderLine?.catalogueUid || '',
      price: orderLine?.price || undefined,
      currency: orderLine?.currency || 'EUR',
      quantity: orderLine?.quantity || undefined,
      serialNumbers: orderLine?.serialNumbers || '',
      notes: orderLine?.notes || '',
      location: orderLine?.location || undefined,
      system: orderLine?.system || undefined,
      itemUsage: orderLine?.itemUsage || undefined,
      uuid: orderLine?.uuid || '',
      uid: orderLine?.uid || '',
      eun: orderLine?.eun || '',
      isDelivered: orderLine?.isDelivered || false,
      serviceOrderUid: orderLine?.serviceOrderUid || '',
      serviceItemName: orderLine?.serviceItemName || ''
    }),
    [orderLine]
  )

  const formMethods = useForm<OrderLineFormType>({
    resolver: zodResolver(orderLineFormSchema),
    defaultValues
  })

  const handleSubmit = (data: OrderLineFormType) => {
    // Call the onSubmit prop which comes from modal store
    onSubmit?.(data)
  }

  const handleCancel = () => {
    formMethods.reset()
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <Form formMethods={formMethods}>
          <div className="space-y-6">
            {/* Item Information */}
            <div className="space-y-4">
              <div className="space-y-4">
                <Input {...formFields.name} />

                <Input {...formFields.catalogueNumber} />

                <InputAmountCurrency
                  amountName={formFields.price.name}
                  label="Price"
                  currencyName={formFields.currency.name}
                />

                <Input {...formFields.serialNumbers} />

                <TextArea {...formFields.notes} />
              </div>
            </div>

            {/* Location & System */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Location & System</h3>

              <div className="space-y-4">
                <SelectSystemComboBox
                  selectSystemField={{ ...formFields.system }}
                  disabled={true}
                />

                <SelectLocationCombo locationField={formFields.location} />

                <Listbox {...formFields.itemUsage} />
              </div>
            </div>

            {/* Service Information */}
            {(orderLine?.serviceOrderUid || orderLine?.serviceItemName) && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Service Information</h3>

                <div className="space-y-4">
                  {orderLine?.serviceItemName && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Service:</strong> {orderLine.serviceItemName}
                    </div>
                  )}

                  {orderLine?.eun && (
                    <div className="text-sm text-muted-foreground">
                      <strong>EUN:</strong> {orderLine.eun}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>

      {/* Footer Actions */}
      <div className="border-t bg-background p-6">
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={formMethods.handleSubmit(handleSubmit)}
          >
            Update Order Line
          </Button>
        </div>
      </div>
    </div>
  )
}
