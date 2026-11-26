import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { z } from 'zod'

import Combobox from '@/components/form/Combobox'
import { Button } from '@/components/ui/button'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import type { EmployeeAssignmentFormData } from '../schemas/employeeAssignment.schema'
import { employeeAssignmentSchema } from '../schemas/employeeAssignment.schema'
import type { EmployeeAssignment } from '../types'

const nestedForm = message.roomCardsPage.nestedForm
const messages = message.common.buttons

interface EmployeeAssignmentModalProps {
    onSubmit?: (data: EmployeeAssignmentFormData) => void
    onClose?: () => void
    existingEmployeeUids?: string[]
}

export const EmployeeAssignmentModalContainer = ({
    onSubmit,
    onClose,
    existingEmployeeUids = [],
}: EmployeeAssignmentModalProps) => {
    const { formatMessage: fm } = useIntl()
    // the codebook selection already carries uid + display name — no extra lookup
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAssignment | null>(null)

    const formMethods = useForm<EmployeeAssignmentFormData>({
        resolver: zodResolver(
            employeeAssignmentSchema.superRefine((data, ctx) => {
                if (!data.employee) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: fm({ id: message.common.employeeAssignment.requiredSelection }),
                        path: ['employee'],
                    })
                    return
                }

                if (existingEmployeeUids.includes(data.employee.uid)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: fm({ id: message.common.employeeAssignment.duplicateSelection }),
                        path: ['employee'],
                    })
                    return
                }
            }),
        ),
        defaultValues: {
            employee: null,
        },
    })

    const { handleSubmit, formState, watch } = formMethods

    const fields = useMakeFormFields({
        employee: {
            name: 'employee',
            disabled: false,
            label: nestedForm.employee.label,
            codebook: CODEBOOK.EMPLOYEE,
        },
    })

    const handleFormSubmit = handleSubmit(() => {
        if (onSubmit && selectedEmployee) {
            onSubmit({ employee: selectedEmployee })
        }
    })

    const formEmployee = watch('employee')
    const isSubmitDisabled = !formEmployee || !selectedEmployee || formState.isSubmitting

    return (
        <div className="space-y-6 min-w-0 max-w-none w-full">
            <FormProvider {...formMethods}>
                <div className="flex space-x-3">
                    <Combobox
                        {...fields.employee}
                        onSelect={item =>
                            setSelectedEmployee(
                                item ? { uid: item.uid, fullName: item.name } : null,
                            )
                        }
                    />
                </div>
            </FormProvider>

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={messages.close} />
                </Button>
                <Button type="button" disabled={isSubmitDisabled} onClick={handleFormSubmit}>
                    {formState.isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    <FormattedMessage id={messages.save} />
                </Button>
            </div>
        </div>
    )
}
