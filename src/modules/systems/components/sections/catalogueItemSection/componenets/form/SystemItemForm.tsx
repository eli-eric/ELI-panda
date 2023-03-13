import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputWithError, TextareaWithError } from '@/components/form/Input'
import { SelectWithError } from '@/components/form/Select'
import { SystemItemFormType } from '@/modules/systems/types/form'

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
        <InputWithError {...formFields.catalogueItemUid} className="pr-1" />
        <SelectWithError {...formFields.itemUsageUid} className="pr-1 pl-1" />
        <SelectWithError {...formFields.conditionStatusUID} className="pl-1" />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError {...formFields.eun} className="pr-1" />
          <InputWithError {...formFields.name} className="pr-1 pl-1" />
          <InputWithError {...formFields.serialNumber} className="pl-1" />
        </div>
        <div className="flex">
          <InputWithError {...formFields.batchNumber} className="pr-1" />
          <SelectWithError {...formFields.obsolete} className="pr-1 pl-1" />
          <InputWithError {...formFields.estimatedLifeTimeMonths} className="pl-1" />
        </div>
        <TextareaWithError {...formFields.description} />
      </div>
    </div>
  )
}

export default SystemItemForm
