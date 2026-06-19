import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { message } from '@/i18n/src/messages'

interface AddGroupRowProps {
    onAdd: (name: string) => Promise<unknown>
    isPending: boolean
}

export const AddGroupRow: FC<AddGroupRowProps> = ({ onAdd, isPending }) => {
    const { formatMessage: fm } = useIntl()
    const [name, setName] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = name.trim()
        if (!trimmed) return
        await onAdd(trimmed)
        setName('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border border-dashed border-border rounded-md p-2"
        >
            <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={fm({ id: message.catalogue.category.newGroupPlaceholder })}
                className="h-8 text-sm flex-1"
                disabled={isPending}
            />
            <Button type="submit" size="sm" disabled={!name.trim() || isPending}>
                <Plus className="size-3.5" />
                {fm({ id: message.catalogue.category.addGroup })}
            </Button>
        </form>
    )
}
