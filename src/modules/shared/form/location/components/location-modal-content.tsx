import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import type { Codebooktree } from '@/components/form/shared/codebookTree.types'
import { ExpandableNameCell } from '@/components/form/shared/ExpandableNameCell'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import useTableStateStore from '@/store/useTableStateStore'
import { TABLE_IDS } from '@/types/constants/tableIds'
import type { CodebookType } from '@/types/responses/codebook'
import { highlightText } from '@/utils'

import { useLocationModal } from '../hooks/useLocationModal'

interface CodebookTreeModalProps {
    loading?: boolean
    tableId?: string
    onSelect: (item: CodebookType | null) => void
    // Data props
    codebooktree?: Codebooktree[]
    fetchChildren?: (uid: string) => void
}

// The actual modal content, rendered by the global modal system
export function LocationModalContent(
    props: CodebookTreeModalProps & {
        onClose?: () => void
    },
) {
    const {
        tableId = TABLE_IDS.LOCATION_TREE,
        onSelect,
        onClose,
        fetchChildren: propFetchChildren,
        loading: propLoading,
    } = props

    // Fall back to useLocationModal when data props aren't provided
    const locationData = useLocationModal()

    const codebooktree = locationData.codebooktree
    const fetchChildren = propFetchChildren || locationData.fetchChildren
    const loading = propLoading || locationData.loading

    const [item, setItem] = useState<Codebooktree | null>(null)
    const { instances, reset } = useTableStateStore()
    const search = useMemo(() => instances[tableId]?.search || '', [instances, tableId])

    const columns = useMemo((): ColumnDef<Codebooktree, any>[] => {
        const columns: ColumnDef<Codebooktree, string>[] = [
            {
                header: 'Name',
                accessorKey: 'name',
                id: 'name',
                size: 300,
                cell: ({ row, getValue }) => (
                    <ExpandableNameCell {...{ row, getValue, fetchChildren, filterName: search }} />
                ),
            },
            {
                header: 'Code',
                accessorKey: 'code',
                id: 'code',
                cell: ({ getValue }) => highlightText(getValue() || '', search),
            },
        ]

        return columns
    }, [fetchChildren, search])

    const table = usePandaTable<Codebooktree>({
        tableId,
        columns,
        data: codebooktree,
        settings: {
            enableRowSelection: false,
            enableFiltering: false,
            manualFiltering: false,
        },
        getSubRows: row => row?.children || [],
    })

    const { toggleAllRowsExpanded } = table

    useEffect(() => {
        toggleAllRowsExpanded(!!search)
        return () => {
            setItem(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    // Reset table store on unmount so search state can't leak into the next open
    useEffect(() => {
        return () => reset(tableId)
    }, [reset, tableId])

    // Instead of ModalButtons, use a simple footer with actions
    return (
        <div className="flex flex-col gap-3">
            <SearchBar tableId={tableId} useQuery={false} />
            <div className="h-[300px] overflow-hidden border rounded-md">
                <PandaTableV2<Codebooktree>
                    tableId={tableId}
                    data={loading && codebooktree.length === 0 ? undefined : codebooktree}
                    table={table}
                    loading={loading}
                    settings={{
                        enableRowSelection: false,
                        enableFiltering: false,
                        manualFiltering: false,
                    }}
                    getRowProps={row => ({
                        onClick: () => {
                            setItem({
                                uid: row.original.uid,
                                name:
                                    row.original.name +
                                    (row.original.code ? ` (${row.original.code})` : ''),
                                code: row.original?.code,
                            })
                        },
                        className: cn(
                            item?.uid === row.original.uid &&
                                'bg-orange-200 dark:bg-orange-600 hover:bg-orange-200 dark:hover:bg-orange-600',
                            'cursor-pointer',
                        ),
                    })}
                />
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        onClose?.()
                    }}
                >
                    <FormattedMessage id={message.common.buttons.close} />
                </Button>
                <Button
                    type="button"
                    disabled={!item}
                    onClick={() => {
                        onSelect(item)
                        onClose?.()
                    }}
                >
                    <FormattedMessage id={message.common.buttons.continue} />
                </Button>
            </div>
        </div>
    )
}
