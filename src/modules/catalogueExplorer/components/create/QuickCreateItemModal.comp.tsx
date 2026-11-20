import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { useItemCreate } from '@/modules/catalogueItem/hooks/useItemCreate'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

export interface QuickCreateItemModalProps {
    onClose: () => void
    categoryUid: string
    categoryName?: string
    onCreated: (uid: string) => void
}

export const QuickCreateItemModal: FC<QuickCreateItemModalProps> = ({
    onClose,
    categoryUid,
    categoryName,
    onCreated,
}) => {
    const { formatMessage: fm } = useIntl()
    const { submit, loading } = useItemCreate()
    const [name, setName] = useState('')
    const [catalogueNumber, setCatalogueNumber] = useState('')

    const isValid = name.trim().length > 0 && catalogueNumber.trim().length > 0

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) return
        const payload: Partial<CatalogueItem> = {
            name: name.trim(),
            catalogueNumber: catalogueNumber.trim(),
            category: { uid: categoryUid, name: categoryName ?? '' },
        }
        submit(payload as CatalogueItem, {
            onSuccess: (result: { data?: { uid?: string } }) => {
                if (result?.data?.uid) onCreated(result.data.uid)
                onClose()
            },
        })
    }

    return (
        <form onSubmit={handleSubmit} data-testid="quick-create-item-form">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="qc-item-name">
                        {fm({ id: message.catalogue.quickCreate.nameLabel })}
                    </Label>
                    <Input
                        id="qc-item-name"
                        data-testid="quick-create-item-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="qc-item-number">
                        {fm({ id: message.catalogue.quickCreate.catalogueNumberLabel })}
                    </Label>
                    <Input
                        id="qc-item-number"
                        data-testid="quick-create-item-number"
                        value={catalogueNumber}
                        onChange={e => setCatalogueNumber(e.target.value)}
                    />
                </div>
                {categoryName && (
                    <div className="text-xs text-muted-foreground">
                        {fm({ id: message.catalogue.quickCreate.category })}:{' '}
                        <span className="font-medium">{categoryName}</span>
                    </div>
                )}
            </div>
            <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    {fm({ id: message.catalogue.quickCreate.cancel })}
                </Button>
                <Button type="submit" disabled={!isValid || loading}>
                    {fm({ id: message.catalogue.quickCreate.submit })}
                </Button>
            </DialogFooter>
        </form>
    )
}
