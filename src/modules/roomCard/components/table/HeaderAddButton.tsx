import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
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
  const editPersmission = usePermission([editPersmissionRole])

  const formMethods = useForm({ resolver: yupResolver(makeSchema()) })

  const { control } = useFormContext()
  const {
    insert,
    fields: arrayFields,
    append
  } = useFieldArray({ control, name })

  const [employeeUid, setEmployeeUid] = useState<string | null>(null)

  const { employee } = useEmployee(employeeUid)

  const onSubmit = () => {
    if (!employee) return

    try {
      // Use append instead of insert when array is empty to avoid potential issues
      if (!arrayFields || arrayFields.length === 0) {
        // Use append which is more efficient for adding to an empty array
        append({
          ...employee
        })
      } else {
        // Use insert only when array already has elements
        insert(arrayFields.length, {
          ...employee
        })
      }

      // Only update state after successful insertion
      setEmployee(employee)
      setEmployeeUid(null)

      // Close modal after successful submission
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding employee:', error)
      // Handle the error appropriately (could show a toast notification)
    }
  }

  function makeSchema() {
    return object().shape({
      employee: mixed<Employee>()
        .nullable()
        .required('Employee is required')
        .test(
          'is-unique',
          'Cannot select the same employee twice',
          value => !arrayFields.some((field: any) => field?.uid === value?.uid)
        )
    })
  }

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
        disableSubmit={!(employee && employeeUid)}
        setOpen={setIsModalOpen}
        onSubmit={onSubmit}
      >
        <div className="flex space-x-3">
          <Combobox
            {...fields.employee}
            onSelect={v => setEmployeeUid(v ? v.uid : null)}
          />
        </div>
      </FormModal>
    </div>
  )
}
