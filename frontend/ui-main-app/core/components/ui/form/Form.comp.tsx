import { yupResolver } from '@hookform/resolvers/yup'
import ModalComponent from 'core/components/ui/modal/modal.comp'
import ModalWarningComponent from 'core/components/ui/modal/warning/modal-warning.comp'
import useAxios from 'core/helpers/hooks/use-axios'
import { useWarnIfUnsavedChanges } from 'core/helpers/hooks/useWarnIfUnsavedChanges'
import FormContext from 'core/store/form.context'
import { ModalButtons } from 'core/types/form'
import { useRouter } from 'next/router'
import React, { Fragment, JSXElementConstructor, ReactElement, useContext, useState } from 'react'
import { FieldValues, FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { AnyObjectSchema } from 'yup'
import Lazy from 'yup/lib/Lazy'

export interface FormChildrenProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>
  formState: FormState<T>
  handleSubmit: UseFormHandleSubmit<T>
  onSubmit: (data: any) => void
  onCancel: () => void
}

type Props<T extends FieldValues> = {
  data?: T
  children: (props: FormChildrenProps<T>) => ReactElement<any, string | JSXElementConstructor<any>>
  endpoint: string
  fetchMethod: 'get' | 'post' | 'put'
  schema: Lazy<any, unknown> | AnyObjectSchema
  afterMutates?: string[]
}

const FormContainer = <T extends FieldValues>({
  data,
  children,
  endpoint,
  fetchMethod,
  schema,
  afterMutates
}: Props<T>) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { register, handleSubmit, formState } = useForm({
    defaultValues: data as any,
    resolver: yupResolver(schema)
  })
  const { add, edit, setEdit, setAdd } = useContext(FormContext)

  const [modalOpen, setModalOpen] = useState(false)
  const { setNext, nextUrl } = useWarnIfUnsavedChanges(formState.isDirty, setModalOpen)

  const { fetchData } = useAxios({
    url: endpoint,
    method: fetchMethod
  })

  const onSubmit = data => {
    fetchData({
      body: data,
      afterAction: afterMutates && { mutate: mutate, mutateUrlList: afterMutates }
    })
    if (add) setAdd(false)
    if (edit) setEdit(false)
  }

  const onCancel = () => {
    if (formState.isDirty) {
      setModalOpen(true)
    } else {
      if (add) setAdd(false)
      if (edit) setEdit(false)
    }
  }

  const confirm = (next: boolean) => {
    setModalOpen(false)
    setNext(next)
    if (next && nextUrl) router.push(nextUrl)
    if (next) {
      if (add) setAdd(false)
      if (edit) setEdit(false)
    }
  }

  const modalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => {
        confirm(true)
      }
    },
    goBack: {
      text: 'cancel',
      onClick: () => {
        confirm(false)
      }
    }
  }

  const object = {
    register,
    onCancel,
    onSubmit,
    handleSubmit,
    formState
  }
  //const WrappedComponent = React.cloneElement(children, object)

  return (
    <Fragment>
      {children(object)}
      <ModalComponent open={modalOpen} setOpen={setModalOpen} testid="warning-form-modal" buttons={modalButtons}>
        <ModalWarningComponent
          title="Warning"
          message="You have unstagged changes in your form. Are you sure you want continue?"
        />
      </ModalComponent>
    </Fragment>
  )
}
export default FormContainer
