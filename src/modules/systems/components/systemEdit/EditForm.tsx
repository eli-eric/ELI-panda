import { Fragment } from 'react'
import { object, string } from 'yup'

import ComboboxComponent from '@/components/form/Combobox'
import { InputWithError, TextareaWithError } from '@/components/form/Input'
import { SelectWithError } from '@/components/form/Select'

import { SystemDetailResponse } from '../../types/responses'
import useSystemEditFormFields from './EditForm.fields'
import SystemFormImage from './SystemFormImage'

const schema = object({
  name: string().min(5).required(),
  description: string(),
  importanceCode: string(),
  zoneCode: string().required(),
  systemTypeUID: string(),
  systemAlias: string().max(12).required(),
  locationCode: string().required()
})

interface Props {
  data?: SystemDetailResponse
  uid?: string
}

const EditForm = ({ uid }: Props) => {
  const fields = useSystemEditFormFields()

  return (
    <Fragment>
      {/* <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          System Edit
        </h3>
      </div> */}
      <div className="pt-4 grid grid-cols-12 ">
        <div className="col-span-3">
          <SystemFormImage uid={uid} />
        </div>
        <div className="pl-5 col-span-9">
          <InputWithError {...fields.name} />
          <ComboboxComponent {...fields.ownerUID} className="col-span-9" />
          <SelectWithError {...fields.importanceUID} className="col-span-9" />
        </div>
        <ComboboxComponent
          {...fields.locationUID}
          className="col-span-6 pt-2 pl-1"
        />
        <SelectWithError {...fields.zoneUID} className="col-span-6 pl-1 pt-2" />

        <SelectWithError
          {...fields.systemTypeUID}
          className="col-span-6 pr-1 pt-2"
        />
        <InputWithError
          {...fields.systemCode}
          className="pt-2 col-span-3 pl-1 pr-1"
        />
        <InputWithError
          {...fields.systemAlias}
          className="col-span-3 pl-1 pt-2"
        />

        <TextareaWithError
          {...fields.description}
          className="col-span-12 pt-2"
        />
      </div>
    </Fragment>
  )
}

export default EditForm
