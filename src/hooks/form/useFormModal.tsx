import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useEffect, useState } from 'react'
import type { DefaultValues, UseFormReturn } from 'react-hook-form'
import { type FieldValues, FormProvider, useForm } from 'react-hook-form'
import type { ObjectSchema } from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import ModalButtonsComponent from '@/components/modal/modal.buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import useFormNotification from './useFormNotification'

const messages = message.common.buttons

interface useFormModalProps<T> {
  renderForm: (data: T) => JSX.Element
  renderOutsideForm?: (data: T) => JSX.Element
  onSubmit: (data: T) => void

  defaultValues?: DefaultValues<T>
  loading?: boolean
  schema?: ObjectSchema<any>
  error?: boolean
}

const useFormModal = <T extends FieldValues>({
  renderForm,
  renderOutsideForm,
  onSubmit,
  error = false,
  loading = false,
  defaultValues,
  schema
}: useFormModalProps<T>) => {
  const [open, setOpen] = useState(false)
  const formMethods = useForm({ defaultValues: defaultValues, resolver: schema ? yupResolver(schema) : undefined })
  const { handleSubmit, reset, control, formState } = formMethods
  useFormNotification({ control })
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
      loading: formState.isSubmitting || loading,
      type: 'button',
      onClick: handleSubmit(onSubmit)
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
      {renderOutsideForm && renderOutsideForm(defaultValues as T)}
      <form>
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

interface Props<T extends FieldValues> {
  renderOutsideForm?: JSX.Element
  className?: string
  onSubmit: (data: T) => void
  formMethods: UseFormReturn<T, any>
  loading?: boolean
  error?: boolean
  children?: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const FormModal = <T extends FieldValues>({
  formMethods,
  children,
  onSubmit,
  error,
  renderOutsideForm,
  loading,
  open = false,
  setOpen,
  className
}: Props<T>) => {
  const { handleSubmit, reset, formState } = formMethods
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (!error) {
        reset()
        setOpen(false)
      }
    }
  }, [formState, error, reset, setOpen])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.save,
      loading: formState.isSubmitting || loading,
      type: 'button',
      onClick: handleSubmit(onSubmit)
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

  return (
    <ModalComponent open={open} setOpen={setOpen}>
      {renderOutsideForm}
      <Form formMethods={formMethods} enableLeaveWarning={false} className={className}>
        {children}
        {error && <ErrorPage />}
        <ModalButtonsComponent buttons={modalButtons} />
      </Form>
    </ModalComponent>
  )
}
