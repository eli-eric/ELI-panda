import type { ColumnDef } from '@tanstack/react-table'
import FileActions, { FileNameEditor, TagInput } from './FileActions'
import type { FileItem } from './types'
import { useMemo } from 'react'
import { Badge } from '@/components/visuals/Badge'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { v4 } from 'uuid'

export const useFileColumns = ({
  hasEditRole,
  files,
  endpoint,
  mutate,
  handlePut
}) => {
  const columns = useMemo(() => {
    const cols: ColumnDef<FileItem, any>[] = [
      {
        header: 'actions',
        size: 20,
        cell: ({ row: { original } }) => (
          <FileActions
            file={original}
            mutate={mutate}
            endpoint={endpoint}
            files={files}
            hasEditRole={hasEditRole}
          />
        )
      },
      {
        header: 'File name',
        accessorKey: 'name',
        filterFn: 'fuzzy',
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ getValue, row: { original } }) => (
          <FileNameEditor
            initialFileName={getValue()}
            onConfirm={(newName: string) => {
              if (original.name === newName) return
              handlePut(original.id, { name: newName, tags: original.tags })
              mutate(
                prev =>
                  (prev || []).map(v =>
                    v.id === original.id ? { ...v, name: newName } : v
                  ),
                {
                  revalidate: false
                }
              )
            }}
          />
        )
      },
      {
        header: 'Tags',
        accessorKey: 'tags',
        filterFn: 'fuzzy',
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center">
            {getValue() &&
              getValue().map((v: string) => (
                <Badge key={v4()} className="mt-1">
                  {v}
                  <XMarkIcon
                    className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
                    onClick={() => {
                      handlePut(original.id, {
                        name: original.name,
                        tags: (original.tags || []).filter(f => f !== v)
                      })
                      mutate(
                        prevs =>
                          (prevs || []).map(prev =>
                            prev.id === original.id
                              ? {
                                  ...prev,
                                  tags: getValue()?.filter(
                                    (f: string) => f !== v
                                  )
                                }
                              : prev
                          ),
                        { revalidate: false }
                      )
                    }}
                  />
                </Badge>
              ))}
            <TagInput
              onConfirm={(tag: string) => {
                if (original.tags?.includes(tag)) return
                handlePut(original.id, {
                  name: original.name,
                  tags: [...(original.tags || []), tag]
                })
                mutate(
                  prev =>
                    (prev || []).map(v =>
                      v.id === original.id
                        ? { ...v, tags: [...(v.tags || []), tag] }
                        : v
                    ),
                  { revalidate: false }
                )
              }}
            />
          </div>
        )
      },
      {
        header: 'Size',
        accessorKey: 'size',
        size: 20,
        enableColumnFilter: false,
        meta: {
          className: 'text-right'
        },
        cell: ({ getValue }) => {
          const size = Math.round(getValue() / 1000)

          const sizeString =
            size > 1000 ? `${Math.round(size / 1000)} MB` : `${size} KB`

          return <span>{sizeString}</span>
        }
      }
    ]

    return cols
  }, [hasEditRole, files, endpoint, mutate, handlePut])

  return columns
}
