import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { DeepPartial, FieldValues, FormProvider, useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import ModalButtonsComponent from '@/components/modal/modal.buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { ModalButtons } from '@/types/form'

interface useFormModalProps<T> {
  renderForm: () => JSX.Element
  onSubmit: (data: T) => void

  defaultValues?: DeepPartial<T>

  schema?: any
  error?: boolean
}

const useFormModal = <T extends FieldValues>({
  renderForm,
  onSubmit,
  error = false,
  defaultValues,
  schema
}: useFormModalProps<T>) => {
  const [open, setOpen] = useState(false)
  const formMethods = useForm<T>({ defaultValues: defaultValues, resolver: yupResolver(schema) })
  const { handleSubmit, formState, reset } = formMethods

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
      text: 'Save',
      loading: formState.isSubmitting,
      type: 'submit'
    },
    goBack: {
      text: 'Cancel',
      type: 'button',
      onClick: () => {
        reset()
        setOpen(false)
      }
    }
  }

  const FormModal = () => (
    <ModalComponent open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          {renderForm()}
          {error && <ErrorPage />}
        </FormProvider>
        <ModalButtonsComponent buttons={modalButtons} />
      </form>
    </ModalComponent>
  )
  return { FormModal, setOpen }
}

export default useFormModal
