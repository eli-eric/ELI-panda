import {
  DocumentTextIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import { fuzzyFilter } from '@/components/ui/table'
import { Badge } from '@/components/visuals/Badge'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

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

const TagModal = ({ isOpen, setIsOpen, file, onAddTag }: TagModalProps) => {
  const [tag, setTag] = useState('')

  const modalButtons: ModalButtons = {
    goNext: {
      text: buttons.continue,
      onClick: () => {
        if (tag) {
          onAddTag(tag)
        }
        setIsOpen(false)
        setTag('')
      }
    },
    goBack: {
      text: buttons.cancel,
      onClick: () => {
        setIsOpen(false)
        setTag('')
      }
    }
  }

  return (
    <ModalComponent open={isOpen} setOpen={setIsOpen} buttons={modalButtons}>
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
    </ModalComponent>
  )
}

interface FileColumnsProps {
  hasEditRole?: boolean
  handlePut: (id: string, data: { name?: string; tags?: string[] }) => void
  itemType: string
  uid?: string
}

export const useFileColumns = ({
  hasEditRole,
  handlePut,
  itemType,
  uid
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
              className="hover:text-primary-500 cursor-pointer"
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
                      className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveTag(original, tag)}
                    />
                  )}
                </Badge>
              ))}
            {hasEditRole && (
              <button
                onClick={() => {
                  setSelectedFile(original)
                  setTagModalOpen(true)
                }}
                className="text-primary-600 text-sm ml-2 hover:underline"
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
          />
        )
      }
    ]
    return cols
  }, [hasEditRole, itemType, uid, handleRemoveTag, handlePut])

  return {
    columns,
    modals: (
      <>
        <TagModal
          isOpen={tagModalOpen}
          setIsOpen={setTagModalOpen}
          file={selectedFile}
          onAddTag={tag => handleAddTag(selectedFile, tag)}
        />
      </>
    )
  }
}
