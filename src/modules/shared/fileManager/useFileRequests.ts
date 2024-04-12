import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import type { FileItem } from './types'
import { uniFetcher } from '@/utils/fetcher'
import executeRequest from '@/utils/executeRequest'
import toast from 'react-hot-toast'
import { useFilesStore } from './useFileStore'

export const useFileRequests = ({ itemType, uid }) => {
  const endpoint = `/api/${itemType}/${uid}/files`
  const { setFiles, files } = useFilesStore()
  const { data, mutate } = useSWR<Array<FileItem>>(endpoint, uniFetcher)

  useEffect(() => {
    data && setFiles(data.map(file => ({ ...file, type: 'FILE' })))
  }, [data, setFiles])

  const [loading, setLoading] = useState<Array<boolean>>([])
  const [newFile, setNewFile] = useState<
    Array<{ name: string; payload: string; type: 'FILE' | 'LINK' }>
  >([])

  const onDrop = useCallback(async (files: File[]) => {
    const updatedFiles = await Promise.all(
      files.map(
        file =>
          new Promise<{ name: string; payload: string; type: 'FILE' }>(
            (resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                resolve({
                  name: file.name,
                  payload: reader.result as string,
                  type: 'FILE'
                })
              }
              reader.onerror = reject
              reader.readAsDataURL(file)
            }
          )
      )
    )
    setNewFile(updatedFiles)
  }, [])

  const handlePost = useCallback(() => {
    const fileLoading = newFile.map(() => true)
    setLoading(fileLoading)
    newFile.forEach((file, index) => {
      const { name, payload } = file
      const body = JSON.stringify({ name, payload })
      executeRequest<FileItem>(
        endpoint,
        { method: 'post', body },
        res => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          mutate([...(files ?? []), res])
          toast.success(`Uploaded ${name}`)
        },
        () => {
          setLoading(prevLoading => {
            const updatedLoading = [...prevLoading]
            updatedLoading[index] = false
            return updatedLoading
          })
          toast.error(`Failed to upload ${name}`)
        }
      )
    })
    setNewFile([])
  }, [endpoint, mutate, files, newFile])

  const handlePut = useCallback(
    (id: string, body: { name?: string; tags?: string[] }) => {
      executeRequest<FileItem>(
        `${endpoint}/${id}`,
        { method: 'PUT', body: JSON.stringify(body) },
        res => {
          toast.success(`${res.name} - was updated`)
        },
        () => {
          toast.error(`Failed to update file`)
        }
      )
    },
    [endpoint]
  )

  useEffect(() => {
    newFile.length > 0 && handlePost()
  }, [newFile, handlePost])

  return { onDrop, handlePost, handlePut, loading, mutate, files, endpoint }
}
