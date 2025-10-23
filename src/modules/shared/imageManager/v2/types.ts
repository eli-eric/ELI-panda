import type { FILE_TYPE } from '../../fileManager/types'

/**
 * Image data structure returned from server
 */
export interface ImageItem {
  id: string
  name: string
  url: string
  type: string
  ts: number
  size: number
  tags?: string[]
}

/**
 * Parameters for image hooks
 */
export interface ImageHookParams {
  itemType: FILE_TYPE
  itemId?: string
}

/**
 * Upload mutation variables
 */
export interface UploadImageParams {
  file: File
}

/**
 * Delete mutation variables
 */
export interface DeleteImageParams {
  imageId: string
  imageName: string
}

/**
 * Image upload payload sent to server
 */
export interface ImageUploadPayload {
  name: string
  payload: string // base64 encoded image
}

/**
 * Server response for image upload
 */
export interface ImageUploadResponse {
  id: string
  name: string
  url: string
  type: string
  tags?: string[]
}
