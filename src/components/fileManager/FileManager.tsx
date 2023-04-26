import { TrashIcon } from '@heroicons/react/24/outline'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useGeneralTable from 'src/hooks/useGeneralTable'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { uniFetcher } from '@/helpers/fetcher'

export type FileItem = {
  id: string
  name: string
  type: string
  url: string
}

const FileManager = () => {
  const router = useRouter()

  const [, itemType] = router.pathname.split('/')
  const { uid: itemId } = router.query

  const endpoint = `http://localhost:5001/api/${itemType}/${itemId}/files`
  const { data: files, error, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)

  const [newFile, setNewFile] = useState({ name: '', payload: '' })

  const onDrop = useCallback(async files => {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewFile({ name: file.name, payload: String(reader.result) })
  }, [])

  const handlePost = useCallback(
    (name: string, payload: string) => {
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(endpoint, { method: 'post', body }, res => {
        mutate([...(files ?? []), res])
        setNewFile({ name: '', payload: '' })
      })
    },
    [endpoint, mutate, files, setNewFile]
  )

  const handleDelete = useCallback(
    (id: string) =>
      executeRequest(`${endpoint}/${id}`, { method: 'delete' }, () => {
        mutate((files ?? []).filter(obj => obj.id !== id))
      }),
    [endpoint, files, mutate]
  )

  useEffect(() => {
    newFile.name && newFile.payload && handlePost(newFile.name, newFile.payload)
  }, [newFile, handlePost])

  // Define columns for useGeneralTable
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => {
          const {
            original: { name, url }
          } = row
          return (
            <a href={url} target="_blank" rel="noreferrer">
              {name}
            </a>
          )
        }
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <Button
            onClick={() => {
              handleDelete(value)
            }}
          >
            <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
          </Button>
        )
      }
    ],
    [handleDelete]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  // Use useGeneralTable hook
  const tableId = nanoid()
  const { getTable } = useGeneralTable({
    tableId,
    data: files,
    columns,
    loading: !error && !files
  })

  return (
    <div>
      {/* Your file upload UI here */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className={isDragActive ? 'bg-orange-600' : ''}>Drag new file here</p>
      </div>
      {getTable()}
    </div>
  )
}

export default FileManager
