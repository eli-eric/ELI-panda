import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { z } from 'zod'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { Employee } from '@/types/gql/graphql'

const messages = message.common.buttons
const nestedForm = message.roomCardsPage.nestedForm

const schema = z.object({
  employee: z.any().refine(val => val?.uid, 'Employee is required')
})

type FormData = z.infer<typeof schema>

interface EmployeeAddModalProps {
  onClose?: () => void
  fieldArrayName: string
  setEmployee: (employee: Employee) => void
}

export const EmployeeAddModal = ({
  onClose,
  fieldArrayName,
  setEmployee
}: EmployeeAddModalProps) => {
  // Local form for modal
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employee: undefined
    }
  })

  const { formState, watch, reset } = formMethods
  const selectedEmployee = watch('employee')

  // Get employee details when selected - use the full employee object from form
  const { employee: employeeDetails, isLoading: employeeLoading } = useEmployee(
    selectedEmployee?.uid || null
  )

  const fields = useMakeFormFields({
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    }
  })

  // Form is valid when we have employee selected and loaded
  const isFormValid = selectedEmployee?.uid && !employeeLoading && employeeDetails

  const handleSubmit = (data: FormData) => {
    if (!data.employee || !employeeDetails) return

    // Always use the loaded employee details to ensure complete data
    const employeeToUse = employeeDetails

    // Call the callback to update parent/store
    setEmployee(employeeToUse)

    // Reset and close
    reset()
    onClose?.()
  }

  return (
    <div className="space-y-6 pt-4">
      <Form formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Combobox
            {...fields.employee}
          />

          {employeeLoading && (
            <p className="text-sm text-blue-600">
              Loading employee details...
            </p>
          )}

        </div>
      </Form>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={messages.close} />
        </Button>
        <Button
          type="button"
          disabled={!isFormValid || formState.isSubmitting}
          onClick={formMethods.handleSubmit(handleSubmit)}
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