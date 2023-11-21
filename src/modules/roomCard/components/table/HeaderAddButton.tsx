import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { mixed, object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { HeaderButtonModalComponent } from '@/modules/roomCard/components/table/HeaderButtonModal.comp'
import { useLazyEmployee } from '@/modules/roomCard/hooks/useLazyEmployee'
import { CODEBOOK } from '@/types/constants/codebook'
import type { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

const nestedForm = message.roomCardsPage.nestedForm

type Props = {
  setEmployee: (employee: any) => void
  name: string
  editPersmissionRole: ROLE
}

export const HeaderAddButton = ({ setEmployee, name, editPersmissionRole }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const editPersmission = usePermission([editPersmissionRole])

  const formMethods = useForm({ resolver: yupResolver(makeSchema()) })

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name })

  const [getEployee, employeeQuery] = useLazyEmployee()

  const onSubmit = () => {
    if (!employeeQuery) return
    insert(arrayFields.length, {
      ...employeeQuery
    })
    setEmployee(employeeQuery)
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
    <HeaderButtonModalComponent
      formMethods={formMethods}
      isModalOpen={isModalOpen}
      onSubmit={onSubmit}
      setIsModalOpen={setIsModalOpen}
    >
      <Combobox
        {...fields.employee}
        onSelect={value => {
          if (value.uid) getEployee({ variables: { uid: value.uid } })
        }}
      />
    </HeaderButtonModalComponent>
  )
}
