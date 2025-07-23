import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FormattedMessage, useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
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
    <div className="flex items-center gap-2 text-right">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-orange-500"
        onClick={() => {
          // Open the modal via the global modal API
          openRenameModal({
            file,
            onRename: newName => handleRenameFile(file, newName)
          })
        }}
      >
        <PencilIcon className="h-4 w-4 mr-1" />
        <FormattedMessage
          id="common.buttons.rename"
          defaultMessage={'Rename'}
        />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700"
        onClick={handleDeleteWithConfirmation}
      >
        <TrashIcon className="h-4 w-4 mr-1" />
        <FormattedMessage
          id="common.buttons.delete"
          defaultMessage={'Delete'}
        />
      </Button>
      {/* Modal is now opened via openRenameModal */}
    </div>
  )
}
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

interface RenameModalProps {
  file: FileItemExtended | null
  onRename: (newName: string) => void
}

export function RenameModalContent({
  file,
  onRename,
  onClose
}: RenameModalProps & { onClose?: () => void }) {
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
        <Label htmlFor="file-name">New Name</Label>
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
  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog1', {
    component: RenameModalContent,
    props: { file, onRename, title: 'Rename File' },
    onClose: undefined
  })
}
