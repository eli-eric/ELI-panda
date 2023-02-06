import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Input } from 'components/ui/form/Input'
import { Select } from 'components/ui/form/Select'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'

const units = [
  {
    uid: '8a18b753-e0c9-4d5b-80ef-2e0de38ac2b8',
    code: 'mm',
    name: 'mm'
  },

  {
    uid: '00f9909d-0adf-43ef-9cb2-49bc1c4bcc52',
    code: 'hpa',
    name: 'hPa'
  },

  {
    uid: '787ada0e-6699-4269-8060-314d1bcf7079',
    code: 'n',
    name: 'N'
  },

  {
    uid: '5c01425a-9e43-4123-8ba1-62d2e647f498',
    code: 'nm',
    name: 'nm'
  },

  {
    uid: '101947b8-5dfb-4a81-8808-0c8eb777634e',
    code: 'mp',
    name: 'MP'
  },

  {
    uid: '42156793-804a-4d82-a3f6-949b84369446',
    code: 'fps',
    name: 'fps'
  },

  {
    uid: '1c4eada6-ea52-41a2-bd31-8cfb66b8416e',
    code: 'bit',
    name: 'bit'
  },

  {
    uid: '426e2685-2ac3-4823-a406-807efd1148d4',
    code: 'nm-(rms)',
    name: 'nm (RMS)'
  },

  {
    uid: '2ecdb787-b2bf-4c42-a74e-e9ba5b704162',
    code: 'mj',
    name: 'mJ'
  },

  {
    uid: '7d1c7b70-a50a-4fb4-abc8-f83856a2bedd',
    code: 'uj',
    name: 'uJ'
  },

  {
    uid: '76eb38d0-f5e5-4453-b988-c6f53597eee9',
    code: 'hz',
    name: 'Hz'
  },

  {
    uid: '37c0c169-1df7-44b0-b3bc-85a0c4fe7d92',
    code: 'w',
    name: 'W'
  },

  {
    uid: 'dcf713f6-2ecc-439e-9c65-024874a3dc8d',
    code: 'l/sec',
    name: 'L/sec'
  },

  {
    uid: '0088912f-39c9-4c28-a458-f81a96affd3f',
    code: 'm3/hod',
    name: 'm3/hod'
  },

  {
    uid: '5d3bd548-5712-4c79-b783-5b13153f3ba0',
    code: 'mbar',
    name: 'mbar'
  },

  {
    uid: '81cfe53e-1242-43bf-81fb-10ffa6ade6ca',
    code: 'min',
    name: 'min'
  }
]

const propertyTypes = [
  {
    uid: 'be2d4bd1-602b-42e6-a0ee-7e24324b75bb',
    code: 'text',
    name: 'text'
  },

  {
    uid: '45f0d238-4067-4033-9e52-58f1d454b6d3',
    code: 'number',
    name: 'number'
  },

  {
    uid: '918766a8-a7c0-4361-b85d-21d7b75449bb',
    code: 'boolean',
    name: 'boolean'
  },

  {
    uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
    code: 'list',
    name: 'List Of Values'
  }
]

