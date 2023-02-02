import { Input } from 'components/ui/form/Input'
import { useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

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
  const removeProp = (index: number) => {
    setRemovedIndexes(removedIndexes => [...removedIndexes, index])
  }
  const defaultProp = <Prop removeProp={removeProp} index={0} name={`${name}.props[0]`} key={`${name}.props[0]`} />
  const [propList, setPropList] = useState<JSX.Element[]>([defaultProp])
  const [removedIndexes, setRemovedIndexes] = useState<number[]>([])
  const handleAddAtribute = e => {
    e.preventDefault()
    setPropList([
      ...propList,
      <Prop
        removeProp={removeProp}
        index={propList.length}
        name={`${name}.props[${propList.length}]`}
        key={`${name}.props[${propList.length}]`}
      />
    ])
  }
  return (
    <div className="flex-1">
      <div> {propList.filter((_, index) => !removedIndexes.includes(index)).map((prop, index) => prop)}</div>
      <button onClick={handleAddAtribute}>Add New Atribute</button>
    </div>
  )
}

interface groupProps {
  name: string
  removeGroup: (index: number) => void
  index: number
}

const Group = ({ name, removeGroup, index }: groupProps) => {
  const { register, unregister, getValues } = useFormContext()
  const handleRemoveGroup = e => {
    e.preventDefault()
    removeGroup(index)
    unregister(name)
    console.log(getValues())
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
  const [groupList, setGroupList] = useState<JSX.Element[]>([])
  const [removedIndexes, setRemovedIndexes] = useState<number[]>([])
  const removeGroup = (index: number) => {
    setRemovedIndexes(removedIndexes => [...removedIndexes, index])
  }

  const handleAddGroup = e => {
    e.preventDefault()
    setGroupList([
      ...groupList,
      <Group
        removeGroup={removeGroup}
        index={groupList.length}
        name={`groups[${groupList.length}]`}
        key={`groups[${groupList.length}]`}
      />
    ])
  }

  return (
    <div className="flex-1">
      <div className="flex-1">
        {groupList.filter((_, index) => !removedIndexes.includes(index)).map((group, index) => group)}
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
    const filteredData = data.groups
      ? {
          ...data,
          groups: data.groups
            ?.filter(group => group !== null)
            ?.map(group => ({ ...group, props: group.props.filter(prop => prop !== null) }))
        }
      : { ...data }
    console.log(filteredData)
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
