import { Tab } from '@headlessui/react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import useWarningModal from 'src/hooks/useWarningModal'
import type { FILE_TYPE } from 'src/types/constants/files'
import useSWR from 'swr'

import { DeleteButton, PlusButton } from '@/components/Buttons'
import executeRequest from '@/helpers/executeRequest'
import { uniFetcher } from '@/helpers/fetcher'

import type { FileItem } from '../fileManager/types'

type ImageManagerProps = {
  config: {
    itemCategory: FILE_TYPE
    itemId: string
    hasEditRole?: boolean
    width?: number
    height?: number
  }
}

const FILE_CATEGORY = 'images'

type ProcessedFile = {
  name: string
  payload: string
}

function ImageManager(props: ImageManagerProps) {
  const { width = 400, height = 400, itemId, itemCategory, hasEditRole = false } = props.config
  const endpoint = `/api/${itemCategory}/${itemId}/${FILE_CATEGORY}`
  const { data, mutate } = useSWR<FileItem[]>(endpoint, uniFetcher)
  const [dueUpload, setDueUpload] = useState<ProcessedFile[]>([])
  const [inProgress, setInProgress] = useState<string[]>([])

  const handleUpload = useCallback(
    (items: ProcessedFile[]) => {
      items.forEach(obj => {
        const body = JSON.stringify(obj)
        const { name } = obj

        return executeRequest(
          endpoint,
          { method: 'post', body },
          () => {
            toast.success(`Uploaded ${name}`)
            setInProgress(prev => prev.filter(str => str !== name))
            mutate()
          },
          () => {
            setInProgress(prev => prev.filter(str => str !== name))
            toast.error(`Failed to upload ${name}`)
          }
        )
      })

      return setDueUpload([])
    },
    [endpoint, mutate]
  )

  const handleDelete = useCallback(
    (id: string) => {
      const name = (data ?? []).find(obj => obj.id === id)?.name
      setInProgress(prev => (name ? [...prev, name] : prev))
      executeRequest(
        `${endpoint}/${id}`,
        { method: 'delete' },
        () => {
          toast.success(`Deleted ${name}`)
          mutate((data ?? []).filter(obj => obj.id !== id))
          setInProgress(prev => prev.filter(str => str !== name))
        },
        () => {
          setInProgress(prev => prev.filter(str => str !== name))
          toast.error(`Failed to delete ${name}`)
        }
      )
    },
    [endpoint, data, mutate]
  )

  const onDrop = useCallback(async (files: File[]) => {
    setInProgress(prev => [...prev, ...files.map(file => file.name)])

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

    setDueUpload(updatedFiles)
  }, [])

  useEffect(() => {
    dueUpload.length > 0 && handleUpload(dueUpload)
  }, [dueUpload, handleUpload])

  const withWarningModal = useWarningModal()

  const { open, getRootProps, isDragActive } = useDropzone({ onDrop, noClick: true })

  const ProgressIndicator = () => (
    <div>
      {inProgress.length > 0 && (
        <div className={`flex flex-nowrap border-gray-300 border-l gap-1 py-1 px-2`}>
          <CloudArrowUpIcon className="h-5 w-5 animate-pulse" />
          <span className="text-sm">{inProgress.length}</span>
        </div>
      )}
    </div>
  )

  return (
    <div
      {...getRootProps()}
      className={`w-full flex flex-col rounded-lg ${isDragActive ? 'border-2 border-orange-600' : ''}`}
    >
      <Tab.Group>
        <Tab.List className={`w-full rounded-t-md border border-gray-300 flex justify-between`}>
          {hasEditRole && <PlusButton onClick={open} className="border-0 rounded-none rounded-l-lg border-r" />}

          <div className="flex flex-wrap justify-center">
            {data?.map(obj => (
              <Tab key={obj.id}>
                {({ selected }) => <span className={`m-1 px-1 ${selected ? 'text-orange-600' : ''}`}>&bull;</span>}
              </Tab>
            ))}
          </div>
          <ProgressIndicator />
        </Tab.List>

        <Tab.Panels className="relative">
          {data?.map(obj => (
            <Tab.Panel key={obj.id}>
              <Image
                width={width}
                height={height}
                className="w-full object-cover object-center rounded-b-md"
                src={obj.url}
                alt={obj.name}
                unoptimized
              />
              {hasEditRole && (
                <DeleteButton
                  onClick={() => withWarningModal(handleDelete, `Are you sure you want to delete ${obj.name}?`)(obj.id)}
                  className="absolute bottom-0 left-0 rounded-none rounded-bl-md rounded-tr-md"
                />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default ImageManager
