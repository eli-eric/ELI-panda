import { Input } from 'components/ui/form/Input'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useIsFirstRender } from 'usehooks-ts'

const Main = () => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-row justify-between border-0 pb-5">
      <div className="w-36 h-36 text-cente">upload IMG</div>
      <div className="flex flex-col">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <Input
              id="text"
              name="name"
              type="text"
              register={register}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Code
          </label>
          <div className="mt-1">
            <Input
              name="code"
              register={register}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <button type="submit">Save</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

interface propertyProps {
  name: string
  removeProp: (index: number) => void
  index: number
}

const Prop = ({ name, removeProp, index }: propertyProps) => {
  const { register, unregister } = useFormContext()
  const handleRemoveProp = e => {
    e.preventDefault()
    removeProp(index)
    unregister(name)
  }
  return (
    <div className="flex">
      <Input register={register} name={`${name}.name`} type="text" />
      <Input register={register} name={`${name}.type`} type="text" />
      <Input register={register} name={`${name}.unit`} type="text" />
      <Input register={register} name={`${name}.default`} type="text" />
      <button onClick={handleRemoveProp}>del</button>
    </div>
  )
}

const PropList = ({ name }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: `${name}.props` })

  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    console.log('useeefect')
    append({})
    return () => remove(0)
  }, [append, remove])

  const removeProp = (index: number) => {
    remove(index)
  }

  const handleAddProp = e => {
    e.preventDefault()
    append({})
  }
  return (
    <div className="flex-1">
      {fields.map((_, index) => (
        <Prop removeProp={removeProp} index={index} name={`${name}.props.${index}`} key={`${name}.props.${index}`} />
      ))}
      <button onClick={handleAddProp}>Add New Atribute</button>
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
  const handleRemoveGroup = e => {
    e.preventDefault()
    removeGroup(index)
  }
  return (
    <div className="w-full flex-1 border">
      <Input register={register} name={`${name}.name`} type="text" />
      <PropList name={name} />
      <button onClick={handleRemoveGroup}>Delete Group</button>
    </div>
  )
}

const GroupList = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'groups' })
  const removeGroup = (index: number) => {
    remove(index)
  }
  const handleAddGroup = e => {
    e.preventDefault()
    append({})
  }

  return (
    <div className="flex-1">
      <div className="flex-1">
        {fields.map((_, index) => (
          <Group removeGroup={removeGroup} index={index} name={`groups.${index}`} key={`groups.${index}`} />
        ))}
      </div>
      <button onClick={handleAddGroup}>Add New Group</button>
    </div>
  )
}

type Prop = {
  name: string
  type: string
  unit: string
  default: string
}
type Group = {
  name: string
  props: Prop[]
}

type FormType = {
  name: string
  code: string
  groups?: Group[]
}

const TestEditModal = () => {
  const formMethods = useForm<FormType>()
  const onSubmit = (data: FormType) => {
    console.log(data)
  }
  return (
    <FormProvider {...formMethods}>
      <form className="flex" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <Main />
          <GroupList />
        </div>
      </form>
    </FormProvider>
  )
}

export default TestEditModal
