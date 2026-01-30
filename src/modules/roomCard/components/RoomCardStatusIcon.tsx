import { Tooltip } from '@/components/Tooltip'
import { cn } from '@/lib/utils'
import type { RoomCardStatus as RoomCardStatusType } from '@/types/gql/graphql'

import { statusColorMapping } from '../utils/constants'

type Props = {
    status: RoomCardStatusType
}

export const RoomCardStatusIcon = ({ status }: Props) => (
    <Tooltip content={`Room status: ${status}`}>
        <div className={cn('w-10 h-10 rounded-full', ...statusColorMapping(status))} />
    </Tooltip>
)
