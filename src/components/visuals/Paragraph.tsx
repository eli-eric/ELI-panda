import type { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { createMessageValues } from '@/utils/formatters'

interface Props {
  message: string
}

export const Paragraph: FC<Props> = ({ message }) => {
  return (
    <p className="prose-sm mt-2 text-gray-600 dark:text-gray-200">
      <FormattedMessage
        id={message}
        values={createMessageValues({ br: <br /> })}
      />
    </p>
  )
}
