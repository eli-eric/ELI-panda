import { gql, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { object } from 'yup'

import Combobox from '@/components/form/Combobox'
import Listbox from '@/components/form/Listbox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useLazyEmployee } from '../../hooks/useLazyEmployee'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

const GET_CONTACT_PERSON_ROLES = gql`
  query GetContactPersonRoles {
    contactPersonRoles {
      uid
      name
    }
  }
`

const schema = object().shape({
  role: object().nullable().required('Role is required'),
  employee: object().nullable().required('Employee is required')
})

export const ContactHallButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm({ resolver: yupResolver(schema) })
  const { watch } = formMethods
  const employee = watch('employee')

  const { data } = useQuery(GET_CONTACT_PERSON_ROLES)

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'contactPersonsHall' })

  const [getEployee, employeeQuery] = useLazyEmployee(employee?.uid)

  const onSubmit = data => {
    insert(arrayFields.length, {
      employee: employeeQuery,
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
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
    >
      <Listbox {...fields.role} codebookResponse={data?.contactPersonRoles} />
      <Combobox
        {...fields.employee}
        onSelect={() => {
          getEployee()
        }}
      />
    </HeaderButtonModalComponent>
  )
}
