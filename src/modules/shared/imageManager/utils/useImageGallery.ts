import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { mutate } from 'swr'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FileItem, ProcessedFile } from '../../fileManager/types'
import type { Status } from '../types'
import { getEndpoint } from '.'

export const useImageGallery = ({ itemCategory, itemId, fileCategory }) => {
  const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

  const [dueUpload, setDueUpload] = useState<ProcessedFile[]>([])
  const [dueDelete, setDueDelete] = useState<FileItem[]>([])
  const dueUploadRef = useRef(dueUpload)
  const dueDeleteRef = useRef(dueDelete)

  useEffect(() => {
    dueUploadRef.current = dueUpload
  }, [dueUpload])

  useEffect(() => {
    dueDeleteRef.current = dueDelete
  }, [dueDelete])

  const handleDelete = (obj: FileItem) => {
    if (obj.id.startsWith('temp')) {
      setDueUpload(state => state.filter(file => file.name !== obj.name))
    } else {
      setDueDelete(state => [...state, obj])
    }
    mutate(endpoint, data => data?.filter(file => file.id !== obj.id), { revalidate: false })
  }

  const onDrop = (files: File[]) => {
    Promise.all(
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
    ).then(files => {
      setDueUpload(state => [...state, ...files])
      const tempFiles = files.map(file => {
        const id = `temp-${nanoid()}`
        const url = file.payload
        return {
          ...file,
          id,
          url
        }
      })
      mutate(endpoint, data => [...tempFiles, ...(data ?? [])], { revalidate: false })
    })
  }

  const submit = useCallback(
    (itemId: string, onSuccess: (status: Status) => void) => {
      const status: Status = {}
      const deletePromise = Promise.all(
        dueDeleteRef.current.map(file => axiosInstance.delete(`${endpoint}/${file.id}`))
      )
        .then(() => {
          status.successfulDeletions = dueDeleteRef.current.map(file => file.name)
        })
        .catch(() => {
          status.failedDeletions = dueDeleteRef.current.map(file => file.name)
          toast.error(`Failed to delete`)
        })

      const ep = itemId ? getEndpoint(itemCategory, itemId, fileCategory) : endpoint

      const uploadPromise = Promise.all(dueUploadRef.current.map(file => axiosInstance.post(ep, file)))
        .then(() => {
          status.successfulUploads = dueUploadRef.current.map(file => file.name)
        })
        .catch(() => {
          status.failedUploads = dueUploadRef.current.map(file => file.name)
          toast.error(`Failed to upload`)
        })

      Promise.allSettled([deletePromise, uploadPromise]).then(() => {
        onSuccess(status)
      })
    },
    [endpoint, itemCategory, fileCategory]
  )

  return {
    onDrop,
    handleDelete,
    submit,
    hasChanges: dueUpload.length > 0 || dueDelete.length > 0
  }
}
