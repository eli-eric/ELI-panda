import { useFieldArray } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { CODEBOOK } from '@/types/constants/codebook'

export const DepartmentsComponent = () => {
  const { fields, append } = useFieldArray({
    name: 'authorsDepartments'
  })
  return (
    <div className="w-full">
      {fields.map((item, index) => (
        <Department key={item.id} name={`authorsDepartments.${index}`} />
      ))}
      <button onClick={() => append({ department: null, authorsCount: '' })}>
        Add Department
      </button>
    </div>
  )
}

const Department = ({ name }) => {
  return (
    <div className="flex w-full gap-2">
      <Listbox
        name={`${name}.department`}
        customLabel="Department"
        codebook={CODEBOOK.DEPARTMENT}
      />
      <Input
        name={`${name}.authorsCount`}
        rounded="rounded-md"
        label="Authors count"
        type="number"
      />
    </div>
  )
}
