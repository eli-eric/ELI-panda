import { Loader2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'

import { useWosImportSelection } from '../hooks/useWosImportSelection'
import type { PublicationWosFoundPreview, PublicationWosImportSelection } from '../types/wos-import'
import { WosAuthorMatches } from './wos-author-matches.comp'
import { WosImportFieldsTable } from './wos-import-fields-table.comp'

interface Props {
    preview: PublicationWosFoundPreview
    currentValues: Record<string, unknown>
    onSubmit: (selection: PublicationWosImportSelection) => void | Promise<void>
    onClose: () => void
}

export const PublicationWosImportDialog = ({
    preview,
    currentValues,
    onSubmit,
    onClose,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const { fieldsTableProps, authorMatchesProps, missingFields, isSubmitting, handleSubmit } =
        useWosImportSelection({ preview, currentValues, onSubmit })

    return (
        <div className="shrink-0 space-y-5" data-testid="publication-wos-import-dialog">
            <WosImportFieldsTable {...fieldsTableProps} />
            <WosAuthorMatches {...authorMatchesProps} />
            {missingFields && <p className="text-xs text-muted-foreground">{missingFields}</p>}
            <DialogFooter className="sticky bottom-0 z-20 border-t bg-background pt-2 pb-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                    {fm({ id: message.common.buttons.cancel })}
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting && (
                        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    )}
                    {fm({ id: message.publication.wosImport.apply })}
                </Button>
            </DialogFooter>
        </div>
    )
}
