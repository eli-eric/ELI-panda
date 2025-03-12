import { useIntl } from 'react-intl'

import Listbox from '@/components/form/Listbox'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.publication

const allowedDepartments = ['86', '87', '88', '89', '91', '96', '97']

type DepartmentListboxProps = {
  name: string
  disabled: boolean
}

export function DepartmentListbox({ name, disabled }: DepartmentListboxProps) {
  const { data } = useCodebook(CODEBOOK.DEPARTMENT)
  console.log(data?.data)

  const filteredData = data?.data.filter(department =>
    allowedDepartments.some(code => department.name?.startsWith(code))
  )
  console.log(filteredData)
  const { formatMessage } = useIntl()
  return (
    <Listbox
      name={name}
      label={form.department.label}
      placeholder={formatMessage({ id: form.department.placeholder })}
      disabled={disabled}
      className="col-span-6"
      codebookResponse={filteredData}
    />
  )
}
