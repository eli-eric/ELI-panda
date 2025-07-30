import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, object, string } from 'yup'

import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { OrderLineFormComponent } from './OrderLineForm.comp'

const orderLineFormSchema = object({
  name: string().required(),
  catalogueNumber: string().required(),
  price: number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable(),
  quantity: number()
    .nullable()
    .max(100)
    .notRequired()
    .transform(value => (Number.isNaN(value) ? null : value)),
  // system: object().nullable().required('Parent system is required field.'),
  serialNumbers: string().nullable()
})

// Hook for opening OrderLine modal

const OrderLineModalContent = ({
  orderLine,
  onSave
}: {
  orderLine?: OrderLineFormType
  onSave?: (data: OrderLineFormType) => void
}) => {
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(
    undefined
  )
  const { closeModal } = useModalGlobalStore()
  const modalSubmit = (data: OrderLineFormType) => {
    // Call the onSave callback if provided
    onSave?.(data)
    formMethods.reset(defaultValues)
    closeModal('dialog1')
  }
  const defaultValues = useMemo(
    () =>
      orderLine
        ? { ...orderLine, currency: orderLine.currency || 'EUR' }
        : {
            itemUsage: {
              uid: 'a2aae89a-5cbe-4042-a726-44012b158226',
              name: 'In System Part'
            }
          },
    [orderLine]
  )
  const formMethods = useForm<OrderLineFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(orderLineFormSchema) as any
  })

  // Function to handle catalogue item selection - directly set form values
  const handleCatalogueItemSelect = useCallback(
    (item: CatalogueItem | undefined) => {
      setCatalogueItem(item)
      if (item) {
        // Directly set form values when item is selected
        formMethods.setValue('name', item.name || '')
        formMethods.setValue('catalogueNumber', item.catalogueNumber || '')
        formMethods.setValue('catalogueUid', item.uid || '')
      }
    },
    [formMethods]
  )

  // Wrapper to match the expected type
  const setItemWrapper = useCallback(
    (value: React.SetStateAction<CatalogueItem | undefined>) => {
      if (typeof value === 'function') {
        setCatalogueItem(prev => {
          const newValue = value(prev)
          if (newValue) {
            // Directly set form values when item is selected
            formMethods.setValue('name', newValue.name || '')
            formMethods.setValue(
              'catalogueNumber',
              newValue.catalogueNumber || ''
            )
            formMethods.setValue('catalogueUid', newValue.uid || '')
          }
          return newValue
        })
      } else {
        handleCatalogueItemSelect(value)
      }
    },
    [handleCatalogueItemSelect, formMethods]
  )

  return (
    <div className="space-y-6 min-w-0 max-w-none w-full">
      {/* Catalogue Table Select */}
      {!orderLine && (
        <div>
          <CatalogueTableSelect
            setItem={setItemWrapper}
            selectedItem={catalogueItem}
          />
        </div>
      )}

      {/* Form */}
      <Form
        formMethods={formMethods}
        onSubmit={modalSubmit}
        enableLeaveWarning={false}
        className=""
      >
        <OrderLineFormComponent
          catalogueItem={catalogueItem}
          orderLine={orderLine}
        />

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              formMethods.reset()
              closeModal('dialog1')
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {orderLine ? 'Update' : 'Add'} Order Line
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const useOrderLineModal = () => {
  const { openModal } = useModalGlobalStore()

  const openOrderLineModal = (
    orderLine?: OrderLineFormType,
    onSave?: (data: OrderLineFormType) => void
  ) => {
    openModal('dialog1', {
      component: () => (
        <OrderLineModalContent orderLine={orderLine} onSave={onSave} />
      ),
      props: {
        title: orderLine ? 'Edit Order Line' : 'Add Order Line',
        size: 'xl' as const
      }
    })
  }

  return { openOrderLineModal }
}
