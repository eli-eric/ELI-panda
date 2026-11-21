import { Loader2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { useWosLookup } from '../hooks/useWosLookup'

const wosMessages = message.publication.wosImport

export const DoiLookupField = () => {
    const { formatMessage: fm } = useIntl()
    const { doi: doiField } = usePublicationFields()
    const { currentPublicationUid, isPending, handleLookup } = useWosLookup()

    return (
        <div className="space-y-2">
            <Input {...doiField} disabled={doiField.disabled || isPending} aria-busy={isPending} />
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={doiField.disabled || isPending}
                    onClick={handleLookup}
                    data-testid="publication-wos-preview-button"
                >
                    {isPending && (
                        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    )}
                    {fm({
                        id: currentPublicationUid ? wosMessages.refresh : wosMessages.fetch,
                    })}
                </Button>
                <span className="text-xs text-muted-foreground">
                    {fm({ id: isPending ? wosMessages.loading : wosMessages.helper })}
                </span>
            </div>
        </div>
    )
}
