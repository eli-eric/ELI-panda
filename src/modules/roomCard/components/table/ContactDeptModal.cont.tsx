import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Button } from '@/components/ui/button'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import type { ContactDeptFormData } from './schemas/contactDept.schema'
import { contactDeptSchema } from './schemas/contactDept.schema'

const nestedForm = message.roomCardsPage.nestedForm
const messages = message.common.buttons

interface ContactDeptModalProps {
  onSubmit?: (data: ContactDeptFormData) => void
  onClose?: () => void
  existingEmployeeUids?: string[]
}

export const ContactDeptModalContainer = ({
  onSubmit,
  onClose,
  existingEmployeeUids = []
}: ContactDeptModalProps) => {
  const [employeeUid, setEmployeeUid] = useState<string | null>(null)
  const [loadedEmployee, setLoadedEmployee] = useState<any>(null)
  const { employee, isLoading: employeeLoading } = useEmployee(employeeUid)

  const formMethods = useForm<ContactDeptFormData>({
    resolver: zodResolver(
      contactDeptSchema.refine(
        data => {
          if (
            data.employee &&
            existingEmployeeUids.includes(data.employee.uid)
          ) {
            return false
          }
          return true
        },
        {
          message: 'Cannot select the same employee twice',
          path: ['employee']
        }
      )
    ),
    defaultValues: {
      employee: null
    }
  })

  const { handleSubmit, formState, watch } = formMethods

  const fields = useMakeFormFields({
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    }
  })

  // Track loaded employee data separately (don't overwrite form value)
  useEffect(() => {
    if (employee && employeeUid) {
      setLoadedEmployee({
        uid: employee.uid,
        fullName: employee.fullName,
        phone1: employee.phone1 || '',
        phone2: employee.phone2 || ''
      })
    }
  }, [employee, employeeUid])

  const handleFormSubmit = handleSubmit(() => {
    if (onSubmit && loadedEmployee) {
      // Pass loaded employee data with full details
      onSubmit({
        employee: loadedEmployee
      })
    }
  })

  const selectedEmployee = watch('employee')
  const isSubmitDisabled =
    !selectedEmployee ||
    !loadedEmployee ||
    employeeLoading ||
    formState.isSubmitting

  return (
    <div className="space-y-6 min-w-0 max-w-none w-full">
      <FormProvider {...formMethods}>
        <div className="flex space-x-3">
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
        <Button
          type="button"
          disabled={isSubmitDisabled}
          onClick={handleFormSubmit}
        >
          {formState.isSubmitting && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          <FormattedMessage id={messages.save} />
        </Button>
      </div>
    </div>
  )
}
