import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, X } from 'lucide-react'
import { useCallback } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { mixed, object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

const nestedForm = message.roomCardsPage.nestedForm

interface PersonnelSectionProps {
  name: string
  label: string
  data: Employee[]
  setNewEmployee: (employee: Employee) => void
  setDisconnectEmployee: (employee: Employee) => void
}

// Modal content component
const AddPersonModal = ({
  label,
  onClose,
  onSubmit,
  existingEmployees
}: {
  label: string
  onClose: () => void
  onSubmit: (employee: Employee) => void
  existingEmployees: Employee[]
}) => {
  // Create schema to prevent duplicate employees
  const schema = object().shape({
    employee: mixed<Employee>()
      .nullable()
      .required('Employee is required')
      .test(
        'is-unique',
        'This employee is already added',
        value =>
          !existingEmployees?.some((emp: Employee) => emp?.uid === value?.uid)
      )
  })

  // Create independent form for the modal
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employee: undefined
    }
  })

  // Create form fields
  const fields = useMakeFormFields({
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    }
  })

  const handleFormSubmit = (data: { employee: Employee }) => {
    if (data.employee) {
      onSubmit(data.employee)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add {label}</h3>
      <Form formMethods={formMethods} onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <Combobox {...fields.employee} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Person</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export const PersonnelSection = ({
  name,
  label,
  data,
  setNewEmployee,
  setDisconnectEmployee
}: PersonnelSectionProps) => {
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })
  const { openModal, closeModal } = useModalGlobalStore()

  const handleAddEmployee = useCallback(
    (employee: Employee) => {
      try {
        // Add to form array
        append(employee)

        // Update store
        setNewEmployee(employee)

        // Close modal
        closeModal('dialog1')

        toast.success(`${employee.fullName} added`)
      } catch (error) {
        toast.error('Failed to add employee')
      }
    },
    [append, setNewEmployee, closeModal]
  )

  const handleRemoveEmployee = useCallback(
    (employeeToRemove: Employee, index: number) => {
      try {
        // Update store first
        setDisconnectEmployee(employeeToRemove)

        // Remove from form array
        remove(index)

        toast.success(`${employeeToRemove.fullName} removed`)
      } catch (error) {
        toast.error('Failed to remove employee')
      }
    },
    [setDisconnectEmployee, remove]
  )

  const handleOpenModal = () => {
    openModal('dialog1', {
      component: AddPersonModal,
      props: {
        title: `Add ${label}`,
        label,
        onClose: () => closeModal('dialog1'),
        existingEmployees: data || []
      },
      onSubmit: handleAddEmployee
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        {hasEditRole && (
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleOpenModal}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Person
          </Button>
        )}
      </div>

      {/* Personnel List */}
      <div className="space-y-2">
        {fields && fields.length > 0 ? (
          fields.map((person: any, index) => {
            return (
              <div
                key={person.uid || index}
                className="flex items-center justify-between p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {person.fullName || person.name || 'Unknown'}
                  </Badge>
                </div>
                {hasEditRole && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => handleRemoveEmployee(person, index)}
                    title={`Remove ${person.fullName}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-sm text-muted-foreground italic py-2">
            No personnel assigned
          </div>
        )}
      </div>
    </div>
  )
}
