import type { CellContext } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'

import { TableDeleteButton } from '@/components/Buttons'
import type { CodebookType } from '@/hooks/fetch/useCodebook'

export const DeleteCell = ({ column: { id }, getValue }: CellContext<CodebookType, any>) => {
  const { register, handleSubmit } = useForm({ defaultValues: { [id]: getValue() } })
  const onDeleteClick = () => console.log('delete')
  return (
    <div className="flex">
      <TableDeleteButton onClick={onDeleteClick} />
    </div>
  )
}
