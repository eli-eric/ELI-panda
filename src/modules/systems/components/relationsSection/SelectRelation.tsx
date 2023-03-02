import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Option, SelectWithError } from '@/components/form/Select'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'

import { RelationFormType } from '../../types/form'

const SelectRelation = ({
  relationTypeCode,
  systemName,
  selectedSystem
}: {
  relationTypeCode: RELATION_TYPE_CODE
  systemName: string
  selectedSystem?: {
    name: string
    uid: string
  }
}) => {
  const { register, watch, setValue, formState } =
    useFormContext<RelationFormType>()
  useEffect(() => {
    setValue('relationTypeCode', relationTypeCode)
  }, [setValue, relationTypeCode])
  const router = useRouter()
  const baseSystemOption = useMemo(
    () => ({
      name: systemName,
      value: router.query.slug as string
    }),
    [router, systemName]
  )
  const [selectedSystemOption, setSelectedSystemOption] = useState({
    name: selectedSystem?.name,
    value: selectedSystem?.uid
  })
  const [systemToOption, setSystemToOption] =
    useState<Option>(selectedSystemOption)
  const watchSystemFromUid = watch('systemFromUid')

  useEffect(() => {
    setSelectedSystemOption({
      name: selectedSystem?.name,
      value: selectedSystem?.uid
    })
  }, [selectedSystem, setSelectedSystemOption])

  useEffect(() => {
    if (watchSystemFromUid === baseSystemOption.value) {
      setSystemToOption(selectedSystemOption)
    }
    if (watchSystemFromUid === selectedSystemOption.value) {
      setSystemToOption(baseSystemOption)
    }
    if (!selectedSystem) {
      setSystemToOption(selectedSystemOption)
      setValue('systemFromUid', baseSystemOption.value)
    }

    setValue('systemToUid', systemToOption.value as string)
  }, [
    watchSystemFromUid,
    baseSystemOption,
    selectedSystemOption,
    selectedSystem,
    setValue,
    systemToOption
  ])

  return (
    <div className="flex flex-row">
      <SelectWithError
        options={
          selectedSystem
            ? [baseSystemOption, selectedSystemOption]
            : [baseSystemOption]
        }
        register={register}
        name={'systemFromUid'}
        isError={!!formState.errors.systemFromUid?.message}
        rounded="rounded-l-md"
        label="System From"
      />
      <SelectWithError
        options={[{ value: relationTypeCode }]}
        register={register}
        name={'relationTypeCode'}
        isError={!!formState.errors.relationTypeCode?.message}
        disabled
        label="Relation Type Code"
      />
      <SelectWithError
        options={[systemToOption]}
        register={register}
        name={'systemToUid'}
        isError={!!formState.errors.systemToUid?.message}
        disabled
        rounded="rounded-r-md"
        label="System To"
      />
    </div>
  )
}

export default SelectRelation
