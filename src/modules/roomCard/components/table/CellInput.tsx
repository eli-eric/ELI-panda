import type { CellContext } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import type { RoomCardProperties } from './RoomCard.columns'

/* const CleaningSchedule = () => {
  const [selectedDays, setSelectedDays] = useState<{
    [key: string]: boolean
  }>()
    const { register } = useFormContext()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  return (
    <div className="flex">
      <Button primary={selectedDays?.MO} onClick={() => setSelectedDays({ ...selectedDays, MO: !selectedDays?.MO })}>
        MO
      </Button>
      <Button primary={selectedDays?.TU} onClick={() => setSelectedDays({ ...selectedDays, TU: !selectedDays?.TU })}>
        TU
      </Button>
      <Button primary={selectedDays?.WE} onClick={() => setSelectedDays({ ...selectedDays, WE: !selectedDays?.WE })}>
        WE
      </Button>
      <Button primary={selectedDays?.TH} onClick={() => setSelectedDays({ ...selectedDays, TH: !selectedDays?.TH })}>
        TH
      </Button>
      <Button primary={selectedDays?.FR} onClick={() => setSelectedDays({ ...selectedDays, FR: !selectedDays?.FR })}>
        FR
      </Button>
      <Button primary={selectedDays?.SA} onClick={() => setSelectedDays({ ...selectedDays, SA: !selectedDays?.SA })}>
        SA
      </Button>
      <Button primary={selectedDays?.SU} onClick={() => setSelectedDays({ ...selectedDays, SU: !selectedDays?.SU })}>
        SU
      </Button>
      <Input rounded="rounded-md" name="cleaningShedule" type="date" />
    </div>
  )
} */

export const CellInput = ({
  row: {
    original: { code }
  }
}: CellContext<RoomCardProperties, any>) => {
  const { register } = useFormContext()
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  /* if (code === 'cleaningSchedule') {
    return <CleaningSchedule />
  } */

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

  return <input className="w-full bg-inherit py-1" {...register(code)} disabled={!editPersmission} name={code} />
}
