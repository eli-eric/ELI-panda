import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'
import { createMessageValues } from '@/utils/formatters'

import { formatRelatedNodes } from '../utils/conflict'
import { TEAMS_QUERY_KEY } from './useTeams'
import { useTeamSelection } from './useTeamSelection'

const actions = message.teamsPage.actions

/**
 * Encapsulates team deletion: confirm dialog, toast feedback, 409 conflict
 * message (relatedNodes), and clearing the URL selection on success.
 */
export const useTeamDeleteAction = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const withWarningModal = useWarningModal()
    const { clearSelection } = useTeamSelection()

    const buildConflictMessage = useCallback(
        (name: string, data: unknown) =>
            fm(
                { id: actions.conflict },
                createMessageValues({ name, items: formatRelatedNodes(data) }),
            ),
        [fm],
    )

    const deleteTeam = useCallback(
        (uid: string, name: string) => {
            const runDelete = () => {
                const promise = queryMutate('teamDetail', 'delete', {
                    uid,
                    responseType: 'text',
                })(undefined)

                toast.promise(promise, {
                    loading: fm({ id: actions.deleting }),
                    success: () => {
                        queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
                        clearSelection()
                        return fm({ id: actions.deleted })
                    },
                    error: (error: AxiosError) =>
                        error?.response?.status === 409
                            ? buildConflictMessage(name, error.response.data)
                            : fm({ id: actions.deleteFailed }),
                })

                return promise.catch(() => undefined)
            }

            const confirm = fm({ id: actions.deleteConfirm }, createMessageValues({ name }))
            withWarningModal(runDelete, confirm)()
        },
        [fm, queryClient, withWarningModal, clearSelection, buildConflictMessage],
    )

    return { deleteTeam }
}
