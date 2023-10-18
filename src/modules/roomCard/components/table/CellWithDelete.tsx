import type { CellContext } from '@tanstack/react-table'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { TableActionsButtons } from '@/components/Buttons'

interface Props extends CellContext<any, any> {
  formName: string
  setDeleteItem: (item: any) => void
}

export const CellWithDelete = ({
  row: {
    original: { uid, employee }
  },
  getValue,
  formName,
  setDeleteItem
}: Props) => {
  const { control } = useFormContext()
  const { remove, fields } = useFieldArray({ control, name: formName })
  // any type because of react-table and component is for more contexts
  const index = fields.findIndex((field: any) => field?.uid === uid || field?.employee.uid === employee?.uid)
  const item = fields.find((field: any) => field?.uid === uid || field?.employee.uid === employee?.uid)

  const onDeleteClick = () => {
    remove(index)
    setDeleteItem(item)
  }
  return (
    <div className="flex items-center">
      <TableActionsButtons onDeleteClick={onDeleteClick} canEdit={true} />
      <span>{getValue()}</span>
    </div>
  )
}
