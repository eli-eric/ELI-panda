import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as yup from 'yup'

import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { OrderLineFormComponent } from './OrderLineForm.comp'

const orderLineFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  catalogueNumber: yup.string().required('Catalogue number is required'),
  price: yup.number().nullable().optional(),
  quantity: yup.number().max(100).nullable().optional(),
  system: yup.object().nullable().required('Parent system is required'),
  serialNumbers: yup.string().nullable().optional()
})

// Hook for opening OrderLine modal

const OrderLineModalContent = ({
  orderLine,
  onSave
}: {
  orderLine?: OrderLineFormType
  onSave?: (data: OrderLineFormType) => void
}) => {
  const { formatMessage: fm } = useIntl()
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
            {fm({ id: message.common.buttons.cancel })}
          </Button>
          <Button type="submit">
            {orderLine
              ? fm({ id: message.ordersPage.orderLines.update })
              : fm({ id: message.ordersPage.orderLines.titles.add })}
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
        title: orderLine
          ? message.ordersPage.orderLines.titles.edit
          : message.ordersPage.orderLines.titles.add,
        size: 'xl' as const
      }
    })
  }

  return { openOrderLineModal }
}
