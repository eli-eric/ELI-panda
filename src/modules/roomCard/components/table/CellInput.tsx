import type { CellContext } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'

import type { RoomCardProperties } from './RoomCard.columns'

export const CellInput = ({
  row: {
    original: { code }
  }
}: CellContext<RoomCardProperties, any>) => {
  const { register } = useFormContext()

  return <input className="w-full bg-inherit" {...register(code)} name={code} />
}
