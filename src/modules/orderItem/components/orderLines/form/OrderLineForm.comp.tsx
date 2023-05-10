import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { Input, InputAmount } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'
import { useToggle } from '@/components/form/Switch'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { CatalogueItem } from '@/types/responses'

import useOrderLineFormFields from './OrderLineForm.fields'

interface Props {
  orderLine?: OrderLineFormType
  catalogueItem?: CatalogueItem
}

const OrderLineFormComponent = ({ catalogueItem, orderLine }: Props) => {
  //const [enabled, setEnabled] = useState(false)
  const { enabled, toggle, Toggle } = useToggle(false)
  const [locationEnable, setLocationEnable] = useState(false)
  const formFields = useOrderLineFormFields(enabled)
  const { setValue, watch } = useFormContext<OrderLineFormType>()
  const system = watch('system')

  useEffect(() => {
    if (!enabled) {
      setValue('name', catalogueItem?.name || orderLine?.name || '')
      setValue('catalogueNumber', catalogueItem?.catalogueNumber || orderLine?.catalogueNumber || '')
      setValue('catalogueUid', catalogueItem?.uid || orderLine?.catalogueUid || '')
    }
  }, [catalogueItem, setValue, orderLine, enabled])

  useEffect(() => {
    if (enabled) {
      setValue('name', '')
      setValue('catalogueNumber', '')
      setValue('catalogueUid', '')
    }
  }, [enabled, setValue])

  useEffect(() => {
    if (system) {
      setLocationEnable(false)
      setValue('location', undefined)
    } else {
      setLocationEnable(true)
    }
  }, [system, setValue])

  return (
    <div>
      <div className="grid grid-cols-12">
        <Toggle enabled={enabled} onChange={toggle} className="mt-6 col-span-1" />
        <Input {...formFields.name} className="pr-1 col-span-5" />
        <Input {...formFields.catalogueNumber} className="col-span-6" />
      </div>

      <div className="flex-1">
        <div className="flex">
          <InputAmount {...formFields.price} className="pr-1" />
          <ListBox {...formFields.itemUsage} position="top" />
        </div>
        <div className="flex"></div>
        <div className="flex">
          <ComboboxComponent {...formFields.system} className="pr-1" isObject={true} limit={50} position="top" />
          <ComboboxComponent {...formFields.location} isObject position="top" limit={50} disabled={locationEnable} />
        </div>
        {!orderLine?.id && (
          <div className="grid grid-cols-2">
            <Input {...formFields.quantity} className="pr-1" defaultValue={1} />
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderLineFormComponent
