import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { fetchRequestDetailed } from '@/core/http/fetchClient'
import { BASE_URL } from '@/types/constants/common'

export const useRivExport = (year: string, provider: string) => {
    const [isDownloading, setIsDownloading] = useState(false)

    const downloadXml = useCallback(async () => {
        setIsDownloading(true)
        try {
            const { data, headers } = await fetchRequestDetailed<Blob>(
                `${BASE_URL}/publications/export/riv?year=${year}&provider=${provider}`,
                { responseType: 'blob' },
            )
            const disposition = headers['content-disposition'] ?? ''
            const filenameMatch = disposition.match(/filename="?([^";\s]+)"?/)
            const filename = filenameMatch?.[1] ?? `riv-export-${year}-${provider}.xml`

            const blob = new Blob([data], { type: 'application/xml' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            a.click()
            window.URL.revokeObjectURL(url)
        } catch {
            toast.error('Failed to download RIV export')
        } finally {
            setIsDownloading(false)
        }
    }, [year, provider])

    return { downloadXml, isDownloading }
}
