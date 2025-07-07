import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { mixed, object } from 'yup'

import { PlusButton } from '@/components/Buttons'
import Combobox from '@/components/form/Combobox'
import { FormModal } from '@/hooks/form/useFormModal'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

const nestedForm = message.roomCardsPage.nestedForm

type Props = {
  setEmployee: (employee: any) => void
  name: string
  editPersmissionRole: ROLE
}

export const HeaderAddButton = ({
  setEmployee,
  name,
  editPersmissionRole
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const editPersmission = usePermission([editPersmissionRole])
  const [employeeUid, setEmployeeUid] = useState<string | null>(null)

  // Get access to parent form context for field array manipulation
  const { control } = useFormContext()
  const { fields: arrayFields, append } = useFieldArray({ control, name })

  // Create a schema maker function to avoid re-creating schema on every render
  const makeSchema = useCallback(fields => {
    return object().shape({
      employee: mixed<Employee>()
        .nullable()
        .required('Employee is required')
        .test(
          'is-unique',
          'Cannot select the same employee twice',
          value => !fields?.some((field: any) => field?.uid === value?.uid)
        )
    })
  }, [])

  // Get employee data outside of form context
  const { employee, isLoading: employeeLoading } = useEmployee(employeeUid)

  // Create an independent form without relying on parent form context
  const formMethods = useForm({
    resolver: yupResolver(makeSchema(arrayFields))
  })

  // Handle employee selection with error handling
  const handleEmployeeSelect = useCallback(value => {
    try {
      setEmployeeUid(value ? value.uid : null)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error selecting employee:', error)
      toast.error('Failed to select employee')
    }
  }, [])

  // Optimized submit handler with field array manipulation
  const onSubmit = useCallback(() => {
    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      if (!employee) {
        setIsSubmitting(false)
        return
      }

      // Add the employee to the form array
      append(employee)

      // Also update the parent state via setEmployee
      setEmployee(employee)

      // Reset state
      formMethods.reset()
      setEmployeeUid(null)
      setIsModalOpen(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding employee:', error)
      toast.error('Failed to add employee')
    } finally {
      setIsSubmitting(false)
    }
  }, [employee, formMethods, setEmployee, isSubmitting, append])

  // Create form fields with memoization
  const fields = useMakeFormFields({
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    }
  })

  if (!editPersmission) return null

  return (
    <div>
      <PlusButton
        primary
        type="button"
        onClick={e => {
          e.stopPropagation()
          setIsModalOpen(true)
        }}
      />
      <FormModal
        formMethods={formMethods}
        open={isModalOpen}
        disableSubmit={!(employee && employeeUid) || employeeLoading}
        loading={isSubmitting || employeeLoading}
        setOpen={setIsModalOpen}
        onSubmit={onSubmit}
      >
        <div className="flex space-x-3">
          <Combobox {...fields.employee} onSelect={handleEmployeeSelect} />
        </div>
      </FormModal>
    </div>
  )
}
