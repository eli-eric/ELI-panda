import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CSVButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import useQueryManager from '@/hooks/useQueryManager'
import { queryMutate } from '@/utils/fetcher'

export const ExportButton = () => {
    const { query } = useQueryManager('publications')

    const exportMutation = useMutation({
        mutationKey: ['publicationsExport', query],
        mutationFn: () => {
            const fn = queryMutate<string, void>('publicationsExport', 'get', {
                responseType: 'text',
                query,
            })
            return fn(undefined)
        },
        onSuccess: res => {
            const blob = new Blob([res.data], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'publications.csv'
            a.click()
            window.URL.revokeObjectURL(url)
        },
    })

    const handleExport = () => {
        const promise = exportMutation.mutateAsync(undefined)
        toast.promise(promise, {
            loading: 'Exporting CSV...',
            success: 'CSV exported',
            error: 'Failed to export CSV',
        })
    }

    return (
        <Tooltip content="Export CSV">
            <div>
                <CSVButton onClick={handleExport} />
            </div>
        </Tooltip>
    )
}
