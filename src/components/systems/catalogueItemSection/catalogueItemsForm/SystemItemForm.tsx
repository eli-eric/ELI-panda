import { useFormContext } from 'react-hook-form'

import { InputWithError } from '@/components/ui/form/Input'
import { SelectWithError } from '@/components/ui/form/Select'

const itemUsageUID = [
  { value: '0119a645-5155-46a4-95a4-4ad576d4fff2', name: 'Spare Part' },
  { value: 'd5ab8e98-2cbe-4c03-98d3-52d3a1bbdaa3', name: 'In System Part' },
  {
    value: 'b7199329-8ba4-43d2-a31d-20f8774b3a62',
    name: 'Experimental loan pool part',
  },
  {
    value: 'f1849b4b-947f-4c31-8c76-b5eca91d18a6',
    name: 'Test and measurement equipment',
  },
  { value: '00961288-4c88-4632-9003-3c9c18b80fc0', name: 'Stock item' },
  { value: 'f3fd12d8-d975-4aac-afb2-b9f244316d77', name: 'Other' },
]

const SystemItemForm = ({ itemUid }: { itemUid?: string }) => {
  const { register } = useFormContext()

  return (
    <div>
      <div className="flex">
        <InputWithError
          register={register}
          name="catalogueItemUID"
          label="Catalogue Item"
          disabled
          value={itemUid}
          rounded="rounded-md"
        />
        <SelectWithError
          register={register}
          name="itemUsageUID"
          label="Item Usage UID"
          placeholder="Item Usage UID"
          rounded="rounded-md"
          options={itemUsageUID}
        />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError
            register={register}
            name="eun"
            label="EUN"
            placeholder="EUN"
            rounded="rounded-md"
          />
          <InputWithError
            register={register}
            name="name"
            label="Name"
            placeholder="Name"
            rounded="rounded-md"
          />
          <InputWithError
            register={register}
            name="serialNumber"
            label="Serial Number"
            placeholder="Serial Number"
            rounded="rounded-md"
          />
        </div>
        <div className="flex">
          <InputWithError
            register={register}
            name="batchNumber"
            label="Batch Number"
            placeholder="Batch Number"
            rounded="rounded-md"
          />
          <SelectWithError
            register={register}
            name="obsolete"
            label="Obsolote"
            placeholder="Obsolete"
            rounded="rounded-md"
            defaultValue={'false'}
            options={[{ value: 'true' }, { value: 'false' }]}
          />
          <InputWithError
            register={register}
            name="estimatedLifeTimeMonths"
            label="Eestimated Life TimeMonthsUN"
            placeholder="Estimated Life TimeMonths"
            rounded="rounded-md"
            type="number"
          />
        </div>
      </div>
    </div>
  )
}

export default SystemItemForm
