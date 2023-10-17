import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableActionsButtons } from '@/components/Buttons'
import type { RoomCard } from '@/types/gql/graphql'

interface Props extends CellContext<any, any> {
  formName: string
}

export const CellWithDelete = ({
  row: {
    original: { uid, employee }
  },
  getValue,
  formName
}: Props) => {
  const { control } = useFormContext<RoomCard>()
  const { remove, fields } = useFieldArray({ control, name: formName })
  const index = fields.findIndex(
    field => field?.uid === uid || (field?.employee && field?.employee.uid === employee?.uid)
  )

  const onDeleteClick = () => {
    remove(index)
  }

  return (
    <div className="flex items-center">
      <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />
      <span>{getValue()}</span>
    </div>
  )
}
