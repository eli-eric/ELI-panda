import { FormattedMessage } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { RoomCardStatus } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { formatDateTime } from '../utils'
import {
  getOperationalStateDotColor,
  getOperationalStateLabel,
  getStatusBadgeColor,
  getStatusLabel
} from '../utils/statusColors'
import { OperationalStateHistoryButton } from './OperationalStateHistoryButton'

const messages = message.roomCardsPage.form
const statuses = Object.values(RoomCardStatus).map(value => value)

interface RoomCardInfoCardProps {
  fields: {
    name: any
    status: any
    operationalState: any
  }
  status: RoomCardStatus
  operationalState?: CodebookType | null
  operationalStateLastUpdated?: string | null
  roomCardUid?: string
}

export const RoomCardInfoCard = ({
  fields,
  status,
  operationalState,
  operationalStateLastUpdated,
  roomCardUid
}: RoomCardInfoCardProps) => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Room Card Name
            </Label>
            <Input
              {...fields.name}
              id="name"
              placeholder="Enter room card name"
              className="w-full"
            />
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-base font-medium">
              Status
              <Badge
                className={cn(
                  'text-gray-900 dark:text-white',
                  getStatusBadgeColor(status)
                )}
              >
                {getStatusLabel(status)}
              </Badge>
            </Label>
            <Listbox
              {...fields.status}
              id="status"
              defaultValue={RoomCardStatus.CleanMode}
              className="w-full"
              customOptions={statuses}
            />
          </div>

          {/* Operational State Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="operationalState"
                className="text-base font-medium"
              >
                <FormattedMessage id={messages.operationalState.label} />
                <Badge
                  className={cn(
                    'text-gray-900 dark:text-white',
                    getOperationalStateDotColor(operationalState?.code)
                  )}
                >
                  {getOperationalStateLabel(operationalState)}
                </Badge>
              </Label>
            </div>
            <Listbox
              {...fields.operationalState}
              id="operationalState"
              className="w-full"
            />
          </div>

          {/* Last Updated */}
          {operationalStateLastUpdated && (
            <div className="space-y-2">
              <Label className="text-base font-medium">
                Last Updated Operational State
              </Label>
              <div className="flex gap-2">
                <p className="text-sm text-muted-foreground pt-2">
                  <FormattedMessage
                    id={messages.operationalState.lastUpdated}
                  />
                  {formatDateTime(operationalStateLastUpdated)}
                </p>
                <OperationalStateHistoryButton roomCardUid={roomCardUid} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
