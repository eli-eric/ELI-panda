import axios from 'axios'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import type { FileItem, ProcessedFile } from 'src/modules/shared/fileManager/types'
import type { FILE_TYPE } from 'src/types/constants/files'
import useSWR from 'swr'

import ImageGallery from '@/components/ImageGallery'
import { uniFetcher } from '@/helpers/fetcher'

type Config = {
  itemCategory: FILE_TYPE
  itemId: string
  fileCategory?: string
  suspense?: boolean
}

const getEndpoint = (
  itemCategory: Config['itemCategory'],
  itemId: Config['itemId'],
  fileCategory: Config['fileCategory']
) => `/api/${itemCategory}/${itemId}/${fileCategory}`

function useImageGallery(config: Config) {
  const { itemId, itemCategory, fileCategory = 'images', suspense } = config

  const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

  const { data, mutate } = useSWR<FileItem[]>(endpoint, uniFetcher, { suspense })

  const [dueUpload, setDueUpload] = useState<ProcessedFile[]>([])
  const [dueDelete, setDueDelete] = useState<FileItem[]>([])

  const handleDelete = (obj: FileItem) => {
    if (obj.id.startsWith('temp')) {
      setDueUpload(state => state.filter(file => file.name !== obj.name))
    } else {
      setDueDelete(state => [...state, obj])
    }
    mutate(data => data?.filter(file => file.id !== obj.id), { revalidate: false })
  }

  const onDrop = async (files: File[]) => {
    const processedFiles = await Promise.all(
      files.map(
        file =>
          new Promise<ProcessedFile>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({ name: file.name, payload: String(reader.result) })
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
      )
    )

    const tempFiles = processedFiles.map(file => {
      const id = `temp-${nanoid()}`
      const url = file.payload
      return {
        ...file,
        id,
        url
      }
    })

    setDueUpload(state => [...state, ...processedFiles])
    mutate(data => [...tempFiles, ...(data ?? [])], { revalidate: false })
  }

  const discard = () => {
    setDueUpload([])
    setDueDelete([])
    mutate()
  }

  type Status = {
    successfulUploads: string[]
    failedUploads: string[]
    successfulDeletions: string[]
    failedDeletions: string[]
  }

  const submit = async (itemId?: string) => {
    const status: Status = {
      successfulUploads: [],
      failedUploads: [],
      successfulDeletions: [],
      failedDeletions: []
    }

    for await (const file of dueDelete) {
      try {
        await axios.delete(`${endpoint}/${file.id}`)
        status.successfulDeletions = [...status.successfulDeletions, file.name]
      } catch {
        status.failedDeletions = [...status.failedDeletions, file.name]
      }
    }

    const ep = itemId ? getEndpoint(itemCategory, itemId, fileCategory) : endpoint
    for await (const file of dueUpload) {
      try {
        await axios.post(ep, file)
        status.successfulUploads = [...status.successfulUploads, file.name]
      } catch {
        status.failedUploads = [...status.failedUploads, file.name]
      }
    }

    discard()

    return status
  }

  const hasChanges = dueUpload.length + dueDelete.length > 0

  const Gallery = (props: { hasEditRole?: boolean; width?: number; height?: number }) => (
    <ImageGallery
      data={data}
      discard={discard}
      onDrop={onDrop}
      handleDelete={handleDelete}
      hasChanges={hasChanges}
      {...props}
    />
  )

  return { data, handleDelete, onDrop, discard, submit, hasChanges, Gallery }
}

export default useImageGallery
