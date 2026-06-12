import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { FieldChangeEntry, HistoryResponse } from '../../types/history'

// Tolerant parser: BE may send `changes` as structured array or as JSON string.
const normalizeChanges = (raw: unknown): FieldChangeEntry[] | undefined => {
    if (!raw) return undefined
    if (Array.isArray(raw)) return raw as FieldChangeEntry[]
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw)
            return Array.isArray(parsed) ? (parsed as FieldChangeEntry[]) : undefined
        } catch {
            return undefined
        }
    }
    return undefined
}

export const useSystemHistory = (uid: string | null) => {
    return useQuery({
        queryKey: ['history', { uid }],
        queryFn: queryFetcher<HistoryResponse[]>('history'),
        select: data =>
            data.map(item => ({
                ...item,
                changes: normalizeChanges(item.changes),
            })),
        enabled: !!uid,
        retry: 1,
        staleTime: 30 * 1000, // 30 seconds
    })
}
