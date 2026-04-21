import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

export const CatalogueItemAttachmentsTab: FC = () => {
    const { formatMessage: fm } = useIntl()
    return (
        <div className="p-4 text-sm text-muted-foreground">
            {fm({ id: message.catalogue.detail.pendingIntegration })}
        </div>
    )
}
