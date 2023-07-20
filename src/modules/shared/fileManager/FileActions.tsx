import Link from 'next/link'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'
import type { KeyedMutator } from 'swr'

import { TableDeleteButton, TableDownloadButton } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { createMessageValues } from '@/helpers/formatters'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import type { FileItem } from './types'

const messages = message.common.fileManager

interface FileActionsProps {
  file: FileItem
  endpoint: string
  files?: FileItem[]
  mutate: KeyedMutator<FileItem[]>

  hasEditRole?: boolean
}

const FileActions = ({ file, endpoint, files, mutate, hasEditRole }: FileActionsProps) => {
  const intl = useIntl()

  const handleDelete = useCallback(
    (id: string) => {
      const name = (files ?? []).find(obj => obj.id === id)?.name
      executeRequest(
        `${endpoint}/${id}`,
        { method: 'delete' },
        () => {
          toast.success(`Deleted ${name}`)
          mutate((files ?? []).filter(obj => obj.id !== id))
        },
        () => toast.error(`Failed to delete ${name}`)
      )
    },
    [endpoint, files, mutate]
  )

  const withWarningModal = useWarningModal(
    intl.formatMessage({ id: messages.deleteModal.text }, createMessageValues({ fileName: file.name }))
  )

  return (
    <div className="flex items-center">
      <Link href={file.url} passHref legacyBehavior={true}>
        <a target="_blank" className="hover:text-primary-500 flex items-center">
          <TableDownloadButton className="mr-1" />
        </a>
      </Link>
      {hasEditRole && <TableDeleteButton onClick={() => withWarningModal(handleDelete)(file.id)} />}
    </div>
  )
}

export default FileActions
