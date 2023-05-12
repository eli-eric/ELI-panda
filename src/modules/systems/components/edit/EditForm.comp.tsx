import { Fragment } from 'react'

import ComboboxComponent from '@/components/form/Combobox'
import { FormGrid } from '@/components/form/FormGrid'
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
      <FormGrid className="pt-4">
        <div className="col-span-3 md:col-span-2 lg:col-span-4 md:pr-4">
          <SystemFormImage uid={uid} />
        </div>
        <div className="col-span-3 md:col-span-4 lg:col-span-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 mb-auto">
          <Input {...fields.name} className="col-span-3 md:col-span-4 lg:col-span-8" />
          <ComboboxComponent {...fields.ownerUID} className="col-span-3 md:col-span-4 lg:col-span-4" />
          <ComboboxComponent {...fields.parentUID} className="col-span-3 md:col-span-4  lg:col-span-4" />
          <SelectWithError {...fields.importanceUID} className="col-span-3 md:col-span-4 lg:col-span-8" />
        </div>
        <ComboboxComponent {...fields.locationUID} className="col-span-3 md:col-span-6 z-50" />
        <SelectWithError {...fields.zoneUID} className="col-span-3 md:col-span-6 " />
        <SelectWithError {...fields.systemTypeUID} className="col-span-3 md:col-span-6" />
        <Input {...fields.systemCode} className="col-span-3" />
        <Input {...fields.systemAlias} className="col-span-3" />
        <TextArea {...fields.description} className="col-span-full" />
      </FormGrid>
    </Fragment>
  )
}

export default EditForm
