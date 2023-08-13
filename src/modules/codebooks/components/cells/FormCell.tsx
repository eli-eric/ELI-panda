import type { CellContext } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

export const FormCell = ({ column: { id }, getValue }: CellContext<CodebookType, any>) => {
  const { register, handleSubmit, formState, reset } = useForm({ defaultValues: { [id]: getValue() } })

  const { isDirty, isSubmitSuccessful } = formState
  const onSubmit = data => {
    console.log(data)
    reset(data)
  }

  return (
    <form className="flex py-1" onSubmit={handleSubmit(onSubmit)}>
      <input className="w-full bg-inherit" {...register(id)} />
      {isDirty && (
        <button className="ml-2 text-primary-500 hover:text-gray-500" type="submit">
          Save
        </button>
      )}
    </form>
  )
}
