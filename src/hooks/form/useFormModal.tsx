import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useEffect } from 'react'
import type { DefaultValues, UseFormReturn } from 'react-hook-form'
import { type FieldValues, FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import type { ObjectSchema } from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import type { DialogSize } from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import useFormNotification from './useFormNotification'

const messages = message.common.buttons

interface useFormModalProps<T> {
  renderForm: (data: T) => JSX.Element
  renderOutsideForm?: (data: T) => JSX.Element
  onSubmit: (data: T) => void
  title?: string
  description?: string
  size?: DialogSize

  defaultValues?: DefaultValues<T>
  loading?: boolean
  schema?: ObjectSchema<any>
  error?: boolean
}

// Form modal content component for the global modal system
const FormModalContent = <T extends FieldValues>({
  renderForm,
  renderOutsideForm,
  onSubmit,
  defaultValues,
  loading = false,
  error = false,
  schema,
  onClose
}: useFormModalProps<T> & { onClose?: () => void }) => {
  const formMethods = useForm({
    defaultValues: defaultValues,
    resolver: schema ? yupResolver(schema) : undefined
  })
  const { handleSubmit, reset, control, formState } = formMethods
  useFormNotification({ control })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (!error) {
        reset()
        if (onClose) onClose()
      }
    }
  }, [formState, error, reset, onClose])

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <div className="space-y-6 min-w-0 max-w-none w-full">
      {renderOutsideForm && renderOutsideForm(defaultValues as T)}
      <FormProvider {...formMethods}>
        <div className="space-y-4">
          {renderForm(defaultValues as T)}
          {error && <ErrorPage />}
        </div>
      </FormProvider>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={messages.close} />
        </Button>
        <Button
          type="button"
          disabled={formState.isSubmitting || loading}
          onClick={handleFormSubmit}
        >
          {(formState.isSubmitting || loading) && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          <FormattedMessage id={messages.save} />
        </Button>
      </div>
    </div>
  )
}

const useFormModal = <T extends FieldValues>({
  renderForm,
  renderOutsideForm,
  onSubmit,
  title,
  description,
  size = 'l',
  error = false,
  loading = false,
  defaultValues,
  schema
}: useFormModalProps<T>) => {
  const { openModal } = useModalGlobalStore()

  const openFormModal = () => {
    openModal('dialog1', {
      component: FormModalContent,
      props: {
        renderForm,
        renderOutsideForm,
        onSubmit,
        defaultValues,
        loading,
        error,
        schema,
        title,
        description,
        size
      },
      onClose: undefined
    })
  }

  return { openFormModal }
}

export default useFormModal

interface Props<T extends FieldValues> {
  renderOutsideForm?: JSX.Element
  className?: string
  onSubmit: (data: T) => void
  formMethods: UseFormReturn<T, any>
  loading?: boolean
  disableSubmit?: boolean
  error?: boolean
  children?: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  description?: string
  size?: DialogSize
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
  className,
  disableSubmit = false,
  title,
  description,
  size = 'l'
}: Props<T>) => {
  const { handleSubmit, reset, formState } = formMethods
  const { openModal, closeModal } = useModalGlobalStore()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (!error) {
        reset()
        setOpen(false)
        closeModal('dialog1')
      }
    }
  }, [formState, error, reset, setOpen, closeModal])

  useEffect(() => {
    if (open) {
      openModal('dialog1', {
        component: ({ onClose }: { onClose?: () => void }) => (
          <div className="space-y-6 min-w-0 max-w-none w-full">
            {renderOutsideForm}
            <Form
              formMethods={formMethods}
              onSubmit={onSubmit}
              enableLeaveWarning={false}
              className={className}
            >
              {children}
              {error && <ErrorPage />}
            </Form>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset()
                  setOpen(false)
                  if (onClose) onClose()
                }}
              >
                <FormattedMessage id={messages.close} />
              </Button>
              <Button
                type="button"
                disabled={formState.isSubmitting || loading || disableSubmit}
                onClick={handleSubmit(onSubmit)}
              >
                {(formState.isSubmitting || loading) && (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                <FormattedMessage id={messages.save} />
              </Button>
            </div>
          </div>
        ),
        props: { title, description, size },
        onClose: () => {
          reset()
          setOpen(false)
        }
      })
    } else {
      closeModal('dialog1')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    open
    // Intentionally excluding other dependencies as this effect should only run when 'open' changes
    // Adding other dependencies would cause issues with modal management and re-renders
  ])

  // Return null since the modal is handled by the global system
  return null
}
