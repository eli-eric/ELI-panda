import { FileText } from 'lucide-react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

export const CodebookEmptyState = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="flex h-full flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">
                {fm({ id: message.codebooksPage.emptyState.title })}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {fm({ id: message.codebooksPage.emptyState.description })}
            </p>
        </div>
    )
}
