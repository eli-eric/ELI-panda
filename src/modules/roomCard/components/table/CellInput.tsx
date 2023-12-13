import type { CellContext } from '@tanstack/react-table'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { CheckBoxComponent } from '@/components/form/CheckBox'
import { InputDate } from '@/components/form/Input'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import type { CleaningScheduleDay } from '@/types/gql/graphql'
import { PrescribedClothing, PurityClass } from '@/types/gql/graphql'

import type { RoomCardProperties } from './RoomCard.columns'

const CleaningSchedule = () => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as CleaningScheduleDay[]
  const { setValue, control } = useFormContext()
  const cleaningScheduleDays = useWatch({ control, name: 'cleaningScheduleDays' })

  return (
    <div className="flex">
      {days.map(day => (
        <Button
          key={day}
          customDisabled={!editPersmission}
          onClick={() => {
            if (cleaningScheduleDays?.includes(day)) {
              setValue(
                'cleaningScheduleDays',
                cleaningScheduleDays.filter(selectedDay => selectedDay !== day)
              )
            } else {
              setValue('cleaningScheduleDays', [...(cleaningScheduleDays ?? []), day])
            }
          }}
          type="button"
          primary={cleaningScheduleDays?.includes(day) ? true : false}
        >
          {day.slice(0, 2)}
        </Button>
      ))}
      <InputDate disabled={!editPersmission} rounded="rounded-md" name="cleaningScheduleDate" />
    </div>
  )
}

const PrescribedClothingSelect = () => {
  const prescribedClothingEnums = Object.values(PrescribedClothing).map(value => value)
  const { control, setValue } = useFormContext()
  const prescribedClothing = useWatch({ control, name: 'prescribedClothing' })
  return (
    <div className="grid grid-cols-4 mt-1">
      {prescribedClothingEnums.map((item, index) => (
        <CheckBoxComponent
          key={index}
          defaultChecked={prescribedClothing.includes(item as any) ? true : false}
          className="mr-1 mb-1 col-span-1"
          label={item}
          onChange={e => {
            e.target.checked
              ? setValue('prescribedClothing', [...prescribedClothing, item])
              : setValue(
                  'prescribedClothing',
                  prescribedClothing.filter(selectedItem => selectedItem !== item)
                )
          }}
        />
      ))}
    </div>
  )
}

type Props = {
  code: string
}

const PurityClassSelect = ({ code }: Props) => {
  const { register } = useFormContext()
  const purityClass = Object.values(PurityClass).map(value => value)
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  return (
    <select className="select-reset select-custom w-full" {...register(code)} disabled={!editPersmission} name={code}>
      {purityClass.map((purityClass, index) => (
        <option key={index}>{purityClass}</option>
      ))}
    </select>
  )
}

const DefaultInput = ({ code }: Props) => {
  const { register } = useFormContext()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  return (
    <input
      className="w-full text-xs px-0 border-0 bg-inherit py-1"
      {...register(code)}
      disabled={!editPersmission}
      name={code}
    />
  )
}

export const CellInput = ({
  row: {
    original: { code }
  },
  column: { id }
}: CellContext<RoomCardProperties, any>) => {
  switch (code) {
    case 'cleaningSchedule':
      return <CleaningSchedule />
    case 'purityClass':
      return <PurityClassSelect code={code} />
    case 'prescribedClothing':
      return <PrescribedClothingSelect />
    default: {
      if (id === 'clientRequirements') {
        return <DefaultInput code={code + 'Client'} />
      }
      return <DefaultInput code={code} />
    }
  }
}
