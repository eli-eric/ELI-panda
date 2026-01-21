import { useIntl } from 'react-intl'

import Listbox from '@/components/form/Listbox'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.publication

type DepartmentListboxProps = {
  name: string
  disabled: boolean
}

export function DepartmentListbox({ name, disabled }: DepartmentListboxProps) {
  const { formatMessage } = useIntl()
  return (
    <Listbox
      name={name}
      label={form.department.label}
      placeholder={formatMessage({ id: form.department.placeholder })}
      disabled={disabled}
      className="col-span-6"
      codebook={CODEBOOK.DEPARTMENT}
    />
  )
}
