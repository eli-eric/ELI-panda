import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useIntl } from 'react-intl'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import axiosInstance from '@/core/axios/axiosInstance'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'
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
  const [renameModalOpen, setRenameModalOpen] = useState(false)
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
          queryClient.invalidateQueries(['files', itemType, uid])
          // Reset dropzone state to allow re-uploading the same file
          if (onFileDeleted) {
            onFileDeleted()
          }
        })
        .catch(error => {
          toast.error(`Failed to delete file: ${error}`)
        })
    }
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
      <button
        className="text-gray-600 hover:text-primary-500 mr-2"
        onClick={() => setRenameModalOpen(true)}
      >
        <span className="flex items-center">
          <PencilIcon className="h-4 w-4 mr-1" />
          Rename
        </span>
      </button>
      <button
        className="text-red-600 hover:text-red-700"
        onClick={handleDeleteWithConfirmation}
      >
        <span className="flex items-center">
          <TrashIcon className="h-4 w-4 mr-1" />
          Delete
        </span>
      </button>
      <RenameModal
        isOpen={renameModalOpen}
        setIsOpen={setRenameModalOpen}
        file={file}
        onRename={newName => handleRenameFile(file, newName)}
      />
    </div>
  )
}
interface RenameModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  file: FileItemExtended | null
  onRename: (newName: string) => void
}
const RenameModal = ({
  isOpen,
  setIsOpen,
  file,
  onRename
}: RenameModalProps) => {
  const [nameWithoutExt, setNameWithoutExt] = useState('')
  const [extension, setExtension] = useState('')

  useEffect(() => {
    if (isOpen && file) {
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
  }, [isOpen, file])

  const modalButtons: ModalButtons = {
    goNext: {
      text: buttons.continue,
      onClick: () => {
        // Combine name and extension when saving
        const newFullName = extension
          ? `${nameWithoutExt}${extension}`
          : nameWithoutExt
        onRename(newFullName)
        setIsOpen(false)
      }
    },
    goBack: {
      text: buttons.cancel,
      onClick: () => setIsOpen(false)
    }
  }

  return (
    <ModalComponent open={isOpen} setOpen={setIsOpen} buttons={modalButtons}>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Rename</h3>
      </div>
      <div>
        <label
          htmlFor="file-name"
          className="block text-sm font-medium text-gray-700"
        >
          New Name
        </label>
        <div className="flex items-center mt-1">
          <input
            id="file-name"
            type="text"
            className="form-field rounded-md flex-grow"
            value={nameWithoutExt}
            onChange={e => setNameWithoutExt(e.target.value)}
          />
          {extension && (
            <span className="ml-1 text-gray-500 font-medium">{extension}</span>
          )}
        </div>
      </div>
    </ModalComponent>
  )
}
