import type { CellContext } from '@tanstack/react-table'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

interface ExtendedCodebookType extends CodebookType {
  uuid?: string
}

interface FormCellProps extends CellContext<ExtendedCodebookType, any> {
  lastAddedUUID?: string
}

export const FormCell = ({
  column: { id },
  getValue,
  row: {
    original: { uuid }
  },
  lastAddedUUID
}: FormCellProps) => {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({ defaultValues: { [id]: getValue() } })

  const { isDirty } = formState
  const onSubmit = data => {
    // submit will be here post when uid does not exist otherwise put
    // maybe mutation of codebook?
    console.log(data)
    reset(data)
  }

  useEffect(() => {
    if (uuid === lastAddedUUID) {
      setFocus(id)
    }
  }, [uuid, lastAddedUUID, id, setFocus])

  useEffect(() => {
    reset({ [id]: getValue() })
  }, [getValue, id, reset])

  return (
    <form className="flex py-1" onSubmit={handleSubmit(onSubmit)}>
      <input className="w-full bg-inherit" {...register(id)} onBlur={handleSubmit(onSubmit)} />
      {isDirty && (
        <button className="ml-2 text-primary-500 hover:text-gray-500" type="submit">
          Save
        </button>
      )}
    </form>
  )
}
