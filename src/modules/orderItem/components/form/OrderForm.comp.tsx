import { Fragment } from 'react'

import { InputWithError, TextareaWithError } from '@/components/form/Input'

import useOrderFormFields from './OrderForm.fields'

const EditForm = () => {
  const fields = useOrderFormFields(false)

  return (
    <Fragment>
      <div className="pt-4 grid grid-cols-12">
        <InputWithError {...fields.name} className="pb-1 col-span-4 pr-1" />
        <InputWithError {...fields.supplier} className="pb-1 col-span-4 pr-1" />
        <InputWithError {...fields.orderStatus} className="pb-1 col-span-4 pr-1" />
      </div>
      <div className="pt-4 grid grid-cols-12 ">
        <InputWithError {...fields.orderNumber} className="pb-1 col-span-4 pr-1" />
        <InputWithError {...fields.requestNumber} className="pb-1 col-span-4 pr-1" />
        <InputWithError {...fields.contractNumber} className="pb-1 col-span-4 pr-1" />
      </div>
      <div className="pt-4 grid grid-cols-12 ">
        <TextareaWithError {...fields.notes} className="pb-1 col-span-12 pr-1" />
      </div>
    </Fragment>
  )
}

export default EditForm
