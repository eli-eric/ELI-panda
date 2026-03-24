import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchRequestDetailed } from '@/core/http/fetchClient'
import { BASE_URL } from '@/types/constants/common'

import type { ZoneImportResult } from '../types/zone.types'

export const useZoneImport = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)

            const result = await fetchRequestDetailed<ZoneImportResult>(
                `${BASE_URL}/zones/import`,
                {
                    method: 'POST',
                    body: formData,
                },
            )
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['zones'] })
        },
    })
}
