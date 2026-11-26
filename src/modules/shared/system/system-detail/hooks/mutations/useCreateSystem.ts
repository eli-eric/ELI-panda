import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import type { CreateSystemBody, SystemDetail } from '../../types'
import { refreshSystemStructure } from '../../utils/refreshAfterSystemWrite'
import { getSystemDetailQueryKey } from '../queries/useSystemDetail'

/**
 * POST /systems — creates a root system, or a child of `parentUid` (the server inherits
 * absent responsible / location / zone, validates the level rules and audits the insert).
 * A child confirms the soft lock against the PARENT (the new HAS_SUBSYSTEM edge): call
 * `confirmCreate` first, so a declined confirm never shows a loading toast.
 */
export const useCreateSystem = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation<SystemDetail, AxiosError, CreateSystemBody>({
        mutationFn: async body =>
            (await queryMutate<SystemDetail, CreateSystemBody>('systemCreate', 'post')(body)).data,
        onSuccess: created => {
            queryClient.setQueryData(getSystemDetailQueryKey(created.uid), created)
            refreshSystemStructure(queryClient)
        },
    })

    const confirmCreate = useCallback(
        async (parentUid?: string | null) =>
            !parentUid || confirmSystemEdit(queryClient, parentUid, fm),
        [queryClient, fm],
    )

    return { confirmCreate, createSystem: mutateAsync, isPending }
}
