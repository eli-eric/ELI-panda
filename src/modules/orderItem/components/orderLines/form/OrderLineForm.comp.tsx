import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { InputWithError } from '@/components/form/Input'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { CatalogueItem } from '@/types/responses'

import useOrderLineFormFields from './OrderLineForm.fields'

interface Props {
  orderLine?: OrderLineFormType
  catalogueItem?: CatalogueItem
}

const OrderLineFormComponent = ({ catalogueItem, orderLine }: Props) => {
  const formFields = useOrderLineFormFields()
  const { setValue } = useFormContext<OrderLineFormType>()

  useEffect(() => {
    setValue('name', catalogueItem?.name || orderLine?.name || '')
    setValue('catalogueNumber', catalogueItem?.catalogueNumber || orderLine?.catalogueNumber || '')
    setValue('catalogueUid', catalogueItem?.uid || orderLine?.catalogueUid || '')
  }, [catalogueItem, setValue, orderLine])

  return (
    <div>
      <div className="flex">
        <InputWithError {...formFields.name} className="pr-1" />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError {...formFields.catalogueNumber} className="pr-1" />
          <InputWithError {...formFields.price} className="pr-1 pl-1" />
          {!orderLine && <InputWithError {...formFields.quantity} className="pl-1" defaultValue={1} />}
        </div>
        <div className="flex">
          <ComboboxComponent {...formFields.system} className="pr-1 z-50" isObject={true} />
        </div>
      </div>
    </div>
  )
}

export default OrderLineFormComponent
