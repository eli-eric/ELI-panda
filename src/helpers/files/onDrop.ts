import { nanoid } from 'nanoid'
import type { Dispatch, SetStateAction } from 'react'
import { mutate } from 'swr'

import type { ProcessedFile } from '@/modules/shared/fileManager/types'

export const onDrop = async (
  files: File[],
  endpoint: string,
  setDueUpload: Dispatch<SetStateAction<ProcessedFile[]>>
) => {
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
  mutate(endpoint, data => [...tempFiles, ...(data ?? [])], { revalidate: false })
}
