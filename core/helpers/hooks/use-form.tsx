import { yupResolver } from '@hookform/resolvers/yup'
import useAxios from 'core/helpers/hooks/use-axios'
import { useWarnIfUnsavedChanges } from 'core/helpers/hooks/useWarnIfUnsavedChanges'
import FormContext from 'core/store/form.context'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'
import Lazy from 'yup/lib/Lazy'

type Props<T extends FieldValues> = {
  data?: T
  endpoint: string
  fetchMethod: 'get' | 'post' | 'put'
  schema: Lazy<any, unknown> | AnyObjectSchema
  afterMutates?: string[]
}

export const usePandaForm = <T extends FieldValues>({
  data,
  endpoint,
  fetchMethod,
  schema,
  afterMutates
}: Props<T>) => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    defaultValues: data as any,
    resolver: yupResolver(schema)
  })
  const { setEdit } = useContext(FormContext)

  const [modalOpen, setModalOpen] = useState(false)
  const { setNext, nextUrl, setNextUrl } = useWarnIfUnsavedChanges(formState.isDirty, setModalOpen)

  const { fetchData } = useAxios({
    url: endpoint,
    method: fetchMethod,
    mutateUrlList: afterMutates && afterMutates
  })

  const onSubmit = data => {
    fetchData(data)
    setEdit(false)
  }

  const onCancel = () => {
    if (formState.isDirty) {
      setModalOpen(true)
      setNextUrl(undefined)
    } else {
      setEdit(false)
    }
  }

  const confirm = (next: boolean) => {
    setModalOpen(false)
    setNext(next)
    if (next && nextUrl) router.push(nextUrl)
    if (next) {
      setEdit(false)
    }
  }

  return {
    register,
    onCancel,
    confirm,
    onSubmit,
    handleSubmit,
    formState,
    warnModalOpen: modalOpen,
    setWarnModalOpen: setModalOpen
  }
}
