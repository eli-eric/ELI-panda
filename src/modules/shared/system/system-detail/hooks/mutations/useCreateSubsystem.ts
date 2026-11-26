import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    confirmSystemEdit,
    SystemEditCancelledError,
} from '@/modules/shared/system/edit-permission'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import type { CreateSubsystemBody, SystemDetail } from '../../types'
import { refreshSystemStructure } from '../../utils/refreshAfterSystemWrite'
import { getSystemDetailQueryKey } from '../queries/useSystemDetail'

/**
 * POST /system/:parentUid/subsystems — the server inherits responsible / location /
 * zone from the parent, validates the parent→child level rules and audits the
 * insert. Confirms the soft lock against the PARENT (the new HAS_SUBSYSTEM edge).
 */
export const useCreateSubsystem = (parentUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation<SystemDetail, AxiosError, CreateSubsystemBody>({
        mutationFn: async body =>
            (
                await queryMutate<SystemDetail, CreateSubsystemBody>('systemSubsystems', 'post', {
                    uid: parentUid,
                })(body)
            ).data,
        onSuccess: created => {
            // seed the new system so the redirect target renders fully on first paint
            queryClient.setQueryData(getSystemDetailQueryKey(created.uid), created)
            refreshSystemStructure(queryClient)
        },
    })

    const createSubsystem = useCallback(
        async (body: CreateSubsystemBody): Promise<SystemDetail> => {
            if (!(await confirmSystemEdit(queryClient, parentUid, fm))) {
                throw new SystemEditCancelledError()
            }
            return mutateAsync(body)
        },
        [queryClient, parentUid, fm, mutateAsync],
    )

    return { createSubsystem, isPending }
}
