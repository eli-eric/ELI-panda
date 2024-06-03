import { Fragment, useMemo, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { message } from '@/i18n/src/messages'

import { PandaTable } from '../table/pandaTable/PandaTable'
import { useFileColumns } from './FileTable.columns'
import { useFileRequests } from './hooks/useFileRequests'
import { useFiles } from './hooks/useFiles'
import { useLinks } from './hooks/useLinks'
import { NewFileButton } from './NewFileButton'
import type { FILE_TYPE } from './types'

const messages = message.common.files

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const { data: filesData } = useFiles({ itemType, uid })
  const { data: linksData } = useLinks({ uid })

  const files = useMemo(() => {
    return [
      ...(filesData?.map(file => ({ ...file, type: 'FILE' })) || []),
      ...(linksData?.map(link => ({
        ...link,
        id: link.uid,
        type: 'LINK',
        size: 0
      })) || [])
    ]
  }, [filesData, linksData])

  const { onDrop, handlePut, loading } = useFileRequests({
    itemType,
    uid
  })

  // Define columns for useGeneralTable
  const columns = useFileColumns({
    hasEditRole,
    itemType,
    uid,
    handlePut
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const { onClick, ...restRootProps } = getRootProps()

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    fileInputRef.current?.click() && onClick && onClick(e)
  }

  return (
    <div>
      <Heading text={messages.title}>
        {hasEditRole && (
          <Fragment>
            <div {...restRootProps}>
              <input
                {...getInputProps()}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <NewFileButton
                handleNewFile={onClickHandler}
                uid={uid}
                isDragActive={isDragActive}
              />
            </div>
          </Fragment>
        )}
      </Heading>
      {loading.some(value => value) && <ProgressBarComponent />}
      {files.length > 0 && (
        <PandaTable
          {...{
            tableId: 'filemanager',
            data: files,
            columns,
            settings: {
              enableSorting: true,
              manualSorting: false,
              enableFiltering: true,
              manualFiltering: false
            }
          }}
        />
      )}
    </div>
  )
}

export default FileManager
