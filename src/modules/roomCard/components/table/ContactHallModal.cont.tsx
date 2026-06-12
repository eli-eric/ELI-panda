import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import type { z } from 'zod'

import Combobox from '@/components/form/Combobox'
import { Button } from '@/components/ui/button'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { gql } from '@/types/gql'

import type { ContactHallFormData } from './schemas/contactHall.schema'
import { contactHallSchema } from './schemas/contactHall.schema'

const nestedForm = message.roomCardsPage.nestedForm
const messages = message.common.buttons

const GET_CONTACT_PERSON_ROLES = gql(`
  query GetContactPersonRoles {
    contactPersonRoles {
      uid
      name
    }
  }
`)

interface ContactHallModalProps {
    onSubmit?: (data: ContactHallFormData) => void
    onClose?: () => void
}

export const ContactHallModalContainer = ({ onSubmit, onClose }: ContactHallModalProps) => {
    const [employeeUid, setEmployeeUid] = useState<string | null>(null)
    const [loadedEmployee, setLoadedEmployee] = useState<any>(null)
    const { employee, isLoading: employeeLoading } = useEmployee(employeeUid)
    const { data } = useGraphQL(GET_CONTACT_PERSON_ROLES)

    const formMethods = useForm<z.input<typeof contactHallSchema>, unknown, ContactHallFormData>({
        resolver: zodResolver(contactHallSchema),
        defaultValues: {
            role: null,
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
        role: {
            name: 'role',
            label: nestedForm.role.label,
            disabled: false,
            codebook: CODEBOOK.CONTACT_PERSON_ROLE,
        },
    })

    // Track loaded employee data separately (don't overwrite form value)
    useEffect(() => {
        if (employee && employeeUid) {
            setLoadedEmployee({
                uid: employee.uid,
                fullName: employee.fullName,
                phone1: employee.phone1 || '',
                phone2: employee.phone2 || '',
            })
        }
    }, [employee, employeeUid])

    const handleFormSubmit = handleSubmit(data => {
        if (onSubmit && loadedEmployee) {
            // Merge Combobox selection with loaded employee data
            onSubmit({
                role: data.role,
                employee: loadedEmployee,
            })
        }
    })

    const selectedRole = watch('role')
    const selectedEmployee = watch('employee')
    const isSubmitDisabled =
        !selectedEmployee ||
        !selectedRole ||
        !loadedEmployee ||
        employeeLoading ||
        formState.isSubmitting

    return (
        <div className="space-y-6 min-w-0 max-w-none w-full">
            <FormProvider {...formMethods}>
                <div className="flex space-x-3">
                    <Combobox {...fields.role} codebookResponse={data?.contactPersonRoles} />
                    <Combobox
                        {...fields.employee}
                        onSelect={v => setEmployeeUid(v ? v.uid : null)}
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
