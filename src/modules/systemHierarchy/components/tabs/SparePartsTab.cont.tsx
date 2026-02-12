import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { hasSpareParts } from '../../utils/predicates'

interface SparePartsTabProps {
    system: SystemLeaf
}

export const SparePartsTabContainer: FC<SparePartsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    if (!hasSpareParts(system)) {
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
