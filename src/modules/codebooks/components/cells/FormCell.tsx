import type { CellContext } from '@tanstack/react-table'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import type { KeyedMutator } from 'swr'

import { TableDeleteButton } from '@/components/Buttons'
import type { CodebookType, CodebookTypeResponse } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'

interface ExtendedCodebookType extends CodebookType {
  uuid?: string
}

interface FormCellProps extends CellContext<ExtendedCodebookType, any> {
  lastAddedUUID?: string
  mutate: KeyedMutator<CodebookTypeResponse>
  codebookType: string
}

export const FormCell = ({
  column: { id },
  getValue,
  row: {
    original: { uuid, uid }
  },
  lastAddedUUID,
  mutate,
  codebookType
}: FormCellProps) => {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({ defaultValues: { [id]: getValue() } })

  const method = uid ? 'put' : 'post'

  const { codebook: endpoint } = useEndpoint({ path: codebookType + (uid ? `/${uid}` : '') })

  const { submit } = useSubmit<CodebookType>({
    endpoint,
    method: method,
    onSuccess: data => {
      toast.success(`Codebook value added successfully`)
      mutate(
        prev =>
          prev && {
            metadata: prev?.metadata,
            data: prev.data.map((value: ExtendedCodebookType) =>
              uuid ? (value.uuid === uuid ? data : value) : value.uid === uid ? data : value
            )
          },
        {
          revalidate: false
        }
      )
    },
    onError: () => {
      toast.error('something went wrong')
      reset({ [id]: getValue() })
    }
  })

  const deleteCodebook = useSubmit<CodebookType>({
    endpoint,
    method: 'delete',
    onSuccess: data => {
      toast.success(`Codebook ${data.name} successfully deleted.`)
      mutate(
        prev =>
          prev && {
            metadata: prev?.metadata,
            data: prev.data.filter((value: ExtendedCodebookType) => value.uid !== uid)
          },
        { revalidate: false }
      )
      reset(data)
    },
    onError: () => {
      toast.error('something went wrong')
      reset({ [id]: getValue() })
    }
  })

  const { isDirty } = formState

  const onSubmit = data => {
    submit({ name: data[id], uid: uid ? uid : undefined })
  }

  const withWarningModal = useWarningModal(`Are you sure you want to delete ${getValue()} value from codebook?`)

  useEffect(() => {
    if (!!lastAddedUUID && uuid === lastAddedUUID) {
      setFocus(id)
    }
  }, [uuid, lastAddedUUID, id, setFocus])

  useEffect(() => {
    reset({ [id]: getValue() })
  }, [getValue, id, reset])

  const onDeleteClick = () => withWarningModal(deleteCodebook.submit)()

  return (
    <form className="flex py-1" onSubmit={handleSubmit(onSubmit)}>
      <input className="w-full bg-inherit" {...register(id)} />
      {isDirty && (
        <button className="ml-2 text-primary-500 hover:text-gray-500" type="submit">
          Save
        </button>
      )}
      {uid && (
        <div className="flex">
          <TableDeleteButton onClick={onDeleteClick} />
        </div>
      )}
    </form>
  )
}
