import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { CellProps, Column } from 'react-table'
import useGeneralTable from 'src/hooks/useGeneralTable'
import useSWR from 'swr'

import { PlusButton } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { uniFetcher } from '@/helpers/fetcher'
import { FILE_TYPE } from '@/types/constants/files'

import FileActions from './FileActions'
import { FileItem } from './types'

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const endpoint = `/api/${itemType}/${uid}/files`
  const { data: files, error, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)

  const [newFile, setNewFile] = useState({ name: '', payload: '' })

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewFile({ name: file.name, payload: String(reader.result) })
  }, [])

  const handlePost = useCallback(
    (name: string, payload: string) => {
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(
        endpoint,
        { method: 'post', body },
        res => {
          mutate([...(files ?? []), res])
          setNewFile({ name: '', payload: '' })
          toast.success(`Uploaded ${name}`)
        },
        () => toast.error(`Failed to upload ${name}`)
      )
    },
    [endpoint, mutate, files, setNewFile]
  )

  useEffect(() => {
    newFile.name && newFile.payload && handlePost(newFile.name, newFile.payload)
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  // Use useGeneralTable hook
  const { getTable } = useGeneralTable({
    tableId: 'filemanager',
    data: files,
    columns,
    loading: !error && !files
  })

  return (
    <div>
      {hasEditRole && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <PlusButton className="mb-2" buttonSize="large" primary={!isDragActive} />
        </div>
      )}
      {getTable()}
    </div>
  )
}

export default FileManager
