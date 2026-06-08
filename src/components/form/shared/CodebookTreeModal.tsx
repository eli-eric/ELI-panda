import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import useTableStateStore from '@/store/useTableStateStore'
import { TABLE_IDS } from '@/types/constants/tableIds'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import { ExpandableNameCell } from './ExpandableNameCell'

type Codebooktree = {
    name: string
    uid: string
    children?: Codebooktree[]
}

interface CodebookTreeModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    codebook?: string
    name: string
    onSubmit?: (item?: any) => void
}

// The actual modal content, rendered by the global modal system
export function CodebookTreeModalContent(
    props: Omit<CodebookTreeModalProps, 'open' | 'setOpen' | 'onSubmit'> & {
        onClose?: () => void
        onSelect?: (item?: any) => void
        title?: string
    },
) {
    const { codebook, onSelect, onClose } = props

    const tableId = TABLE_IDS.CODEBOOK
    const [item, setItem] = useState<CodebookType | undefined>(undefined)
    const { instances, reset } = useTableStateStore()
    const search = useMemo(() => instances[tableId]?.search || '', [instances, tableId])

    // Preserve backend contract: tree endpoint filters via ?columnFilter=[{id,value}]
    const filterState = useMemo(
        () => (search ? [{ id: 'name', value: search }] : []),
        [search],
    )

    const { data: response, isLoading: loading } = useQuery({
        queryKey: [
            'codebookTree',
            { codebook, query: { columnFilter: JSON.stringify(filterState) } },
        ],
        queryFn: queryFetcher<Codebooktree[]>('codebookTree'),
        placeholderData: keepPreviousData,
    })

    const columns = useMemo(
        (): ColumnDef<Codebooktree, string>[] => [
            {
                header: 'Name',
                accessorKey: 'name',
                id: 'name',
                size: 300,
                cell: ({ row, getValue }) => (
                    <ExpandableNameCell {...{ row, getValue, filterName: search }} />
                ),
            },
        ],
        [search],
    )

    const table = usePandaTable<Codebooktree>({
        tableId,
        columns,
        data: response,
        settings: {
            enableRowSelection: false,
            enableFiltering: false,
            manualFiltering: false,
        },
        getSubRows: row => row.children || [],
    })

    const { toggleAllRowsExpanded } = table

    // Auto-expand tree while searching, collapse otherwise
    useEffect(() => {
        toggleAllRowsExpanded(!!search)
        return () => {
            setItem(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    // Reset table store on unmount so search state can't leak into the next open,
    // regardless of how the dialog is dismissed (button, ESC, overlay click).
    useEffect(() => {
        return () => reset(tableId)
    }, [reset, tableId])

    return (
        <div className="flex flex-col gap-3">
            <SearchBar tableId={tableId} useQuery={false} />
            <div className="h-[300px] overflow-hidden border rounded-md">
                <PandaTableV2<Codebooktree>
                    tableId={tableId}
                    table={table}
                    data={response}
                    loading={loading}
                    settings={{
                        enableRowSelection: false,
                        enableFiltering: false,
                        manualFiltering: false,
                    }}
                    getRowProps={row => ({
                        onClick: () => {
                            setItem({ uid: row.original.uid, name: row.original.name })
                        },
                        className: cn(
                            item?.uid === row.original.uid &&
                                'bg-orange-200 dark:bg-orange-500 hover:bg-orange-200 dark:hover:bg-orange-500',
                            'cursor-pointer',
                        ),
                    })}
                />
            </div>
            <div className="flex justify-end gap-2 flex-shrink-0">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={message.common.buttons.close} />
                </Button>
                <Button
                    type="button"
                    disabled={!item}
                    onClick={() => {
                        onSelect?.(item)
                        onClose?.()
                    }}
                >
                    <FormattedMessage id={message.common.buttons.continue} />
                </Button>
            </div>
        </div>
    )
}
