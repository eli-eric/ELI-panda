import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { Input, InputAmount } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'
import { classNames } from '@/helpers'
import { OrderLineFormType } from '@/modules/orderItem/types'
import { CatalogueItem } from '@/types/responses'

import useOrderLineFormFields from './OrderLineForm.fields'

interface Props {
  orderLine?: OrderLineFormType
  catalogueItem?: CatalogueItem
}

const OrderLineFormComponent = ({ catalogueItem, orderLine }: Props) => {
  const [enabled, setEnabled] = useState(false)
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
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-primary-500' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
            'mr-3 mt-6'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
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
