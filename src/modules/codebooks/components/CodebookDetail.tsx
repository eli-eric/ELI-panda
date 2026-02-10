import { Info } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookValueTable } from './CodebookValueTable'

interface Props {
    codebookCode: string
    data: CodebookType[]
    isLoading: boolean
    onAdd: () => void
    onUpdate: (data: { uid: string; name: string; code?: string }) => Promise<void>
    onDelete: (value: CodebookType) => void
}

export const CodebookDetail = ({
    codebookCode,
    data,
    isLoading,
    onAdd,
    onUpdate,
    onDelete,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const [updatingUid, setUpdatingUid] = useState<string>()

    const handleUpdate = useCallback(
        async (data: { uid: string; name: string; code?: string }) => {
            setUpdatingUid(data.uid)
            try {
                await onUpdate(data)
            } finally {
                setUpdatingUid(undefined)
            }
        },
        [onUpdate],
    )

    return (
        <div className="flex h-full flex-col p-6">
            <div className="mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">{codebookCode}</h2>
                    <Tooltip
                        content={fm({ id: message.codebooksPage.detail.infoTooltip })}
                        maxWidth="max-w-sm"
                    >
                        <div className="flex h-6 w-6 cursor-help items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                            <Info className="h-4 w-4" />
                        </div>
                    </Tooltip>
                </div>
                <p className="text-muted-foreground">
                    {fm({ id: message.codebooksPage.detail.manageValues })}
                </p>
            </div>

            <CodebookValueTable
                data={data}
                isLoading={isLoading}
                onAdd={onAdd}
                onUpdate={handleUpdate}
                onDelete={onDelete}
                updatingUid={updatingUid}
            />
        </div>
    )
}
