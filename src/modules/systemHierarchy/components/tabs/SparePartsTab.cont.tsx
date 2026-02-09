import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'

interface SparePartsTabProps {
    system: SystemLeaf
}

export const SparePartsTabContainer: FC<SparePartsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    const hasSpareParts = (system.sparesIn ?? 0) > 0

    if (!hasSpareParts) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareParts.noSpareParts })}
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="text-sm">
                <span className="text-muted-foreground">
                    {fm({ id: message.systemHierarchy.columns.sparesIn })}:
                </span>{' '}
                <span className="font-medium">{system.sparesIn}</span>
            </div>
        </div>
    )
}
