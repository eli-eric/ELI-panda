import { DocumentTextIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'

import { useFileColumns } from './FileTable.columns'
import { useFileRequests } from './hooks/useFileRequests'
import { useFiles } from './hooks/useFiles'
import { useLinks } from './hooks/useLinks'
import { LinkModal } from './LinkModal'
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
  const { data: filesData } = useFiles({ itemType, uid })
  const { data: linksData } = useLinks({ uid })
  const [openLinkModal, setOpenLinkModal] = useState(false)

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
    <div>
      <Heading
        text={messages.title}
        customText={customTitle}
        showBorder={false}
      >
        {canUpload && (
          <div className="flex space-x-2">
            <Button
              onClick={handleFileUpload}
              className="flex items-center space-x-1"
            >
              <DocumentTextIcon className="h-4 w-4" />
              <span>Upload File</span>
            </Button>
            <Button
              onClick={() => setOpenLinkModal(true)}
              className="flex items-center space-x-1"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Add Link</span>
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
        <Table
          data={files}
          columns={columns}
          enableSorting={true}
          enableFiltering={true}
        />
      )}

      {canUpload && (
        <div
          {...getRootProps()}
          className={`mt-4 border-2 border-dashed rounded-md p-6 text-center ${
            isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
          }`}
        >
          <p className="text-gray-600">
            Drop File to Upload or{' '}
            <button
              className="text-orange-600 cursor-pointer"
              onClick={handleFileUpload}
            >
              Browse
            </button>
          </p>
        </div>
      )}
      {modals}
      <LinkModal
        open={openLinkModal}
        setOpen={setOpenLinkModal}
        parentUid={uid}
      />
    </div>
  )
}

export default FileManager
