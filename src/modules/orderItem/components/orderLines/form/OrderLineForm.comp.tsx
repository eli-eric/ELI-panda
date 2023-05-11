import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { FormGrid } from '@/components/form/FormGrid'
import { Input, InputAmount } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'
import { useToggle } from '@/components/form/Switch'
import type { OrderLineFormType } from '@/modules/orderItem/types'
import type { CatalogueItem } from '@/types/responses'

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
    <FormGrid>
      <Toggle enabled={enabled} onChange={toggle} className="mt-6 col-span-3 lg:col-span-1" />
      <Input {...formFields.name} className="col-span-3 md:col-span-6 lg:col-span-5" />
      <Input {...formFields.catalogueNumber} className="col-span-3 md:col-span-6" />
      <InputAmount {...formFields.price} className="col-span-3 md:col-span-6" />
      <ListBox {...formFields.itemUsage} position="top" className="col-span-3 md:col-span-6" />
      <ComboboxComponent
        {...formFields.system}
        isObject={true}
        limit={50}
        position="top"
        className="col-span-3 md:col-span-6"
      />
      <ComboboxComponent
        {...formFields.location}
        isObject
        position="top"
        limit={50}
        disabled={locationEnable}
        className="col-span-3 md:col-span-6"
      />
      {!orderLine?.id && <Input {...formFields.quantity} className="col-span-3 md:col-span-6" defaultValue={1} />}
    </FormGrid>
  )
}

export default OrderLineFormComponent