const ImgIcon = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-400"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Main = () => {
  const { register, watch } = useFormContext()

  const groupName = watch('name')

  const codeValue = groupName ? groupName.replace(/\s+/g, '-').toLowerCase() : ''

  return (
    <div className="flex flex-row pb-5">
      <div className="mt-1 justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <ImgIcon />
          <div className=" text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
      <div className="flex flex-col flex-grow ml-10">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <Input
              id="text"
              name="name"
              type="text"
              register={register}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Code</label>
          <div className="mt-1">
            <Input
              name="code"
              value={codeValue}
              disabled
              register={register}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface propertyProps {
  name: string
  removeProp: (index: number) => void
  index: number
  length: number
}

const Value = ({ removeValue, index, name }) => {
  const { register, control } = useFormContext()

  const handleRemoveValue = () => {
    removeValue(index)
  }

  return (
    <div className="flex">
      <Input
        register={register}
        name={`${name}.value`}
        type="text"
        placeholder="value"
        className="block appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
      />
      <button
        type="button"
        onClick={handleRemoveValue}
        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

const Prop = ({ name, removeProp, index }: propertyProps) => {
  const { register, watch, control, unregister } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.listOfValues` as 'groups.0.props.0.listOfValues'
  })

  const handleRemoveProp = () => {
    removeProp(index)
  }

  const handleAddValue = () => {
    append({ value: '' })
  }

  const removeValue = index => {
    remove(index)
  }
  const type = watch(`${name}.typeUID`)
  const listOfValues = watch(`${name}.listOfValues`)

  useEffect(() => {
    if (type !== '9b56eba5-d650-442c-9235-0f6fd3cc8a91') {
      unregister(`${name}.listOfValues`)
    }
  }, [type, unregister, name])

  return (
    <div className="flex">
      <div className="flex-col flex-grow">
        <div className="flex flex-row flex-grow">
          <Input
            register={register}
            name={`${name}.name`}
            type="boolean"
            placeholder="prop name"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          <Select
            register={register}
            name={`${name}.typeUID`}
            options={[
              { value: '', name: 'Select type', code: 'empty', selected: true, disabled: true },
              ...propertyTypes.map(type => ({ ...type, value: type.uid }))
            ]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />

          <Select
            register={register}
            name={`${name}.unitUID`}
            options={[
              { value: '', name: 'Select unit', code: '', selected: true, disabled: false },
              ...units.map(unit => ({ ...unit, value: unit.uid }))
            ]}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          {type === '9b56eba5-d650-442c-9235-0f6fd3cc8a91' ? (
            <Select
              register={register}
              name={`${name}.unitUID`}
              options={[
                { value: '', name: 'Default value', code: 'default', selected: true, disabled: false },
                ...listOfValues.map(value => ({ value: value.value, code: value.value, name: value.value }))
              ]}
              className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          ) : type === '918766a8-a7c0-4361-b85d-21d7b75449bb' ? (
            <Select
              register={register}
              name={`${name}.unitUID`}
              options={[
                { value: '', name: 'Default value', code: 'default', selected: true, disabled: false },
                { value: 1, name: 'true', code: 'true' },
                { value: 0, name: 'false', code: 'true' }
              ]}
              className="block w-full appearance-none rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          ) : (
            <Input
              register={register}
              name={`${name}.default`}
              type={type === '' ? '' : type === '45f0d238-4067-4033-9e52-58f1d454b6d3' ? 'number' : 'text'}
              placeholder="default"
              disabled={type === ''}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          )}
          <button
            type="button"
            onClick={handleRemoveProp}
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {type === '9b56eba5-d650-442c-9235-0f6fd3cc8a91' && (
          <div>
            <h3>List of Values: </h3>
            <div className="flex flex-wrap">
              {fields.map((field, index) => (
                <Value removeValue={removeValue} key={field.id} index={index} name={`${name}.listOfValues.${index}`} />
              ))}
              <button
                type="button"
                onClick={handleAddValue}
                className="relative inline-flex text-sm items-center rounded-md border border-gray-300  px-4 py-2 hover:bg-gray-50"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const PropList = ({ name }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.props` as 'groups.0.props' })

  // useEffect(() => {
  //   append({ name: '', typeUID: '', unitUID: '', default: '' })
  //   return () => remove(0)
  // }, [append, remove])

  const removeProp = (index: number) => {
    remove(index)
  }

  const handleAddProp = e => {
    append({ name: '', typeUID: '', unitUID: '', default: '' })
  }
  return (
    <div className="flex-1">
      <ul className="py-1 px-1">
        {fields.map((field, index) => (
          <li key={field.id} className="border-b px-2 py-2 my-1">
            <Prop removeProp={removeProp} index={index} name={`${name}.props.${index}`} length={fields.length} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="relative mt-3 inline-flex text-sm items-center rounded-md border border-gray-300  px-4 py-2 hover:bg-gray-50"
        onClick={handleAddProp}
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

interface groupProps {
  name: string
  removeGroup: (index: number) => void
  index: number
}

const Group = ({ name, removeGroup, index }: groupProps) => {
  const { register } = useFormContext()
  const handleRemoveGroup = () => {
    removeGroup(index)
  }
  return (
    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
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
          <PropList name={name} />
        </div>
      </div>
    </div>
  )
}

const GroupList = () => {
  const { control } = useFormContext()
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

type Value = {
  value: string
}

type Prop = {
  name: string
  typeUID: string
  unitUID: string
  default: string
  listOfValues?: Value[]
}
type Group = {
  name: string
  props?: Prop[]
}

type FormType = {
  name: string
  code: string
  groups?: Group[]
}

interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
}

const TestEditModal = ({ setopen }: Props) => {
  const formMethods = useForm<FormType>()
  const onSubmit = (data: FormType) => {
    const formattedData =
      data.groups && data.groups.length !== 0
        ? {
            ...data,
            groups: data.groups?.map(group => ({
              ...group,
              props: group.props?.map(prop =>
                prop.listOfValues && prop.listOfValues.length !== 0
                  ? { ...prop, listOfValues: prop.listOfValues.map(value => value.value) }
                  : { ...prop }
              )
            }))
          }
        : { ...data }
    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form className="flex" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <Main />
          <GroupList />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              data-testid={'-modal-button-go-next'}
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              Save
            </button>
            <button
              data-testid="modal-button-go-back"
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
              onClick={() => {
                setopen(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default TestEditModal
