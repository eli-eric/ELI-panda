import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableDeleteButton, TableDownloadButton } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import executeRequest from '@/utils/executeRequest'
import { createMessageValues } from '@/utils/formatters'

import type { FileItem, FileItemExtended } from './types'
import { useQueryClient } from 'react-query'
import { useLinkDelete } from './hooks/useLinks'

const messages = message.common.fileManager

interface FileActionsProps {
  file: FileItemExtended
  endpoint: string
  files?: FileItemExtended[]

  hasEditRole?: boolean
  itemType: string
  uid: string
}

const FileActions = ({
  file,
  endpoint,
  files,
  hasEditRole,
  itemType,
  uid
}: FileActionsProps) => {
  const intl = useIntl()
  const queryClient = useQueryClient()
  const { mutate } = useLinkDelete({ parentUid: uid, uid: file.id })

  const handleDelete = useCallback(
    (id: string) => {
      if (file.type === 'LINK') {
        mutate(file.id)
      } else {
        const name = (files ?? []).find(obj => obj.id === id)?.name
        executeRequest(
          `${endpoint}/${id}`,
          { method: 'delete' },
          () => {
            toast.success(`Deleted ${name}`)
            queryClient.setQueryData<FileItem[]>(
              ['files', itemType, uid],
              old => {
                if (!old) return []
                return old?.filter(obj => obj.id !== id)
              }
            )
          },
          () => toast.error(`Failed to delete ${name}`)
        )
      }
    },
    [endpoint, files, itemType, queryClient, uid]
  )

  const withWarningModal = useWarningModal(
    intl.formatMessage(
      { id: messages.deleteModal.text },
      createMessageValues({ fileName: file.name })
    )
  )

  return (
    <div className="flex items-center">
      <a
        target="_blank"
        href={file.url}
        rel="noreferrer"
        className="hover:text-primary-500 flex items-center"
      >
        <TableDownloadButton className="mr-1" />
      </a>
      {hasEditRole && (
        <TableDeleteButton
          onClick={() => withWarningModal(handleDelete)(file.id)}
        />
      )}
    </div>
  )
}

interface TagInputProps {
  onConfirm: (tag: string) => void
}

export const TagInput: FC<TagInputProps> = ({ onConfirm }) => {
  const [tag, setTag] = useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tag === '') return
    if (e.key === 'Enter') {
      onConfirm(tag)
      setTag('')
    }
  }

  return (
    <input
      type="text"
      value={tag}
      onChange={e => setTag(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="add tag"
      className="w-full text-xs border-0 bg-inherit focus:outline-none focus:border-0 focus:ring-0"
    />
  )
}

interface FileNameEditorProps {
  initialFileName: string
  onConfirm: (fileName: string) => void
}

export const FileNameEditor: FC<FileNameEditorProps> = ({
  initialFileName,
  onConfirm
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileExtension, setFileExtension] = useState('')

  useEffect(() => {
    if (!initialFileName) return
    const dotIndex = initialFileName.lastIndexOf('.')
    if (dotIndex > 0) {
      setFileName(initialFileName.substring(0, dotIndex))
      setFileExtension(initialFileName.substring(dotIndex))
    } else {
      setFileName(initialFileName)
    }
  }, [initialFileName])

  const handleBlur = () => {
    setIsEditing(false)
    onConfirm(`${fileName}${fileExtension}`)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  return (
    <div className="w-full" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          type="text"
          value={fileName}
          className="text-xs border-0 bg-inherit focus:outline-none focus:border-0 focus:ring-0"
          onChange={e => setFileName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span>{`${fileName}${fileExtension}`}</span>
      )}
      {isEditing && <span>{fileExtension}</span>}
    </div>
  )
}

export default FileActions
