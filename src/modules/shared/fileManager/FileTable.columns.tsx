import {
  DocumentTextIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { fuzzyFilter } from '@/components/ui/table'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { FileActions } from './FileActions'
import { useLinkUpdate } from './hooks/useLinks'
import type { FileItemExtended } from './types'

const buttons = message.common.buttons

interface TagModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  file: FileItemExtended | null
  onAddTag: (tag: string) => void
}

export function TagModalContent({
  file,
  onAddTag,
  onClose
}: {
  file: FileItemExtended | null
  onAddTag: (tag: string) => void
  onClose?: () => void
}) {
  const [tag, setTag] = useState('')
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Add Tag</h3>
      </div>
      <div>
        <label
          htmlFor="tag-name"
          className="block text-sm font-medium text-gray-700"
        >
          Tag Name
        </label>
        <input
          id="tag-name"
          type="text"
          className="mt-1 form-field rounded-md w-full"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {buttons.cancel}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!tag}
          onClick={() => {
            if (tag) {
              onAddTag(tag)
            }
            if (onClose) onClose()
            setTag('')
          }}
        >
          {buttons.continue}
        </button>
      </div>
    </div>
  )
}

function openTagModal({
  file,
  onAddTag
}: {
  file: FileItemExtended | null
  onAddTag: (tag: string) => void
}) {
  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog1', {
    component: TagModalContent,
    props: { file, onAddTag },
    onClose: undefined
  })
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
  onFileDeleted
}: FileColumnsProps) => {
  const { mutate: updateLink } = useLinkUpdate({ parentUid: uid })

  const [tagModalOpen, setTagModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItemExtended | null>(
    null
  )

  const handleAddTag = useCallback(
    (file: FileItemExtended | null, tag: string) => {
      if (!file) return
      if (file.tags?.includes(tag)) return

      if (file.type === 'LINK') {
        updateLink({
          ...file,
          tags: [...(file.tags || []), tag],
          uid: file.id
        })
      } else {
        handlePut(file.id, {
          name: file.name,
          tags: [...(file.tags || []), tag]
        })
      }
    },
    [updateLink, handlePut]
  )

  const handleRemoveTag = useCallback(
    (file: FileItemExtended, tagToRemove: string) => {
      if (file.type === 'LINK') {
        updateLink({
          ...file,
          tags: (file.tags || []).filter(tag => tag !== tagToRemove),
          uid: file.id
        })
      } else {
        handlePut(file.id, {
          name: file.name,
          tags: (file.tags || []).filter(tag => tag !== tagToRemove)
        })
      }
    },
    [updateLink, handlePut]
  )

  const columns = useMemo<ColumnDef<FileItemExtended>[]>(() => {
    const cols: ColumnDef<FileItemExtended>[] = [
      {
        header: 'Name',
        accessorKey: 'name',
        filterFn: fuzzyFilter,
        size: 300,
        meta: {
          filter: {
            enableColumnFilter: true,
            type: 'string'
          }
        },
        cell: ({ row: { original } }) => (
          <div className="flex items-center pt-1 pb-1">
            {original.type === 'FILE' ? (
              <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-500" />
            ) : (
              <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
            )}
            <a
              href={original.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-500 cursor-pointer"
            >
              {original.name}
            </a>
          </div>
        )
      },
      {
        header: 'Tags',
        accessorKey: 'tags',
        filterFn: fuzzyFilter,
        size: 200,
        cell: ({ row: { original } }) => (
          <div className="flex flex-wrap gap-1 items-center">
            {original.tags &&
              original.tags.map((tag: string) => (
                <Badge key={tag} className="mt-1">
                  {tag}
                  {hasEditRole && (
                    <XMarkIcon
                      className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600 clickable"
                      onClick={() => handleRemoveTag(original, tag)}
                    />
                  )}
                </Badge>
              ))}
            {hasEditRole && (
              <button
                onClick={() => {
                  setSelectedFile(original)
                  openTagModal({
                    file: original,
                    onAddTag: tag => handleAddTag(original, tag)
                  })
                }}
                className="text-orange-600 text-sm ml-2 hover:underline"
              >
                Add Tag
              </button>
            )}
          </div>
        )
      },
      {
        header: 'Size',
        accessorKey: 'size',
        size: 50,
        enableColumnFilter: false,
        meta: {
          className: 'text-right'
        },
        cell: ({ getValue, row: { original } }) => {
          if (original.type === 'LINK') return '—'

          const size = Math.round(getValue<number>() / 1000)
          const sizeString =
            size > 1000 ? `${Math.round(size / 1000)} MB` : `${size} KB`

          return <span>{sizeString}</span>
        }
      },
      {
        header: 'Actions',
        id: 'actions',
        size: 60,
        enableColumnFilter: false,
        meta: {
          className: 'text-right'
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
        )
      }
    ]
    return cols
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEditRole, itemType, uid, handleRemoveTag, handlePut])

  return {
    columns,
    modals: <>{/* Modal is now opened via openTagModal */}</>
  }
}
