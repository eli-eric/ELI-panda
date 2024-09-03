import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { TableDeleteButton, TableDownloadButton } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

import { useFileDelete } from './hooks/useFiles'
import { useLinkDelete } from './hooks/useLinks'
import type { FileItemExtended } from './types'

const messages = message.common.fileManager

interface FileActionsProps {
  file: FileItemExtended
  hasEditRole?: boolean
  itemType: string
  uid: string
}

const FileActions = ({
  file,
  hasEditRole,
  itemType,
  uid
}: FileActionsProps) => {
  const intl = useIntl()
  const { mutate } = useLinkDelete({ parentUid: uid, uid: file.id })
  const { mutate: deleteFile } = useFileDelete({ itemType, uid, id: file.id })

  const handleDelete = useCallback(
    (id: string) => {
      if (file.type === 'LINK') {
        mutate(id)
      } else {
        deleteFile()
      }
    },
    [mutate, deleteFile, file]
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
  hasEditRole?: boolean
}

export const FileNameEditor: FC<FileNameEditorProps> = ({
  initialFileName,
  onConfirm,
  hasEditRole
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
    <div className="w-full" onClick={() => hasEditRole && setIsEditing(true)}>
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
