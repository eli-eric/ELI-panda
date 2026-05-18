import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'

import type { FILE_TYPE, FileItem } from '../types'

const MAX_FILE_BYTES = 100 * 1024 * 1024
const CONCURRENCY = 3

type Params = { itemType: FILE_TYPE; uid: string | undefined }

const readAsDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(reader.error ?? new Error('FileReader error'))
        reader.readAsDataURL(file)
    })

const parseErrorMessage = async (res: Response, fileName: string): Promise<string> => {
    try {
        const body = (await res.json()) as { error?: string }
        if (body?.error) return `${fileName}: ${body.error}`
    } catch {
        // swallow — fall through
    }
    return `${fileName}: ${res.statusText || `HTTP ${res.status}`}`
}

const formatNames = (files: File[]): string => {
    const names = files.map(f => f.name)
    if (names.length <= 3) return names.join(', ')
    return `${names.slice(0, 3).join(', ')} +${names.length - 3} more`
}

export const useFileUpload = ({ itemType, uid }: Params) => {
    const intl = useIntl()
    const queryClient = useQueryClient()
    const endpoint = `/api/${itemType}/${uid}/files`

    const upload = useCallback(
        (files: File[]) => {
            if (!uid || files.length === 0) return

            const oversized = files.filter(f => f.size > MAX_FILE_BYTES)
            const valid = files.filter(f => f.size <= MAX_FILE_BYTES)

            oversized.forEach(f => {
                toast.error(
                    intl.formatMessage(
                        { id: message.common.files.fileTooLarge },
                        { name: f.name },
                    ),
                )
            })

            if (valid.length === 0) return

            void runBatch(valid)

            async function uploadOne(file: File): Promise<FileItem> {
                const payload = await readAsDataURL(file)
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: file.name, payload }),
                })
                if (!res.ok) {
                    throw new Error(await parseErrorMessage(res, file.name))
                }
                return (await res.json()) as FileItem
            }

            async function runBatch(batch: File[]) {
                const total = batch.length
                let done = 0
                const toastId = toast.loading(
                    intl.formatMessage(
                        { id: message.common.files.uploading },
                        { done, total },
                    ),
                )

                const succeeded: FileItem[] = []
                const failed: File[] = []
                const errors: string[] = []

                const queue = [...batch]
                const workers = Array.from(
                    { length: Math.min(CONCURRENCY, queue.length) },
                    async () => {
                        while (queue.length > 0) {
                            const file = queue.shift()
                            if (!file) break
                            try {
                                const result = await uploadOne(file)
                                succeeded.push(result)
                                queryClient.setQueryData<FileItem[]>(
                                    ['files', itemType, uid],
                                    old => (old ? [result, ...old] : [result]),
                                )
                            } catch (err) {
                                failed.push(file)
                                errors.push(err instanceof Error ? err.message : String(err))
                            } finally {
                                done++
                                toast.loading(
                                    intl.formatMessage(
                                        { id: message.common.files.uploading },
                                        { done, total },
                                    ),
                                    { id: toastId },
                                )
                            }
                        }
                    },
                )

                await Promise.all(workers)

                if (failed.length === 0) {
                    toast.success(
                        intl.formatMessage(
                            { id: message.common.files.uploadSuccess },
                            { count: succeeded.length },
                        ),
                        { id: toastId },
                    )
                    return
                }

                toast.dismiss(toastId)
                if (succeeded.length > 0) {
                    toast.success(
                        intl.formatMessage(
                            { id: message.common.files.uploadSuccess },
                            { count: succeeded.length },
                        ),
                    )
                }
                const errorMessage = intl.formatMessage(
                    { id: message.common.files.uploadError },
                    { count: failed.length, names: formatNames(failed) },
                )
                toast.error(errorMessage, {
                    duration: Infinity,
                    description: errors[0],
                    action: {
                        label: intl.formatMessage({ id: message.common.files.retry }),
                        onClick: () => upload(failed),
                    },
                })
            }
        },
        [endpoint, intl, itemType, queryClient, uid],
    )

    return { upload }
}
