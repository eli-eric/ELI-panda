import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { mixed, object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'
import { gql } from '@/types/gql'
import type { ContactPersonRole, Employee } from '@/types/gql/graphql'

import { useRoomCardStore } from '../../store/useRoomCardStore'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

const GET_CONTACT_PERSON_ROLES = gql(`
  query GetContactPersonRoles {
    contactPersonRoles {
      uid
      name
    }
  }
`)

export type ContactHallForm = {
  role: ContactPersonRole
  employee: Employee
}

export const ContactHallButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])

  const formMethods = useForm<ContactHallForm>({
    resolver: yupResolver(makeSchema())
  })

  const { setNewHallContact } = useRoomCardStore()

  const { data } = useGraphQL(GET_CONTACT_PERSON_ROLES)

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({
    control,
    name: 'contactPersonsHall'
  })

  const [employeeUid, setEmployeeUid] = useState<string | null>(null)

  const { employee } = useEmployee(employeeUid)

  const onSubmit = (data: { role: ContactPersonRole }) => {
    if (employee) {
      insert(arrayFields.length, {
        employee: {
          ...employee,
          facilityConnection: null,
          userConnection: null
        },
        role: data?.role,
        uuid: uuid()
      })
      setNewHallContact({ employee: employee as Employee, role: data?.role })
      setEmployeeUid(null)
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
          value =>
            !arrayFields.some(
              (field: any) => field?.employee.uid === value?.uid
            )
        )
    })
  }

  if (!canEdit) return null

  return (
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
      disableSubmit={!(employee && employeeUid)}
    >
      <Combobox {...fields.role} codebookResponse={data?.contactPersonRoles} />
      <Combobox
        {...fields.employee}
        onSelect={v => setEmployeeUid(v ? v.uid : null)}
      />
    </HeaderButtonModalComponent>
  )
}
