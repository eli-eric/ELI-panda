import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { CellProps, Column } from 'react-table'
import useGeneralTable from 'src/hooks/useGeneralTable'
import useSWR from 'swr'

import { PlusButton } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { uniFetcher } from '@/helpers/fetcher'
import { FILE_TYPE } from '@/types/constants/files'

import ProgressBarComponent from '../progress-bar.comp'
import FileActions from './FileActions'
import { FileItem } from './types'

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const endpoint = `/api/${itemType}/${uid}/files`
  const { data: files, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)
  const [loading, setLoading] = useState(false)

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
    newFile.forEach(file => {
      setLoading(true)
      const { name, payload } = file
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(
        endpoint,
        { method: 'post', body },
        res => {
          mutate([...(files ?? []), res])
          toast.success(`Uploaded ${name}`)
          setLoading(false)
        },
        () => {
          toast.error(`Failed to upload ${name}`)
          setLoading(false)
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
    const cols: Column<FileItem>[] = [
      {
        Header: 'Files',
        accessor: 'name',
        Cell: ({ value, row: { original } }: CellProps<FileItem>) => (
          <div className="flex items-center">
            <FileActions file={original} mutate={mutate} endpoint={endpoint} files={files} hasEditRole={hasEditRole} />
            <span className="pl-4">{value}</span>
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

  // Use useGeneralTable hook
  const { getTable } = useGeneralTable({
    tableId: 'filemanager',
    data: files,
    columns
  })

  return (
    <div>
      {hasEditRole && (
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
            <PlusButton className="mb-2" buttonSize="large" primary={!isDragActive} onClick={handleButtonClick} />
          </div>
        </div>
      )}
      {loading && <ProgressBarComponent />}
      {getTable()}
    </div>
  )
}

export default FileManager
