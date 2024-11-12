import type { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

type Props = {
  name: string
  value?: string
}
export const SummaryListParam: FC<Props> = ({ name, value }) => {
  return (
    <li>
      <FormattedMessage
        id={propertyMessage.property}
        values={createMessageValues({
          name,
          value,
          unit: ''
        })}
      />
    </li>
  )
}
