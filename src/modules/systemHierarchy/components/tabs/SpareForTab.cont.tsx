import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { hasSpareFor } from '../../utils/predicates'

interface SpareForTabProps {
    system: SystemLeaf
}

export const SpareForTabContainer: FC<SpareForTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    if (!hasSpareFor(system)) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.spareFor.noSpareFor })}
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="text-sm">
                <span className="text-muted-foreground">
                    {fm({ id: message.systemHierarchy.columns.sparesOut })}:
                </span>{' '}
                <span className="font-medium">{system.sparesOut}</span>
            </div>
        </div>
    )
}
