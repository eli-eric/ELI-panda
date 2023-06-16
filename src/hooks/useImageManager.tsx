import axios from 'axios'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import type { FileItem, ProcessedFile } from 'src/modules/shared/fileManager/types'
import type { FILE_TYPE } from 'src/types/constants/files'
import useSWR from 'swr'

import ImageGallery from '@/components/ImageGallery'
import { uniFetcher } from '@/helpers/fetcher'

type ImageManagerConfig = {
  itemCategory: FILE_TYPE
  itemId: string
  fileCategory?: string
  suspense?: boolean
}

function useImageManager(config: ImageManagerConfig) {
  const { itemId, itemCategory, fileCategory = 'images', suspense } = config
  const endpoint = `/api/${itemCategory}/${itemId}/${fileCategory}`

  const { data, mutate } = useSWR<FileItem[]>(endpoint, uniFetcher, { suspense })

  const [dueUpload, setDueUpload] = useState<ProcessedFile[]>([])
  const [dueDelete, setDueDelete] = useState<FileItem[]>([])

  const onDelete = useCallback(
    (obj: FileItem) => {
      if (obj.id.startsWith('temp')) {
        setDueUpload(state => state.filter(file => file.name !== obj.name))
      } else {
        setDueDelete(state => [...state, obj])
      }
      mutate(data => data?.filter(file => file.id !== obj.id), { revalidate: false })
    },
    [mutate]
  )

  const onDrop = useCallback(
    async (files: File[]) => {
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
        const type = 'temp'
        const url = file.payload
        return {
          ...file,
          id,
          type,
          url
        }
      })

      setDueUpload(state => [...state, ...processedFiles])
      mutate(data => [...tempFiles, ...(data ?? [])], { revalidate: false })
    },
    [mutate]
  )

  const discard = useCallback(() => {
    setDueUpload([])
    setDueDelete([])
    mutate()
  }, [mutate, setDueUpload, setDueDelete])

  const save = useCallback(async () => {
    for await (const file of dueDelete) {
      try {
        await axios.delete(`${endpoint}/${file.id}`)
        toast.success(`Deleted ${file.name}.`)
      } catch {
        toast.error(`Failed to delete ${file.name}.`)
      }
    }

    for await (const file of dueUpload) {
      try {
        await axios.post(endpoint, file)
        toast.success(`Uploaded ${file.name}.`)
      } catch {
        toast.error(`Failed to upload ${file.name}.`)
      }
    }

    discard()
  }, [endpoint, discard, dueUpload, dueDelete])

  const hasChanges = dueUpload.length + dueDelete.length > 0

  const Gallery = (props: { hasEditRole?: boolean; width?: number; height?: number }) => (
    <ImageGallery
      data={data}
      discard={discard}
      onDrop={onDrop}
      onDelete={onDelete}
      hasChanges={hasChanges}
      {...props}
    />
  )

  return { data, onDelete, onDrop, discard, save, hasChanges, Gallery }
}

export default useImageManager
