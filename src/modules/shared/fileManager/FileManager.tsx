import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { message } from '@/i18n/src/messages'
import type { FILE_TYPE } from '@/types/constants/files'
import executeRequest from '@/utils/executeRequest'
import { uniFetcher } from '@/utils/fetcher'

import { PandaTable } from '../table/pandaTable/PandaTable'
import FileActions from './FileActions'
import type { FileItem } from './types'

const messages = message.common.files

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const endpoint = `/api/${itemType}/${uid}/files`
  const { data: files, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)
  const [loading, setLoading] = useState<Array<boolean>>([])

  const [newFile, setNewFile] = useState<Array<{ name: string; payload: string }>>([])
  const onDrop = useCallback(async (files: File[]) => {
    const updatedFiles = await Promise.all(
      files.map(
        file =>
          new Promise<{ name: string; payload: string }>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({ name: file.name, payload: reader.result as string })
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
      )
    )
    setNewFile(updatedFiles)
  }, [])

  const handlePost = useCallback(() => {
    const fileLoading = newFile.map(() => true)
    setLoading(fileLoading)
    newFile.forEach((file, index) => {
      const { name, payload } = file
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(
        endpoint,
        { method: 'post', body },
        res => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          mutate([...(files ?? []), res])
          toast.success(`Uploaded ${name}`)
        },
        () => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          toast.error(`Failed to upload ${name}`)
        }
      )
    })
    setNewFile([])
  }, [endpoint, mutate, files, newFile])

  useEffect(() => {
    newFile.length > 0 && handlePost()
  }, [newFile, handlePost])

  // Define columns for useGeneralTable
  const columns = useMemo(() => {
    const cols: ColumnDef<FileItem, any>[] = [
      {
        header: 'Files',
        accessorKey: 'name',
        cell: ({ getValue, row: { original } }) => (
          <div className="flex items-center pt-1 pb-1">
            <FileActions file={original} mutate={mutate} endpoint={endpoint} files={files} hasEditRole={hasEditRole} />
            <span className="pl-4">{getValue()}</span>
          </div>
        )
      }
    ]

    return cols
  }, [hasEditRole, files, endpoint, mutate])

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })
  const handleButtonClick = () => {
    fileInputRef.current?.click() // Safely access the current property
  }

  return (
    <div>
      <Heading text={messages.title} />
      {hasEditRole && (
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
            <PlusButton
              className="mb-2"
              buttonSize="large"
              primary={!isDragActive}
              type={'button'}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      )}
      {loading.some(value => value) && <ProgressBarComponent />}
      <PandaTable
        {...{
          tableId: 'filemanager',
          data: files,
          columns
        }}
      />
    </div>
  )
}

export default FileManager
