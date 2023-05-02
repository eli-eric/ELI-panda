import { Fragment } from 'react'

import ComboboxComponent from '@/components/form/Combobox'
import { InputWithError, TextareaWithError } from '@/components/form/Input'
import { SelectWithError } from '@/components/form/Select'
import Devider from '@/components/layout/Devider'

import useOrderFormFields from './OrderForm.fields'

const OrderFormComponent = () => {
  const fields = useOrderFormFields(false)

  return (
    <Fragment>
      <div className=" mx-auto grid grid-cols-12 max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl  col-span-2 justify-center font-semibold text-gray-900">NEW ORDER</h1>
        <InputWithError {...fields.orderDate} className="pb-1 col-span-3 pr-1" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="pt-4 grid grid-cols-12">
          <InputWithError {...fields.name} className="pb-1 col-span-4 pr-1" />
          <ComboboxComponent {...fields.supplier} className="pb-1 col-span-4 pr-1" isObject={true} />
          <SelectWithError {...fields.orderStatus} className="pb-1 col-span-4 pr-1" />
        </div>
        <div className="pt-4 grid grid-cols-12 ">
          <InputWithError {...fields.orderNumber} className="pb-1 col-span-4 pr-1" />
          <InputWithError {...fields.requestNumber} className="pb-1 col-span-4 pr-1" />
          <InputWithError {...fields.contractNumber} className="pb-1 col-span-4 pr-1" />
        </div>
        <div className="pt-4 grid grid-cols-12 ">
          <TextareaWithError {...fields.notes} className="pb-1 col-span-12 pr-1" />
        </div>
        <Devider />
      </div>
    </Fragment>
  )
}

export default OrderFormComponent
