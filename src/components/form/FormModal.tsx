import React from 'react'
import { useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { type FieldValues } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import type { DialogSize } from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'

const messages = message.common.buttons

interface FormModalContentProps<T extends FieldValues> {
    renderOutsideForm?: JSX.Element
    className?: string
    onSubmit: (data: T) => void
    formMethods: UseFormReturn<T, any>
    loading?: boolean
    disableSubmit?: boolean
    error?: boolean
    children?: React.ReactNode
    onClose?: () => void
}

export const FormModalContent = <T extends FieldValues>({
    formMethods,
    children,
    onSubmit,
    error,
    renderOutsideForm,
    loading,
    className,
    disableSubmit = false,
    onClose,
}: FormModalContentProps<T>) => {
    const { handleSubmit, reset, formState } = formMethods

    useEffect(() => {
        if (formState.isSubmitSuccessful && !error) {
            reset()
            onClose?.()
        }
    }, [formState.isSubmitSuccessful, error, reset, onClose])

    return (
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
                        onClose?.()
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
    )
}

// Legacy FormModal component for backward compatibility
interface FormModalProps<T extends FieldValues> {
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
}: FormModalProps<T>) => {
    // Only render modal content when open
    if (!open) return null

    return (
        <FormModalContent
            formMethods={formMethods}
            onSubmit={onSubmit}
            error={error}
            renderOutsideForm={renderOutsideForm}
            loading={loading}
            className={className}
            disableSubmit={disableSubmit}
            onClose={() => setOpen(false)}
        >
            {children}
        </FormModalContent>
    )
}
