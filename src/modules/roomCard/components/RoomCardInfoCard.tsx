import { FormattedMessage } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { OperationalState, RoomCardStatus } from '@/types/gql/graphql'

import { formatDateTime } from '../utils'
import {
  getOperationalStateDotColor,
  getStatusBadgeColor,
  getStatusLabel
} from '../utils/statusColors'

const messages = message.roomCardsPage.form
const OPERATIONAL_STATES = Object.values(OperationalState)
const statuses = Object.values(RoomCardStatus).map(value => value)

interface RoomCardInfoCardProps {
  fields: {
    name: any
    status: any
    operationalState: any
  }
  status: RoomCardStatus
  operationalState?: OperationalState | null
  operationalStateLastUpdated?: string | null
}

export const RoomCardInfoCard = ({
  fields,
  status,
  operationalState,
  operationalStateLastUpdated
}: RoomCardInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Room Card Information</CardTitle>
        <Badge
          className={cn(
            'text-gray-900 dark:text-white',
            getStatusBadgeColor(status)
          )}
        >
          {getStatusLabel(status)}
        </Badge>
      </CardHeader>
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
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  getOperationalStateDotColor(operationalState)
                )}
              />
              <Label
                htmlFor="operationalState"
                className="text-base font-medium"
              >
                <FormattedMessage id={messages.operationalState.label} />
              </Label>
            </div>
            <Listbox
              {...fields.operationalState}
              id="operationalState"
              className="w-full"
              customOptions={OPERATIONAL_STATES}
            />
          </div>

          {/* Last Updated */}
          {operationalStateLastUpdated && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Last Updated</Label>
              <p className="text-sm text-muted-foreground pt-2">
                <FormattedMessage id={messages.operationalState.lastUpdated} />{' '}
                {formatDateTime(operationalStateLastUpdated)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
