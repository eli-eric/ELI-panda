import { FileText, Link, Upload } from 'lucide-react'
import { useCallback, useMemo, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useIntl } from 'react-intl'

import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { useFileColumns } from './FileTable.columns'
import { useFileRequests } from './hooks/useFileRequests'
import { useFiles } from './hooks/useFiles'
import { useLinks } from './hooks/useLinks'
import { openLinkModal } from './LinkModal'
import type { FILE_TYPE, FileItemExtended } from './types'

const messages = message.common.files

type FileManagerProps = {
  itemType: FILE_TYPE
  uid?: string
  hasEditRole?: boolean
  customTitle?: string
  allowMultiple?: boolean
}

const FileManager = ({
  itemType,
  uid,
  hasEditRole,
  customTitle,
  allowMultiple = true
}: FileManagerProps) => {
  const { formatMessage: fm } = useIntl()
  const { data: filesData } = useFiles({ itemType, uid })
  const { data: linksData } = useLinks({ uid })
  // No local state needed for openLinkModal; use global modal API

  const files = useMemo(() => {
    return [
      ...(filesData?.map(file => ({ ...file, type: 'FILE' as const })) || []),
      ...(linksData?.map(link => ({
        ...link,
        id: link.uid,
        type: 'LINK' as const,
        size: 0
      })) || [])
    ] as FileItemExtended[]
  }, [filesData, linksData])

  const { onDrop, handlePut, loading, resetDropzone } = useFileRequests({
    itemType,
    uid
  })
  // Enhance resetDropzone to also clear the file input value
  const handleResetDropzone = useCallback(() => {
    resetDropzone()
    // Reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [resetDropzone])

  // Define columns for Table
  const { columns, modals } = useFileColumns({
    hasEditRole,
    itemType,
    uid,
    handlePut,
    onFileDeleted: handleResetDropzone
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const canUpload = hasEditRole && (allowMultiple || files.length === 0)

  return (
    <div className="">
      <Heading
        text={messages.title}
        customText={customTitle}
        showBorder={false}
      >
        {canUpload && (
          <div className="flex gap-2">
            <Button
              onClick={handleFileUpload}
              className="flex items-center gap-2"
              size="sm"
            >
              <FileText className="h-4 w-4" />
              {fm({ id: message.common.files.uploadFile })}
            </Button>
            <Button
              onClick={() => openLinkModal({ parentUid: uid })}
              variant="outline"
              className="flex items-center gap-2"
              size="sm"
            >
              <Link className="h-4 w-4" />
              {fm({ id: message.common.files.addLink })}
            </Button>
            <input
              {...getInputProps()}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </Heading>

      {loading.some(value => value) && <ProgressBarComponent />}

      {files.length > 0 && (
        <div className="mt-4">
          <Table
            data={files}
            columns={columns}
            enableSorting={true}
            enableFiltering={true}
          />
        </div>
      )}

      {canUpload && (
        <div
          {...getRootProps()}
          className={cn(
            'mt-4 border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <span>{fm({ id: message.common.files.dropFilesHereOr })} </span>
              <button
                className="text-primary hover:underline font-medium"
                onClick={handleFileUpload}
                type="button"
              >
                {fm({ id: message.common.files.browse })}
              </button>
            </div>
          </div>
        </div>
      )}
      {modals}
      {/* LinkModal is now opened via openLinkModal */}
    </div>
  )
}

export default FileManager
