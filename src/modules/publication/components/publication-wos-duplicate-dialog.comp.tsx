import { useIntl } from 'react-intl'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'

import type { PublicationWosDuplicatePreview } from '../types/wos-import'

const wosMessages = message.publication.wosImport

interface Props {
    preview: PublicationWosDuplicatePreview
    onOpenExisting: () => void | Promise<void>
    onClose: () => void
}

export const PublicationWosDuplicateDialog = ({ preview, onOpenExisting, onClose }: Props) => {
    const { formatMessage: fm } = useIntl()
    const { existingPublication } = preview

    return (
        <div className="space-y-4" data-testid="publication-wos-duplicate-dialog">
            <Alert>
                <AlertTitle>{existingPublication.title}</AlertTitle>
                <AlertDescription>
                    {fm(
                        { id: wosMessages.duplicate.description },
                        { code: existingPublication.code, doi: preview.doi },
                    )}
                </AlertDescription>
            </Alert>
            <DialogFooter className="border-t pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    {fm({ id: message.common.buttons.cancel })}
                </Button>
                <Button type="button" onClick={onOpenExisting}>
                    {fm({ id: wosMessages.duplicate.open })}
                </Button>
            </DialogFooter>
        </div>
    )
}
