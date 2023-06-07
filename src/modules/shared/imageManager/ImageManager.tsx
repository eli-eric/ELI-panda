import { Tab } from '@headlessui/react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import useWarningModal from 'src/hooks/useWarningModal'
import type { FILE_TYPE } from 'src/types/constants/files'
import useSWR from 'swr'

import { DeleteButton, PlusButton } from '@/components/Buttons'
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
  const { width = 400, height = 400, itemId, itemCategory, hasEditRole } = props.config
  const endpoint = `/api/${itemCategory}/${itemId}/${FILE_CATEGORY}`
  const { data, mutate } = useSWR<FileItem[]>(endpoint, uniFetcher)
  const [dueUpload, setDueUpload] = useState<ProcessedFile[]>([])
  const [inProgress, setInProgress] = useState<string[]>([])

  const withWarningModal = useWarningModal()

  const handleUpload = useCallback(
    async (items: ProcessedFile[]) => {
      for await (const obj of items) {
        const { name } = obj
        try {
          await axios.post(endpoint, obj)
          toast.success(`Uploaded ${name}`)
          setInProgress(prev => prev.filter(str => str !== name))
        } catch (err) {
          toast.error(`Failed to upload ${name}`)
        } finally {
          setInProgress(prev => prev.filter(str => str !== name))
          mutate()
        }
      }
      setDueUpload([])
    },
    [endpoint, mutate]
  )

  const handleDelete = useCallback(
    async (item: { id: string; name: string }) => {
      const { id, name } = item
      setInProgress(prev => [...prev, id])
      try {
        await axios.delete(`${endpoint}/${id}`)
        toast.success(`Deleted ${name}`)
      } catch (err) {
        toast.error(`Failed to delete ${name}`)
      } finally {
        setInProgress(prev => prev.filter(str => str !== id))
        mutate()
      }
    },
    [endpoint, mutate]
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

  const { open, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop,
    noClick: true
  })

  const fallbackImage = {
    id: 'fallback',
    name: 'fallback image',
    url: '/no-image.png'
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full flex flex-col rounded-md ${isDragActive ? 'border-2 border-orange-600' : ''}`}
    >
      <Tab.Group>
        <Tab.List className={`w-full rounded-t-md border border-gray-300 flex gap-1 justify-between`}>
          <div>
            {hasEditRole && (
              <PlusButton onClick={open} className="h-full flex border-0 border-r rounded-none rounded-tl-md" />
            )}
          </div>

          <div className="flex flex-wrap justify-center">
            {data?.map(obj => (
              <Tab key={obj.id}>
                {({ selected }) => <span className={`px-1 ${selected ? 'text-orange-600' : ''} text-sm`}>&bull;</span>}
              </Tab>
            ))}
          </div>
          <div>
            <div
              className={`h-full flex flex-col justify-center content-center ${
                inProgress.length || 'text-transparent'
              }`}
            >
              <div className={`flex flex-nowrap animate-pulse pr-2`}>
                <CloudArrowUpIcon className="h-4 w-4" />
                <span className="text-xs">{inProgress.length}</span>
              </div>
            </div>
          </div>
        </Tab.List>

        <Tab.Panels className="w-full relative rounded-b-md border border-t-0 border-gray-300">
          {(data && data.length > 0 ? data : [fallbackImage]).map(obj => (
            <Tab.Panel key={obj.id} className="w-full">
              <Image
                width={width}
                height={height}
                className="min-w-full h-auto rounded-b-md"
                src={obj.url}
                alt={obj.name}
                unoptimized
              />
              {obj.id !== 'fallback' && hasEditRole && (
                <DeleteButton
                  onClick={() => withWarningModal(handleDelete, `Are you sure you want to delete ${obj.name}?`)(obj)}
                  className="absolute bottom-0 left-0 border-0 border-t border-r rounded-none rounded-bl-md rounded-tr-md"
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
