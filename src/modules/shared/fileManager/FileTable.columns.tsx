import type { ColumnDef } from '@tanstack/react-table'
import FileActions, { FileNameEditor, TagInput } from './FileActions'
import { useMemo } from 'react'
import { Badge } from '@/components/visuals/Badge'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { v4 } from 'uuid'
import type { FileItemExtended } from './types'
import { useLinkUpdate } from './hooks/useLinks'

export const useFileColumns = ({ hasEditRole, handlePut, itemType, uid }) => {
  const { mutate } = useLinkUpdate({ parentUid: uid })
  const columns = useMemo(() => {
    const cols: ColumnDef<FileItemExtended, any>[] = [
      {
        header: 'actions',
        size: 20,
        cell: ({ row: { original } }) => (
          <FileActions
            file={original}
            itemType={itemType}
            uid={uid}
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
              if (original.type === 'LINK') {
                mutate({ ...original, name: newName, uid: original.id })
              } else {
                handlePut(original.id, { name: newName, tags: original.tags })
              }
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
                      if (original.type === 'LINK') {
                        mutate({
                          ...original,
                          tags: (original.tags || []).filter(f => f !== v),
                          uid: original.id
                        })
                      } else {
                        handlePut(original.id, {
                          name: original.name,
                          tags: (original.tags || []).filter(f => f !== v)
                        })
                      }
                    }}
                  />
                </Badge>
              ))}
            <TagInput
              onConfirm={(tag: string) => {
                if (original.tags?.includes(tag)) return
                if (original.type === 'LINK') {
                  mutate({
                    ...original,
                    tags: [...(original.tags || []), tag],
                    uid: original.id
                  })
                } else {
                  handlePut(original.id, {
                    name: original.name,
                    tags: [...(original.tags || []), tag]
                  })
                }
              }}
            />
          </div>
        )
      },
      {
        header: 'Type',
        accessorKey: 'type',
        size: 20,
        enableColumnFilter: false
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
  }, [hasEditRole, handlePut, itemType, uid, mutate])

  return columns
}
