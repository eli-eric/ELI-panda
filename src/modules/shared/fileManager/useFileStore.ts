import { create } from 'zustand'
import type { FileItem } from './types'

interface FileItemExtended extends FileItem {
  type: 'FILE' | 'LINK'
}
type FilesStoreStateType = {
  files: Array<FileItemExtended>
  setFiles: (files: Array<FileItemExtended>) => void
  setNewFile: (file: FileItemExtended) => void
}

export const useFilesStore = create<FilesStoreStateType>(set => ({
  files: [],
  setFiles: files => set({ files }),
  setNewFile: file =>
    set(state => {
      const newFiles = [...state.files, file]
      return { files: newFiles }
    })
}))
