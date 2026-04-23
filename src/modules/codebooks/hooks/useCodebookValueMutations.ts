import type { QueryKey } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import type { NormalizedHttpError } from '@/core/http/fetchClient'
import { message } from '@/i18n/src/messages'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'
import { queryMutate } from '@/utils/fetcher'

interface Props {
    codebookType: CODEBOOK | null
    queryKey: QueryKey
}

export const useCodebookValueMutations = ({ codebookType, queryKey }: Props) => {
    const queryClient = useQueryClient()
    const { formatMessage: fm } = useIntl()

    const invalidate = () => queryClient.invalidateQueries({ queryKey })

    const sanitizeName = (name: string) => name.trim()
    const sanitizeCode = (code?: string) => code?.trim()
    const isConflictError = (error: unknown) => (error as NormalizedHttpError)?.status === 409

    const createMutation = useMutation({
        mutationFn: ({ name }: { name: string }) => {
            const mutateFn = queryMutate<CodebookType, { name: string }>('codebook', 'post', {
                isDefaultUrl: false,
                endpointVariables: { path: codebookType ?? '' },
            })
            return mutateFn({ name: sanitizeName(name) })
        },
        onSuccess: invalidate,
    })

    const updateMutation = useMutation({
        mutationFn: ({ uid, name, code }: { uid: string; name: string; code?: string }) => {
            const mutateFn = queryMutate<
                CodebookType,
                { name: string; uid: string; code?: string }
            >('codebook', 'put', {
                isDefaultUrl: false,
                endpointVariables: { path: `${codebookType}/${uid}` },
            })
            return mutateFn({
                uid,
                name: sanitizeName(name),
                code: sanitizeCode(code),
            })
        },
        onSuccess: invalidate,
    })

    const deleteMutation = useMutation({
        mutationFn: (uid: string) => {
            const mutateFn = queryMutate<void, void>('codebook', 'delete', {
                isDefaultUrl: false,
                endpointVariables: { path: `${codebookType}/${uid}` },
            })
            return mutateFn(undefined as void)
        },
        onSuccess: invalidate,
    })

    const create = async (data: { name: string }) => {
        const promise = createMutation.mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: message.codebooksPage.toast.addingValue }),
            success: fm({ id: message.codebooksPage.toast.valueAdded }),
            error: error =>
                isConflictError(error)
                    ? fm({ id: message.codebooksPage.toast.codeAlreadyExists })
                    : fm({ id: message.codebooksPage.toast.failedToAdd }),
        })
        return promise
    }

    const update = async (data: { uid: string; name: string; code?: string }) => {
        const promise = updateMutation.mutateAsync(data)
        toast.promise(promise, {
            loading: fm({ id: message.codebooksPage.toast.savingChanges }),
            success: fm({ id: message.codebooksPage.toast.changesSaved }),
            error: error =>
                isConflictError(error)
                    ? fm({ id: message.codebooksPage.toast.codeAlreadyExists })
                    : fm({ id: message.codebooksPage.toast.failedToSave }),
        })
        return promise
    }

    const deleteValue = async (uid: string) => {
        const promise = deleteMutation.mutateAsync(uid)
        toast.promise(promise, {
            loading: fm({ id: message.codebooksPage.toast.deletingValue }),
            success: fm({ id: message.codebooksPage.toast.valueDeleted }),
            error: fm({ id: message.codebooksPage.toast.failedToDelete }),
        })
        return promise
    }

    return {
        create,
        update,
        delete: deleteValue,
        isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
        isUpdating: updateMutation.isPending,
    }
}
