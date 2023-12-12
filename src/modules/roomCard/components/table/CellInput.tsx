import type { CellContext } from '@tanstack/react-table'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { InputDate } from '@/components/form/Input'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import type { CleaningScheduleDay } from '@/types/gql/graphql'

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

export const CellInput = ({
  row: {
    original: { code }
  }
}: CellContext<RoomCardProperties, any>) => {
  const { register } = useFormContext()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  if (code === 'cleaningSchedule') {
    return <CleaningSchedule />
  }

  if (code === 'purityClass') {
    return (
      <select className="select-reset select-custom w-full" {...register(code)} disabled={!editPersmission} name={code}>
        <option>ISO 5</option>
        <option>ISO 6</option>
        <option>ISO 7</option>
        <option>ISO 8</option>
      </select>
    )
  }
  if (code === 'prescribedClothing') {
    return (
      <select className="select-reset select-custom w-full" {...register(code)} disabled={!editPersmission} name={code}>
        <option>Cap, overall ISO 7, gloves, shoe covers, beard cover</option>
        <option>Entry to LB 02.37.03 only in shoe covers. Entry to other rooms without restrictions</option>
        <option>PPE are adapted to the type of used virus</option>
        <option>Cap, overall ISO5 or blue underwear for ISO5, gloves, shoe covers, beard cover</option>
      </select>
    )
  }
  if (code === 'indoorEnvironmentQuality') {
    return (
      <select className="select-reset select-custom w-full" {...register(code)} disabled={!editPersmission} name={code}>
        <option>room temperature 17 - 21 °C +/- 1°C; humidity 35 - 55% +/- 5%</option>
        <option>room temperature 17 - 25 °C +/- 1°C; humidity 45 - 55% +/- 5%</option>
        <option>not specified</option>
      </select>
    )
  }

  return (
    <input
      className="w-full text-xs px-0 border-0 bg-inherit py-1"
      {...register(code)}
      disabled={!editPersmission}
      name={code}
    />
  )
}
