import { type FC, useMemo, useState } from 'react'

import { useCodebook } from '@/hooks/fetch/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'

import { useRivExport } from '../hooks/useRivExport'
import { useRivValidate } from '../hooks/useRivValidate'
import { RivExportDialogComponent } from './riv-export-dialog.comp'

export const RivExportDialogContainer: FC = () => {
    const currentYear = new Date().getFullYear()
    const yearOptions = useMemo(
        () => Array.from({ length: 5 }, (_, i) => String(currentYear - 2 + i)),
        [currentYear],
    )

    const [year, setYear] = useState(String(currentYear))
    const [provider, setProvider] = useState('')

    const { data: grantGroups } = useCodebook(CODEBOOK.GRANT_GROUP)
    const providerOptions = useMemo(
        () =>
            (grantGroups?.data ?? [])
                .filter((g): g is typeof g & { code: string } => !!g.code && g.code !== 'OTHER')
                .map(g => ({ code: g.code, name: g.name })),
        [grantGroups],
    )

    const canValidate = !!year && !!provider
    const { data: validation, isLoading: isValidating } = useRivValidate(year, provider, canValidate)
    const { downloadXml, isDownloading } = useRivExport(year, provider)

    return (
        <RivExportDialogComponent
            year={year}
            yearOptions={yearOptions}
            onYearChange={setYear}
            provider={provider}
            providerOptions={providerOptions}
            onProviderChange={setProvider}
            validation={validation}
            isValidating={isValidating}
            onDownload={downloadXml}
            isDownloading={isDownloading}
            canExport={canValidate}
        />
    )
}
