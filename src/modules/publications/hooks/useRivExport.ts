import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { fetchRequest } from '@/core/http/fetchClient'
import { BASE_URL } from '@/types/constants/common'

export const useRivExport = (year: string, provider: string) => {
    const [isDownloading, setIsDownloading] = useState(false)

    const downloadXml = useCallback(async () => {
        setIsDownloading(true)
        try {
            const data = await fetchRequest<Blob>(
                `${BASE_URL}/publications/export/riv?year=${year}&provider=${provider}`,
                { responseType: 'blob' },
            )
            const blob = new Blob([data], { type: 'application/xml' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `riv-export-${year}-${provider}.xml`
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
