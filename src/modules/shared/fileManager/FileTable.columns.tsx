import type { ColumnDef } from '@tanstack/react-table'
import { FileText, Link, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fuzzyFilter } from '@/components/ui/table'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { FileActions } from './FileActions'
import { useLinkUpdate } from './hooks/useLinks'
import type { FileItemExtended } from './types'

const buttons = message.common.buttons
const filesMsg = message.common.files

export function TagModalContent({
    onAddTag,
    onClose,
}: {
    onAddTag: (tag: string) => void
    onClose?: () => void
}) {
    const [tag, setTag] = useState('')
    return (
        <div>
            <div className="space-y-2">
                <Label htmlFor="tag-name">
                    <FormattedMessage id={filesMsg.tagName} />
                </Label>
                <Input
                    id="tag-name"
                    type="text"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={buttons.cancel} />
                </Button>
                <Button
                    type="button"
                    disabled={!tag}
                    onClick={() => {
                        if (tag) {
                            onAddTag(tag)
                        }
                        if (onClose) onClose()
                        setTag('')
                    }}
                >
                    <FormattedMessage id={buttons.continue} />
                </Button>
            </div>
        </div>
    )
}

function openTagModal({
    file,
    onAddTag,
}: {
    file: FileItemExtended | null
    onAddTag: (tag: string) => void
}) {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()
    const modalId = openModal('dialog', {
        id: `add-tag-${file?.id}`,
        component: TagModalContent,
        props: { file, onAddTag, title: message.common.files.addTagTitle },
        onClose: undefined,
    })
    return modalId
}

interface FileColumnsProps {
    hasEditRole?: boolean
    handlePut: (id: string, data: { name?: string; tags?: string[] }) => void
    itemType: string
    uid?: string
    onFileDeleted?: () => void
}

export const useFileColumns = ({
    hasEditRole,
    handlePut,
    itemType,
    uid,
    onFileDeleted,
}: FileColumnsProps) => {
    const { formatMessage: fm } = useIntl()
    const { mutate: updateLink } = useLinkUpdate({ parentUid: uid })

    const handleAddTag = useCallback(
        (file: FileItemExtended | null, tag: string) => {
            if (!file) return
            if (file.tags?.includes(tag)) return

            if (file.type === 'LINK') {
                updateLink({
                    ...file,
                    tags: [...(file.tags || []), tag],
                    uid: file.id,
                })
            } else {
                handlePut(file.id, {
                    name: file.name,
                    tags: [...(file.tags || []), tag],
                })
            }
        },
        [updateLink, handlePut],
    )

    const handleRemoveTag = useCallback(
        (file: FileItemExtended, tagToRemove: string) => {
            if (file.type === 'LINK') {
                updateLink({
                    ...file,
                    tags: (file.tags || []).filter(tag => tag !== tagToRemove),
                    uid: file.id,
                })
            } else {
                handlePut(file.id, {
                    name: file.name,
                    tags: (file.tags || []).filter(tag => tag !== tagToRemove),
                })
            }
        },
        [updateLink, handlePut],
    )

    const columns = useMemo<ColumnDef<FileItemExtended>[]>(() => {
        const cols: ColumnDef<FileItemExtended>[] = [
            {
                header: () => <FormattedMessage id={filesMsg.name} />,
                accessorKey: 'name',
                filterFn: fuzzyFilter,
                size: 300,
                meta: {
                    filter: {
                        enableColumnFilter: true,
                        type: 'string',
                    },
                },
                cell: ({ row: { original } }) => (
                    <div className="flex items-center py-1">
                        {original.type === 'FILE' ? (
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        ) : (
                            <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                        )}
                        <a
                            href={original.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary cursor-pointer transition-colors"
                        >
                            {original.name}
                        </a>
                    </div>
                ),
            },
            {
                header: () => <FormattedMessage id={filesMsg.tags} />,
                accessorKey: 'tags',
                filterFn: fuzzyFilter,
                size: 200,
                cell: ({ row: { original } }) => (
                    <div className="flex flex-wrap gap-1 items-center">
                        {original.tags &&
                            original.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="mt-1">
                                    {tag}
                                    {hasEditRole && (
                                        <X
                                            className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive transition-colors"
                                            onClick={() => handleRemoveTag(original, tag)}
                                        />
                                    )}
                                </Badge>
                            ))}
                        {hasEditRole && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    openTagModal({
                                        file: original,
                                        onAddTag: tag => handleAddTag(original, tag),
                                    })
                                }}
                                className="text-primary text-sm ml-2 hover:underline h-auto p-0"
                            >
                                <FormattedMessage
                                    id="common.buttons.addTag"
                                    defaultMessage="Add Tag"
                                />
                            </Button>
                        )}
                    </div>
                ),
            },
            {
                header: () => <FormattedMessage id={filesMsg.size} />,
                accessorKey: 'size',
                size: 50,
                enableColumnFilter: false,
                meta: {
                    className: 'text-right',
                },
                cell: ({ getValue, row: { original } }) => {
                    if (original.type === 'LINK') return fm({ id: filesMsg.dash })

                    const size = Math.round(getValue<number>() / 1000)
                    const sizeString =
                        size > 1000
                            ? fm({ id: filesMsg.fileSizeMb }, { value: Math.round(size / 1000) })
                            : fm({ id: filesMsg.fileSizeKb }, { value: size })

                    return <span>{sizeString}</span>
                },
            },
            {
                header: '',
                id: 'actions',
                size: 50,
                enableColumnFilter: false,
                enableSorting: false,
                enablePinning: false,
                enableHiding: false,
                meta: {
                    className: 'text-right',
                },
                cell: ({ row: { original } }) => (
                    <FileActions
                        file={original}
                        hasEditRole={hasEditRole}
                        itemType={itemType}
                        uid={uid}
                        handlePut={handlePut}
                        onFileDeleted={onFileDeleted}
                    />
                ),
            },
        ]
        return cols
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasEditRole, itemType, uid, handleRemoveTag, handlePut])

    return {
        columns,
        modals: <>{/* Modal is now opened via openTagModal */}</>,
    }
}
