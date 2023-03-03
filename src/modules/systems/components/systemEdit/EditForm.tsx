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
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          System Edit
        </h3>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-x-4 ">
          <SystemFormImage uid={uid} />
        </div>
        <InputWithError {...fields.name} />
        <TextareaWithError {...fields.description} />
        <SelectWithError {...fields.systemTypeUID} />
        <InputWithError {...fields.systemCode} />
        <InputWithError {...fields.systemAlias} />
        <ComboboxComponent {...fields.locationUID} />
        <ComboboxComponent {...fields.ownerUID} />
        <SelectWithError {...fields.importanceUID} />
        <SelectWithError {...fields.zoneUID} />
        <SelectWithError {...fields.subZoneCode} />
        <SelectWithError {...fields.criticalityClassUID} />
      </div>
    </Fragment>
  )
}

export default EditForm
