import { FileDown } from 'lucide-react'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { PublicationExecutiveSummary } from '../types/executive-summary'
import { buildReportDocument, reportFileName } from '../utils/report-rows'

const { exports } = message.publicationsAnalytics

type Props = {
    summary: PublicationExecutiveSummary
}

const download = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}

/**
 * Downloads the report in Word or PDF.
 *
 * Both are generated from the summary currently on screen, through the same
 * table builder the page uses, so a downloaded file always states the same
 * figures the person was looking at when they asked for it.
 */
export const ExportButtons = ({ summary }: Props) => {
    const intl = useIntl()
    const { formatMessage: fm } = intl
    const [busy, setBusy] = useState(false)

    const run = async (format: 'docx' | 'pdf') => {
        setBusy(true)
        try {
            const report = buildReportDocument(summary, intl)
            const blob =
                format === 'docx'
                    ? await (await import('../utils/docx-export')).buildReportDocx(report)
                    : await (await import('../utils/pdf-export')).buildReportPdf(report)
            download(blob, reportFileName(summary, format))
        } catch {
            toast.error(fm({ id: exports.failed }))
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => run('docx')}
                data-testid="export-report-docx"
            >
                <FileDown className="mr-1 h-4 w-4" />
                {busy ? fm({ id: exports.preparing }) : fm({ id: exports.docx })}
            </Button>
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => run('pdf')}
                data-testid="export-report-pdf"
            >
                <FileDown className="mr-1 h-4 w-4" />
                {busy ? fm({ id: exports.preparing }) : fm({ id: exports.pdf })}
            </Button>
        </div>
    )
}
