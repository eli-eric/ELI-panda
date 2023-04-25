import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useGeneralTable from 'src/hooks/useGeneralTable' // Assuming the hook is in the same folder

// Assuming the hook is in the same folder
import { Button } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'

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

const FileManager = ({ type, id }: FileManagerProps) => {
  const endpoint = `/api/${type}/${id}/files`
  // const { data: files, error } = useSWR<Array<FileItem>>(FILE_ENDPOINT)

  const [newFile, setNewFile] = useState('')

  const handleUpload = async e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setNewFile(String(reader.result))
  }

  const openForm = (id: string) => {}

  const handlePost = (name: string, payload: string) => {
    const body = JSON.stringify({ name, payload })
    executeRequest<FileItem>(
      endpoint,
      { method: 'post', body },
      res => toast.success(`Succesfully uploaded ${res.name}!`),
      () => toast.error('oops')
    )
  }

  const handlePatch = (id: string, newName: string) => {
    const body = JSON.stringify({ name: newName })
    executeRequest(
      `${endpoint}/${id}`,
      { method: 'patch', body },
      () => toast.success(`You have renamed a file, wow`),
      () => toast.error('oops')
    )
  }

  const handleDelete = (id: string) =>
    executeRequest(
      `${endpoint}/${id}`,
      { method: 'delete' },
      () => toast.success('Deleted.'),
      () => toast.error('oops')
    )

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
            <Button onClick={() => openForm(value)}>
              <PencilSquareIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
            </Button>
            <Button onClick={() => handleDelete(value)}>
              <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
            </Button>
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
