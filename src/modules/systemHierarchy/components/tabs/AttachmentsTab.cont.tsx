import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'

interface AttachmentsTabProps {
    system: SystemLeaf
}

export const AttachmentsTabContainer: FC<AttachmentsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="p-4" data-testid={`attachments-${system.uid}`}>
            <h3 className="text-sm font-medium mb-2">
                {fm({ id: message.systemHierarchy.tabs.attachments })}
            </h3>
            <p className="text-sm text-muted-foreground">
                {fm({ id: message.common.files.title })}
            </p>
        </div>
    )
}
