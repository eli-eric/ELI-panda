import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { type DeepPartial, type FieldValues, FormProvider, useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import ModalButtonsComponent from '@/components/modal/modal.buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import useFormNotification from './useFormNotification'

const messages = message.common.buttons

interface useFormModalProps<T> {
  renderForm: (data: T) => JSX.Element
  renderOutsideForm?: () => JSX.Element
  onSubmit: (data: T) => void

  defaultValues?: DeepPartial<T>

  schema?: any
  error?: boolean
}

const useFormModal = <T extends FieldValues>({
  renderForm,
  renderOutsideForm,
  onSubmit,
  error = false,
  defaultValues,
  schema
}: useFormModalProps<T>) => {
  const [open, setOpen] = useState(false)
  const formMethods = useForm<T>({ defaultValues: defaultValues, resolver: yupResolver(schema) })
  const { handleSubmit, reset, control, formState } = formMethods
  useFormNotification<T>({ control })
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (!error) {
        reset()
        setOpen(false)
      }
    }
  }, [formState, error, reset])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.save,
      loading: formState.isSubmitting,
      type: 'submit'
    },
    goBack: {
      text: messages.close,
      type: 'button',
      onClick: () => {
        reset()
        setOpen(false)
      }
    }
  }

  const getFormModal = () => (
    <ModalComponent open={open} setOpen={setOpen}>
      {renderOutsideForm && renderOutsideForm()}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          {renderForm(defaultValues as T)}
          {error && <ErrorPage />}
        </FormProvider>
        <ModalButtonsComponent buttons={modalButtons} />
      </form>
    </ModalComponent>
  )
  return { getFormModal, setOpen, formMethods }
}

export default useFormModal
