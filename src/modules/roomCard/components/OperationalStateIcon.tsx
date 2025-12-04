import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { OperationalState } from '@/types/gql/graphql'

import { operationalStateColorMapping } from '../utils/constants'

const messages = message.roomCardsPage.form.operationalState

type Props = {
  state?: OperationalState | null
}

export const OperationalStateIcon = ({ state }: Props) => {
  const { formatMessage: fm } = useIntl()

  if (!state) return null

  return (
    <Tooltip
      content={`${fm({ id: messages.label })}: ${fm({ id: messages.values[state] })}`}
    >
      <div className="flex items-center">
        <div
          className={cn(
            'h-4 w-4 rounded-full',
            operationalStateColorMapping(state)
          )}
        />
      </div>
    </Tooltip>
  )
}
