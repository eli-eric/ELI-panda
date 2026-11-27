'use client'

import { Loader2, Pencil } from 'lucide-react'
import type { FC, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Input } from '@/components/ui/input'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { useSystemFieldSave } from '../hooks/useSystemFieldSave'
import type { SystemDetail } from '../types'

interface SystemTitleFieldProps {
    system: Pick<SystemDetail, 'uid' | 'name'>
}

/** Jira-style inline title: click to edit, Enter / blur saves, Escape cancels. */
export const SystemTitleField: FC<SystemTitleFieldProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(system.name)

    useEffect(() => setDraft(system.name), [system.name])

    const cancel = () => {
        setDraft(system.name)
        setIsEditing(false)
    }

    const commit = () => {
        setIsEditing(false)
        const name = draft.trim()
        if (!name || name === system.name) {
            setDraft(system.name)
            return
        }
        // a failed save / declined soft lock falls back to the server value
        saveSystem({ name }).catch(() => setDraft(system.name))
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') commit()
        if (event.key === 'Escape') cancel()
    }

    if (isEditing) {
        return (
            <Input
                autoFocus
                value={draft}
                onChange={event => setDraft(event.target.value)}
                onBlur={commit}
                onKeyDown={handleKeyDown}
                aria-label={fm({ id: message.systemHierarchy.fields.name })}
                className="h-auto text-xl font-semibold py-1"
                data-testid="system-title-input"
            />
        )
    }

    return (
        <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={readOnly}
            className={cn(
                'group flex w-full items-center gap-2 rounded-md px-2 py-1 -mx-2 text-left',
                !readOnly && 'hover:bg-accent cursor-text',
            )}
            data-testid="system-title"
        >
            <h2 className="text-xl font-semibold leading-tight break-words">{draft}</h2>
            {isPending ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
                !readOnly && (
                    <Pencil className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                )
            )}
        </button>
    )
}
