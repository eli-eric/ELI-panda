export type FileItem = {
  id: string
  name: string
  url: string
  tags?: string[]
  size: number
}

export type ProcessedFile = {
  name: string
  payload: string
}

export enum FILE_TYPE {
  SYSTEM = 'system',
  CATALOGUE = 'catalogue',
  ORDER = 'order',
  ROOM_CARD = 'room-card',
  ITEM = 'item',
  CATEGORY = 'catalogue-category',
  GENERAL = 'general',
  PUBLICATION = 'publication'
}

export type FileLinkResponse = {
  url: string
  name: string
  tags?: string[]
}

export interface FileLinkPostResponse extends FileLinkResponse {
  uid: string
}
export interface FileItemExtended extends FileItem {
  type: 'FILE' | 'LINK'
}
