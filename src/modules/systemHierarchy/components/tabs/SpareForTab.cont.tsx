import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'

interface SpareForTabProps {
    system: SystemLeaf
}

export const SpareForTabContainer: FC<SpareForTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    const hasSpareFor = (system.sparesOut ?? 0) > 0

    if (!hasSpareFor) {
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
