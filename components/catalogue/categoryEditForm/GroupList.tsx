import { PlusIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Input } from 'components/ui/form/Input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CatalogueFormType } from 'types/catalogue'

import PropertyList from './PropertyList'

interface groupProps {
  name: `groups.${number}`
  removeGroup: (index: number) => void
  index: number
}

const Group = ({ name, removeGroup, index }: groupProps) => {
  const { register } = useFormContext()
  const handleRemoveGroup = () => {
    removeGroup(index)
  }
  return (
    <div className=" flex flex-1 flex-col justify-between sm:ml-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <Input
              register={register}
              name={`${name}.name`}
              type="text"
              required
              placeholder="group name"
              className="block  appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />

            <button
              type="button"
              onClick={handleRemoveGroup}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <span className="sr-only">Delete</span>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
      <div className="relative pr-9 pt-4">
        <div className="w-full flex-1">
          <PropertyList name={name} />
        </div>
      </div>
    </div>
  )
}

const GroupList = () => {
  const { control } = useFormContext<CatalogueFormType>()
  const { fields, append, remove } = useFieldArray({ control, name: 'groups' })
  const removeGroup = (index: number) => {
    remove(index)
  }
  const handleAddGroup = () => {
    append({ name: '', props: [] })
  }

  return (
    <div className="flex-1">
      <div className="flex-1">
        {fields.length !== 0 && (
          <ul role="list">
            {fields.map((field, index) => (
              <li key={field.id} className="flex py-2 ">
                <Group removeGroup={removeGroup} index={index} name={`groups.${index}`} key={field.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={handleAddGroup}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Delete</span>
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupList
