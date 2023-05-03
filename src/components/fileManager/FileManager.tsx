import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { CellProps, Column } from 'react-table'
import useGeneralTable from 'src/hooks/useGeneralTable'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { uniFetcher } from '@/helpers/fetcher'
import useWarningModal from '@/hooks/useWarningModal'
import { FILE_TYPE } from '@/types/constants/files'

export type FileItem = {
  id: string
  name: string
  type: string
  url: string
}

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

  const { withWarningModal, WarningModal } = useWarningModal('Are you sure you want to delete this file?')

  useEffect(() => {
    newFile.name && newFile.payload && handlePost(newFile.name, newFile.payload)
  }, [newFile, handlePost])

  // Define columns for useGeneralTable
  const columns = useMemo(() => {
    const cols: Column<FileItem>[] = [
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({
          value,
          row: {
            original: { url }
          }
        }: CellProps<FileItem>) => (
          <Fragment>
            {hasEditRole && (
              <Button buttonSize="small" className="mr-1" onClick={() => withWarningModal(handleDelete)(value)}>
                <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
              </Button>
            )}
            <Link href={url} passHref legacyBehavior={true}>
              <a target="_blank">
                <Button buttonSize="small">
                  <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
              </a>
            </Link>
          </Fragment>
        )
      },
      {
        Header: 'File Name',
        accessor: 'name'
      }
    ]

    return cols
  }, [hasEditRole, handleDelete, withWarningModal])

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
          <Button className="mb-2" primary={!isDragActive}>
            {/* <CloudArrowUpIcon className="h-5 w-5" aria-hidden="true" /> */}
            Upload File
          </Button>
        </div>
      )}
      {getTable()}
      <WarningModal />
    </div>
  )
}

export default FileManager
