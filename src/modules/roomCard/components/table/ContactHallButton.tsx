import { gql, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { mixed, object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { ContactPersonRole, Employee, Query } from '@/types/gql/graphql'

import { useLazyEmployee } from '../../../../hooks/graphql/useLazyEmployee'
import { useRoomCardStore } from '../../store/useRoomCardStore'
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

export type ContactHallForm = {
  role: ContactPersonRole
  employee: Employee
}

export const ContactHallButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm<ContactHallForm>({ resolver: yupResolver(makeSchema()) })

  const { setNewHallContact } = useRoomCardStore()

  const { data } = useQuery<Query>(GET_CONTACT_PERSON_ROLES)

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'contactPersonsHall' })

  const [getEployee, employee] = useLazyEmployee()

  const onSubmit = (data: { role: ContactPersonRole }) => {
    if (employee) {
      insert(arrayFields.length, {
        employee: employee,
        role: data?.role,
        uuid: uuid()
      })
      setNewHallContact({ employee: employee, role: data?.role })
    }
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
      disabled: false,
      codebook: CODEBOOK.CONTACT_PERSON_ROLE
    }
  })

  function makeSchema() {
    return object().shape({
      role: mixed<ContactPersonRole>().required('Role is required'),
      employee: mixed<Employee>()
        .nullable()
        .required('Employee is required')
        .test(
          'is-unique',
          'Cannot select the same employee twice',
          value => !arrayFields.some((field: any) => field?.employee.uid === value?.uid)
        )
    })
  }

  return (
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
    >
      <Combobox {...fields.role} codebookResponse={data?.contactPersonRoles} />
      <Combobox
        {...fields.employee}
        onSelect={value => {
          if (value.uid) getEployee({ variables: { uid: value.uid } })
        }}
      />
    </HeaderButtonModalComponent>
  )
}
