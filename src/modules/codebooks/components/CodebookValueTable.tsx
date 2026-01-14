import type { ColumnDef } from '@tanstack/react-table'
import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookInlineEdit } from './CodebookInlineEdit'
import { CodebookValueActions } from './CodebookValueActions'

interface Props {
  data: CodebookType[]
  isLoading: boolean
  onAdd: () => void
  onUpdate: (uid: string, name: string) => Promise<void>
  onDelete: (value: CodebookType) => void
  updatingUid?: string
}

export const CodebookValueTable = ({
  data,
  isLoading,
  onAdd,
  onUpdate,
  onDelete,
  updatingUid
}: Props) => {
  const { formatMessage: fm } = useIntl()
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    if (!search) return data
    const lower = search.toLowerCase()
    return data.filter(
      v =>
        v.name.toLowerCase().includes(lower) ||
        v.uid.toLowerCase().includes(lower)
    )
  }, [data, search])

  const columns: ColumnDef<CodebookType>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: fm({ id: message.codebooksPage.table.name }),
        cell: ({ row }) => (
          <CodebookInlineEdit
            value={row.original.name}
            onSave={newName => onUpdate(row.original.uid, newName)}
            isPending={updatingUid === row.original.uid}
          />
        ),
        size: 300
      },
      {
        accessorKey: 'uid',
        header: fm({ id: message.codebooksPage.table.uid }),
        cell: ({ row }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            {row.original.uid}
          </code>
        ),
        size: 200
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <CodebookValueActions onDelete={() => onDelete(row.original)} />
        ),
        size: 50,
        enableSorting: false
      }
    ],
    [fm, onUpdate, onDelete, updatingUid]
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-shrink-0 items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={fm({
              id: message.codebooksPage.table.searchPlaceholder
            })}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {fm({ id: message.codebooksPage.detail.addValue })}
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        <Table
          columns={columns}
          data={filteredData}
          enablePagination
          defaultPageSize={10}
          emptyMessage={
            search
              ? fm({ id: message.codebooksPage.table.noMatchingValues })
              : fm({ id: message.codebooksPage.table.emptyCodebook })
          }
        />
      </div>
    </div>
  )
}
