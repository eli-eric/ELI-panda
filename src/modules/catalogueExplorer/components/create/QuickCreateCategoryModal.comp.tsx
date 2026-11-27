import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'

import { useCatalogueCategoryCreate } from '../../hooks/mutations/useCatalogueCategoryCreate'
import { toCategoryCode } from '../../utils/toCategoryCode'

export interface QuickCreateCategoryModalProps {
    onClose: () => void
    parentUid: string | null
    onCreated: (uid: string) => void
}

export const QuickCreateCategoryModal: FC<QuickCreateCategoryModalProps> = ({
    onClose,
    parentUid,
    onCreated,
}) => {
    const { formatMessage: fm } = useIntl()
    const { createCategory, isPending } = useCatalogueCategoryCreate()
    const [name, setName] = useState('')
    const code = toCategoryCode(name.trim())

    const isValid = name.trim().length > 0

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) return
        const result = await createCategory({
            name: name.trim(),
            code,
            parentUid,
        })
        if (result?.uid) onCreated(result.uid)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} data-testid="quick-create-category-form">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="qc-cat-name">
                        {fm({ id: message.catalogue.quickCreate.nameLabel })}
                    </Label>
                    <Input
                        id="qc-cat-name"
                        data-testid="quick-create-category-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="qc-cat-code">
                        {fm({ id: message.catalogue.quickCreate.codeLabel })}
                    </Label>
                    <Input
                        id="qc-cat-code"
                        data-testid="quick-create-category-code"
                        value={code}
                        readOnly
                        disabled
                    />
                </div>
            </div>
            <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    {fm({ id: message.catalogue.quickCreate.cancel })}
                </Button>
                <Button type="submit" disabled={!isValid || isPending}>
                    {fm({ id: message.catalogue.quickCreate.submit })}
                </Button>
            </DialogFooter>
        </form>
    )
}
