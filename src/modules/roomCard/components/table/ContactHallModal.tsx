import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { z } from 'zod'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { gql } from '@/types/gql'

import { useRoomCardStore } from '../../store/useRoomCardStore'

const messages = message.common.buttons
const nestedForm = message.roomCardsPage.nestedForm

const GET_CONTACT_PERSON_ROLES = gql(`
  query GetContactPersonRoles {
    contactPersonRoles {
      uid
      name
    }
  }
`)

const schema = z.object({
  role: z.object({
    uid: z.string(),
    name: z.string()
  }).refine(val => val.uid, 'Role is required'),
  employee: z.any().refine(val => val?.uid, 'Employee is required')
})

type FormData = z.infer<typeof schema>

interface ContactHallModalProps {
  onClose?: () => void
}

export const ContactHallModal = ({
  onClose
}: ContactHallModalProps) => {
  const { setNewHallContact } = useRoomCardStore()
  const { data } = useGraphQL(GET_CONTACT_PERSON_ROLES)

  // Local form for modal
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: undefined,
      employee: undefined
    }
  })

  const { formState, watch, reset } = formMethods
  const [selectedRole, selectedEmployee] = watch(['role', 'employee'])

  // Get employee details when selected - use the full employee object from form
  const { employee: employeeDetails, isLoading: employeeLoading } = useEmployee(
    selectedEmployee?.uid || null
  )

  const fields = useMakeFormFields({
    role: {
      name: 'role',
      label: nestedForm.role.label,
      disabled: false,
      codebook: CODEBOOK.CONTACT_PERSON_ROLE
    },
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    }
  })

  // Form is valid when we have both role and employee selected, and employee is loaded
  const isFormValid = selectedRole?.uid &&
                     selectedEmployee?.uid &&
                     !employeeLoading &&
                     employeeDetails

  const handleSubmit = (data: FormData) => {
    if (!data.employee || !data.role || !employeeDetails) return

    // Always use loaded employee details for complete data
    const newHallContact = {
      employee: {
        ...employeeDetails,
        facilityConnection: null,
        userConnection: null
      },
      role: data.role,
      uid: crypto.randomUUID()
    }

    // Add to store
    setNewHallContact(newHallContact)

    // Reset and close
    reset()
    onClose?.()
  }

  return (
    <div className="space-y-6 pt-4">
      <Form formMethods={formMethods} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Combobox
            {...fields.role}
            codebookResponse={data?.contactPersonRoles}
          />
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