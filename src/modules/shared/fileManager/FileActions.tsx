import { useQueryClient } from '@tanstack/react-query'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axiosInstance from '@/core/axios/axiosInstance'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

import { useLinkDelete, useLinkUpdate } from './hooks/useLinks'
import type { FileItem, FileItemExtended } from './types'

const messages = message.common.fileManager
const buttons = message.common.buttons

interface FileActionsProps {
  file: FileItemExtended
  hasEditRole?: boolean
  itemType: string
  uid?: string
  handlePut: (id: string, data: { name?: string; tags?: string[] }) => void
  onFileDeleted?: () => void
}

export const FileActions = ({
  file,
  hasEditRole,
  itemType,
  uid,
  handlePut,
  onFileDeleted
}: FileActionsProps) => {
  const intl = useIntl()
  const { mutate: deleteLink } = useLinkDelete({ parentUid: uid, uid: file.id })
  const { mutate: updateLink } = useLinkUpdate({ parentUid: uid })
  const queryClient = useQueryClient()

  // Create warning modal with the current file's name
  const withWarningModal = useWarningModal(
    intl.formatMessage(
      { id: messages.deleteModal.text },
      createMessageValues({ fileName: file.name })
    )
  )
  const handleDeleteSuccess = useCallback(
    (fileId: string) => {
      queryClient.setQueryData<FileItem[]>(['files', itemType, uid], old => {
        if (!old) return []
        return old.filter(obj => obj.id !== fileId)
      })
    },
    [queryClient, itemType, uid]
  )

  const handleDelete = useCallback(() => {
    if (file.type === 'LINK') {
      deleteLink(file.id)
    } else {
      const endpoint = `/api/${itemType}/${uid}/files/${file.id}`
      axiosInstance
        .delete(endpoint)
        .then(() => {
          handleDeleteSuccess(file.id)
          toast.success(`Deleted ${file.name}`)
          // Invalidate the query to force a fresh fetch after deletion
          queryClient.invalidateQueries({ queryKey: ['files', itemType, uid] })
          // Reset dropzone state to allow re-uploading the same file
          if (onFileDeleted) {
            onFileDeleted()
          }
        })
        .catch(error => {
          toast.error(`Failed to delete file: ${error}`)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, deleteLink, itemType, uid, handleDeleteSuccess, queryClient])

  const handleDeleteWithConfirmation = useCallback(() => {
    withWarningModal(() => handleDelete())()
  }, [withWarningModal, handleDelete])

  const handleRenameFile = useCallback(
    (file: FileItemExtended | null, newName: string) => {
      if (!file) return

      if (file.type === 'LINK') {
        updateLink({ ...file, name: newName, uid: file.id })
      } else {
        handlePut(file.id, { name: newName, tags: file.tags })
      }
    },
    [updateLink, handlePut]
  )

  if (!hasEditRole) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="File actions"
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem
          onClick={() => {
            openRenameModal({
              file,
              onRename: newName => handleRenameFile(file, newName)
            })
          }}
          className="cursor-pointer"
        >
          <Edit className="h-4 w-4 mr-2" />
          <FormattedMessage
            id="common.buttons.rename"
            defaultMessage={'Rename'}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteWithConfirmation}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <FormattedMessage
            id="common.buttons.delete"
            defaultMessage={'Delete'}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

interface RenameModalProps {
  file: FileItemExtended | null
  onRename: (newName: string) => void
}

// Store modalId in closure for RenameModalContent to access
let currentRenameModalId: string | undefined

export function RenameModalContent({
  file,
  onRename,
  onClose
}: RenameModalProps & { onClose?: () => void }) {
  const intl = useIntl()
  const [nameWithoutExt, setNameWithoutExt] = useState('')
  const [extension, setExtension] = useState('')

  useEffect(() => {
    if (file) {
      const fileName = file.name
      if (file.type === 'FILE' && fileName.includes('.')) {
        const lastDotIndex = fileName.lastIndexOf('.')
        setNameWithoutExt(fileName.substring(0, lastDotIndex))
        setExtension(fileName.substring(lastDotIndex))
      } else {
        setNameWithoutExt(fileName)
        setExtension('')
      }
    }
  }, [file])

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="file-name">
          {intl.formatMessage({ id: message.common.fileManager.newName })}
        </Label>
        <div className="flex items-center gap-1">
          <Input
            id="file-name"
            type="text"
            value={nameWithoutExt}
            onChange={e => setNameWithoutExt(e.target.value)}
            className="grow"
          />
          {extension && (
            <span className="ml-1 text-gray-500 font-medium">{extension}</span>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={buttons.cancel} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            const newFullName = extension
              ? `${nameWithoutExt}${extension}`
              : nameWithoutExt
            onRename(newFullName)
            if (onClose) onClose()
          }}
        >
          <FormattedMessage id={buttons.continue} />
        </Button>
      </div>
    </div>
  )
}

// Usage: openRenameModal({ file, onRename })
export function openRenameModal({ file, onRename }: RenameModalProps) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useDynamicModalStore.getState()
  currentRenameModalId = openModal('dialog', {
    id: `file-rename-${file?.id}`,
    component: RenameModalContent,
    props: { file, onRename, title: 'Rename File' },
    onClose: undefined
  })

  return currentRenameModalId
}
