import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useLazyEmployee } from '../../hooks/useLazyEmployee'
import { useRoomCardStore } from '../../store/useRoomCardStore'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

export const ContactDeptButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setNewDeptContact } = useRoomCardStore()

  const formMethods = useForm({ resolver: yupResolver(makeSchema()) })

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'contactPersonsDept' })

  const [getEployee, employeeQuery] = useLazyEmployee()

  const onSubmit = () => {
    if (!employeeQuery) return
    insert(arrayFields.length, {
      ...employeeQuery
    })
    setNewDeptContact(employeeQuery)
  }

  function makeSchema() {
    return object().shape({
      employee: object()
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
