import { Fragment } from 'react'

import ComboboxComponent from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'

import useOrderFormFields from './OrderForm.fields'

interface Props {
  disabledEdit?: boolean
}

const OrderFormComponent = ({ disabledEdit }: Props) => {
  const fields = useOrderFormFields(disabledEdit)

  return (
    <Fragment>
      <div className=" mx-auto grid grid-cols-12 max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl  col-span-2 justify-center font-semibold text-gray-900">NEW ORDER</h1>
        <Input {...fields.orderDate} className="pb-1 col-span-3 pr-1" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="pt-4 grid grid-cols-12">
          <Input {...fields.name} className="pb-1 col-span-6 pr-1" />
          <ComboboxComponent {...fields.supplier} className="pb-1 col-span-6 pr-1" isObject={true} />
        </div>
        <div className="pt-4 grid grid-cols-12 ">
          <ListBox {...fields.orderStatus} className="pb-1 col-span-3 pr-1" />
          <Input {...fields.orderNumber} className="pb-1 col-span-3 pr-1" />
          <Input {...fields.requestNumber} className="pb-1 col-span-3 pr-1" />
          <Input {...fields.contractNumber} className="pb-1 col-span-3 pr-1" />
        </div>
        <div className="pt-4 grid grid-cols-12 ">
          <TextArea {...fields.notes} className="pb-1 col-span-12 pr-1" />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderFormComponent
