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
