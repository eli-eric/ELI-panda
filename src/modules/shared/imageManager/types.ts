import type { FILE_TYPE } from '@/types/constants/files'

export type Status = {
  successfulUploads?: string[]
  failedUploads?: string[]
  successfulDeletions?: string[]
  failedDeletions?: string[]
}

export type ImageGalleryRef = {
  submit: (itemId: string, onSuccess?: (status: Status) => void, onError?: (status: Status) => void) => void
  hasChanges: boolean
}

export type Config = {
  itemCategory: FILE_TYPE
  itemId: string
  fileCategory?: string
  additionalParams?: {
    itemCategory?: FILE_TYPE
    itemId?: string
  }
}
