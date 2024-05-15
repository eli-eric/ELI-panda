import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { mixed, object } from 'yup'

import { PlusButton } from '@/components/Buttons'
import Combobox from '@/components/form/Combobox'
import { FormModal } from '@/hooks/form/useFormModal'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'
import { useEmployee } from '@/hooks/graphql/useEmployee'

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
  const { insert, fields: arrayFields } = useFieldArray({ control, name })

  const [employeeUid, setEmployeeUid] = useState<string | null>(null)

  const { employee } = useEmployee(employeeUid)

  const onSubmit = () => {
    if (!employee) return
    insert(arrayFields.length, {
      ...employee
    })
    setEmployee(employee)
    setEmployeeUid(null)
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
    <Fragment>
      <PlusButton
        primary
        type="button"
        onClick={() => {
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
    </Fragment>
  )
}
