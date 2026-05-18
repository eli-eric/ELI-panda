import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'

import type { FILE_TYPE, FileItem } from '../types'

type Params = { itemType: FILE_TYPE; uid: string | undefined }
export type UpdateVars = { id: string; body: { name?: string; tags?: string[] } }

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
    const intl = useIntl()
    const queryClient = useQueryClient()
    const endpoint = `/api/${itemType}/${uid}/files`

    return useMutation<FileItem, Error, UpdateVars>({
        mutationFn: async ({ id, body }) => {
            if (!uid) throw new Error('Cannot update file: missing uid')
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
                if (!old) return old
                return old.map(file =>
                    file.id === updated.id
                        ? { ...file, name: updated.name, tags: updated.tags }
                        : file,
                )
            })
            toast.success(
                intl.formatMessage(
                    { id: message.common.files.updateSuccess },
                    { name: updated.name },
                ),
            )
        },
        onError: error => {
            toast.error(
                intl.formatMessage(
                    { id: message.common.files.updateError },
                    { error: error.message },
                ),
            )
        },
    })
}
