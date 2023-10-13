import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Fragment, useEffect, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import Combobox from '@/components/form/Combobox'
import Listbox from '@/components/form/Listbox'
import { FormModal } from '@/hooks/form/useFormModal'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { Query } from '@/types/gql/graphql'

const nestedForm = message.roomCardsPage.nestedForm

const GET_CONTACT_PERSON_ROLES = gql`
  query GetContactPersonRoles {
    contactPersonRoles {
      uid
      name
    }
  }
`
const GET_EMPLOYEE = gql`
  query GetEmployee($uid: String!) {
    employees(where: { uid: $uid }) {
      uid
      fullName
      phoneNumber
    }
  }
`

export const PersonHallButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm()
  const { watch } = formMethods
  const employee = watch('employee')

  const { data } = useQuery(GET_CONTACT_PERSON_ROLES)

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'contactPersonsHall' })

  const [getEployee, { data: employeeQuery }] = useLazyQuery<Query>(GET_EMPLOYEE, {
    variables: {
      uid: employee?.uid
    }
  })

  useEffect(() => {
    if (employee) {
      getEployee()
    }
  }, [employee, getEployee])

  const onSubmit = data => {
    insert(arrayFields.length, {
      employee: employeeQuery?.employees[0],
      role: data.role
    })
  }

  const fields = useMakeFormFields({
    employee: {
      name: 'employee',
      disabled: false,
      label: nestedForm.employee.label,
      codebook: CODEBOOK.EMPLOYEE
    },
    role: {
      name: 'role',
      label: nestedForm.role.label,
      disabled: false
    }
  })

  return (
    <Fragment>
      <PlusButton
        primary
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <FormModal formMethods={formMethods} open={isModalOpen} setOpen={setIsModalOpen} onSubmit={onSubmit}>
        <div className="flex space-x-3">
          <Listbox {...fields.role} codebookResponse={data?.contactPersonRoles} />
          <Combobox {...fields.employee} />
        </div>
      </FormModal>
    </Fragment>
  )
}
