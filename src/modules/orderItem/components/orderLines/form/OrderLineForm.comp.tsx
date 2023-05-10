import { useEffect } from 'react'
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
  const formFields = useOrderLineFormFields(enabled)
  const { setValue } = useFormContext<OrderLineFormType>()

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

  return (
    <div>
      <div className="flex">
        {/* TODO: make gereal component for witch */}
        <Toggle enabled={enabled} onChange={toggle} className="mr-3 mt-6" />
        <Input {...formFields.name} className="pr-1" />
      </div>

      <div className="flex-1">
        <div className="flex">
          <Input {...formFields.catalogueNumber} className="pr-1" />
          <InputAmount {...formFields.price} className="pr-1 pl-1" />
          {!orderLine && <Input {...formFields.quantity} className="pl-1" defaultValue={1} />}
        </div>
        <div className="flex">
          <ComboboxComponent {...formFields.location} isObject position="top" limit={50} className="pr-1" />
          <ListBox {...formFields.itemUsage} className="pl-1" position="top" />
        </div>
        <div className="flex">
          <ComboboxComponent {...formFields.system} className="pr-1" isObject={true} limit={50} position="top" />
        </div>
      </div>
    </div>
  )
}

export default OrderLineFormComponent
