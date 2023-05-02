import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { InputWithError } from '@/components/form/Input'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { CatalogueItem } from '@/types/responses'

import useOrderLinesFormFields from './OrderLine.fields'

const OrderLineForm = ({ catalogueItem }: { catalogueItem?: CatalogueItem }) => {
  const formFields = useOrderLinesFormFields()
  const { setValue, watch } = useFormContext<OrderLineFormType>()

  const system = watch('system')
  useEffect(() => {
    setValue('name', catalogueItem?.name || '')
    setValue('catalogueNumber', catalogueItem?.catalogueNumber || '')
  }, [catalogueItem, setValue, system])

  return (
    <div>
      <div className="flex">
        <InputWithError {...formFields.name} className="pr-1" />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError {...formFields.catalogueNumber} className="pr-1" />
          <InputWithError {...formFields.price} className="pr-1 pl-1" />
          <InputWithError {...formFields.quantity} className="pl-1" />
        </div>
        <div className="flex">
          <ComboboxComponent {...formFields.system} className="pr-1 z-50" isObject={true} />
        </div>
      </div>
    </div>
  )
}

export default OrderLineForm
