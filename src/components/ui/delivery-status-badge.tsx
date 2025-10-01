import { Check, Clock } from 'lucide-react'
import * as React from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { Badge, type BadgeProps } from './badge'

interface DeliveryStatusBadgeProps
  extends Omit<BadgeProps, 'variant' | 'children'> {
  isDelivered: boolean
}

function DeliveryStatusBadge({
  isDelivered,
  ...props
}: DeliveryStatusBadgeProps) {
  const { formatMessage: fm } = useIntl()

  if (isDelivered) {
    return (
      <Badge
        variant="default"
        className="bg-green-500 hover:bg-green-600 text-white border-green-500"
        {...props}
      >
        <Check className="h-3 w-3" />
        {fm({ id: message.common.ui.delivered })}
      </Badge>
    )
  }

  return (
    <Badge
      variant="secondary"
      className="bg-muted text-muted-foreground border-muted"
      {...props}
    >
      <Clock className="h-3 w-3" />
      {fm({ id: message.common.ui.pending })}
    </Badge>
  )
}

export { DeliveryStatusBadge }
