import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { FILE_TYPE, FileItem } from '../types'

type Params = { itemType: FILE_TYPE; uid: string }
type UpdateVars = { id: string; body: { name?: string; tags?: string[] } }

const parseError = async (res: Response): Promise<string> => {
    try {
        const body = (await res.json()) as { error?: string }
        if (body?.error) return body.error
    } catch {
        // fall through
    }
    return res.statusText || `HTTP ${res.status}`
}

export const useFileUpdate = ({ itemType, uid }: Params) => {
    const queryClient = useQueryClient()
    const endpoint = `/api/${itemType}/${uid}/files`

    return useMutation<FileItem, Error, UpdateVars>({
        mutationFn: async ({ id, body }) => {
            const res = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (!res.ok) throw new Error(await parseError(res))
            return (await res.json()) as FileItem
        },
        onSuccess: updated => {
            queryClient.setQueryData<FileItem[]>(['files', itemType, uid], old => {
                if (!old) return []
                return old.map(file =>
                    file.id === updated.id
                        ? { ...file, name: updated.name, tags: updated.tags }
                        : file,
                )
            })
            toast.success(`${updated.name} updated`)
        },
        onError: error => {
            toast.error(`Failed to update file: ${error.message}`)
        },
    })
}
