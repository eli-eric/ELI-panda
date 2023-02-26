import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputWithError } from '@/components/shared/form/Input'
import { SelectWithError } from '@/components/shared/form/Select'

import { SystemItemFormType } from '../../types/catalogueItemSection'
import useSystemItemFormFields from './SystemItemForm.fields'

const SystemItemForm = ({ itemName }: { itemName?: string }) => {
  const { setValue } = useFormContext<SystemItemFormType>()
  const formFields = useSystemItemFormFields()

  useEffect(() => {
    setValue('catalogueItemUID', itemName)
  }, [itemName, setValue])

  return (
    <div>
      <div className="flex">
        <InputWithError {...formFields.catalogueItemUid} />
        <SelectWithError {...formFields.itemUsageUid} />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError {...formFields.eun} />
          <InputWithError {...formFields.name} />
          <InputWithError {...formFields.serialNumber} />
        </div>
        <div className="flex">
          <InputWithError {...formFields.batchNumber} />
          <SelectWithError {...formFields.obsolete} />
          <InputWithError {...formFields.estimatedLifeTimeMonths} />
        </div>
      </div>
    </div>
  )
}

export default SystemItemForm
