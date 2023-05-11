import { Fragment } from 'react'

import ComboboxComponent from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import { SelectWithError } from '@/components/form/Select'

import type { SystemDetailResponse } from '../../types/responses'
import useSystemEditFormFields from './EditForm.fields'
import SystemFormImage from './SystemFormImage'

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
          <Input {...fields.name} className="pb-1" />
          <div className="grid grid-cols-12">
            <ComboboxComponent {...fields.ownerUID} className="col-span-6 pb-1 pr-1" />
            <ComboboxComponent {...fields.parentUID} className="col-span-6 pb-1" />
          </div>
          <SelectWithError {...fields.importanceUID} className="pb-1" />
        </div>

        <ComboboxComponent {...fields.locationUID} className="col-span-6 pt-2 pr-1 z-50" />
        <SelectWithError {...fields.zoneUID} className="col-span-6 pl-1 pt-2" />

        <SelectWithError {...fields.systemTypeUID} className="col-span-6 pr-1 pt-2" />
        <Input {...fields.systemCode} className="pt-2 col-span-3 pl-1 pr-1" />
        <Input {...fields.systemAlias} className="col-span-3 pl-1 pt-2" />

        <TextArea {...fields.description} className="col-span-12 pt-2" />
      </div>
    </Fragment>
  )
}

export default EditForm
