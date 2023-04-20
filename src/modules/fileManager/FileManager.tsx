import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import useGeneralTable from 'src/hooks/useGeneralTable' // Assuming the hook is in the same folder
import useSubmit from 'src/hooks/useSubmit' // Assuming the hook is in the same folder

import { Button } from '@/components/Buttons'

type FileItem = {
  id: string
  name: string
  type: string
  url: string
}

type FileManagerProps = {
  type: 'catalogue' | 'systems'
  id: string
}

type ActionButtonProps = {
  id: string
  endpoint: string
}

const error = null
const files: FileItem[] = [
  {
    id: '1',
    name: 'example1.pdf',
    type: 'application/pdf',
    url: 'https://example.com/files/example1.pdf'
  },
  {
    id: '2',
    name: 'example2.jpg',
    type: 'image/jpeg',
    url: 'https://example.com/files/example2.jpg'
  },
  {
    id: '3',
    name: 'example3.mp4',
    type: 'video/mp4',
    url: 'https://example.com/files/example3.mp4'
  },
  {
    id: '4',
    name: 'example4.docx',
    type: 'application/pdf',
    url: 'https://example.com/files/example4.docx'
  },
  {
    id: '5',
    name: 'example5.png',
    type: 'image/png',
    url: 'https://example.com/files/example5.png'
  }
]

const EditButton = ({ id, endpoint }: ActionButtonProps) => {
  const fileEndpoint = `${endpoint}/${id}`

  const renameSubmit = useSubmit<FileItem>({
    endpoint: fileEndpoint,
    method: 'put',
    mutateList: [fileEndpoint]
  })

  return (
    <Button onClick={() => {}}>
      <PencilSquareIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
    </Button>
  )
}

const DeleteButton = ({ id, endpoint }: ActionButtonProps) => {
  const fileEndpoint = `${endpoint}/${id}`
  const deleteSubmit = useSubmit<{ success: boolean }>({
    endpoint: fileEndpoint,
    method: 'delete',
    mutateList: [fileEndpoint]
  })

  return (
    <Button onClick={() => deleteSubmit.submit()}>
      <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
    </Button>
  )
}

const FileManager = ({ type, id }: FileManagerProps) => {
  const endpoint = `/api/${type}/${id}/files`
  // const { data: files, error } = useSWR<Array<FileItem>>(FILE_ENDPOINT)
  const uploadSubmit = useSubmit<FileItem>({
    endpoint,
    method: 'post',
    mutateList: [endpoint]
  })

  const handleUpload = async e => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      uploadSubmit.submit(formData)
      e.target.value = null
    }
  }

  // Define columns for useGeneralTable
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'URL',
        accessor: 'url',
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noreferrer">
            {value}
          </a>
        )
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex-row">
            <EditButton id={value} endpoint={endpoint} />
            <DeleteButton id={value} endpoint={endpoint} />
          </div>
        )
      }
    ],
    []
  )

  // Use useGeneralTable hook
  const { getTable } = useGeneralTable({
    data: files,
    columns,
    loading: !error && !files
  })

  return (
    <div>
      {/* Your file upload UI here */}
      {getTable()}
    </div>
  )
}

export default FileManager
