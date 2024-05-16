import type { CellContext } from '@tanstack/react-table'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { TableDeleteButton } from '@/components/Buttons'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { QueryKey } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import type {
  CodebookType,
  CodebookTypeResponse
} from '@/types/responses/codebook'

interface ExtendedCodebookType extends CodebookType {
  uuid?: string
}

interface FormCellProps extends CellContext<ExtendedCodebookType, any> {
  lastAddedUUID?: string
  codebookType?: CODEBOOK
  queryKey: QueryKey
}

export const FormCell = ({
  column: { id },
  getValue,
  queryKey,
  row: {
    original: { uuid, uid }
  },
  lastAddedUUID,
  codebookType
}: FormCellProps) => {
  const { register, handleSubmit, formState, reset, setFocus, control } =
    useForm({
      defaultValues: { [id]: getValue() }
    })

  const queryClient = useQueryClient()

  const name = useWatch({ name: id, control })

  const method = uid ? 'put' : 'post'

  const { codebook: endpoint } = useEndpoint({
    path: codebookType + (uid ? `/${uid}` : '')
  })

  const { submit } = useSubmit<CodebookType>({
    endpoint,
    method: method,
    onSuccess: data => {
      toast.success(`Codebook value added successfully`)
      queryClient.setQueryData<CodebookTypeResponse>(queryKey, prev => {
        if (!prev) return prev
        return {
          ...prev,
          data: prev.data.map((value: ExtendedCodebookType) =>
            uuid
              ? value.uuid === uuid
                ? data
                : value
              : value.uid === uid
                ? { name, uid }
                : value
          )
        }
      })
    },
    onError: () => {
      toast.error('something went wrong')
      queryClient.invalidateQueries({ queryKey })
      reset({ [id]: getValue() })
    }
  })

  const deleteCodebook = useSubmit<CodebookType>({
    endpoint,
    method: 'delete',
    onSuccess: data => {
      toast.success(`Codebook ${data.name} successfully deleted.`)
      queryClient.setQueryData<CodebookTypeResponse>(queryKey, prev => {
        if (!prev) return prev
        return {
          ...prev,
          data: prev.data.filter(item => item.uid !== uid)
        }
      })
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

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${getValue()} value from codebook?`
  )

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
      <input
        className="w-full text-xs px-0 border-0 bg-inherit py-1"
        {...register(id)}
        onBlur={() => {
          if (isDirty) {
            handleSubmit(onSubmit)()
          }
        }}
      />
      {/* {isDirty && (
        <button className="ml-2 text-primary-500 hover:text-gray-500" type="submit">
          Save
        </button>
      )} */}
      {uid && (
        <div className="flex">
          <TableDeleteButton onClick={onDeleteClick} />
        </div>
      )}
    </form>
  )
}
