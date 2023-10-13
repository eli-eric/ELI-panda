import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { object } from 'yup'

import Combobox from '@/components/form/Combobox'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useLazyEmployee } from '../../hooks/useLazyEmployee'
import { HeaderButtonModalComponent } from './HeaderButtonModal.comp'

const nestedForm = message.roomCardsPage.nestedForm

const schema = object().shape({
  employee: object().nullable().required('Employee is required')
})

export const ContactDeptButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formMethods = useForm({ resolver: yupResolver(schema) })
  const { watch } = formMethods
  const employee = watch('employee')

  const { control } = useFormContext()
  const { insert, fields: arrayFields } = useFieldArray({ control, name: 'contactPersonsDept' })

  const [getEployee, employeeQuery] = useLazyEmployee(employee?.uid)

  const onSubmit = () => {
    insert(arrayFields.length, {
      ...employeeQuery
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
        onSelect={() => {
          getEployee()
        }}
      />
    </HeaderButtonModalComponent>
  )
}
