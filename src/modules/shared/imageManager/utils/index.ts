import type { ProcessedFile } from '../../fileManager/types'

export const getEndpoint = (itemCategory?: string, itemId?: string, fileCategory?: string) =>
    `/api/${itemCategory}/${itemId}/${fileCategory}`

/** Read browser File objects into `{ name, payload }` data-URL entries for upload. */
export const readFilesAsProcessed = (files: File[]): Promise<ProcessedFile[]> =>
    Promise.all(
        files.map(
            file =>
                new Promise<ProcessedFile>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => resolve({ name: file.name, payload: String(reader.result) })
                    reader.onerror = reject
                    reader.readAsDataURL(file)
                }),
        ),
    )
