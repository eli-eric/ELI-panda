import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { SystemCodeResult } from '../../types'
import type { PreviewRow } from './usePreviewTableColumns'
import { usePreviewTableColumns } from './usePreviewTableColumns'

interface Props {
    previewData: SystemCodeResult[]
    createdData: SystemCodeResult[]
    isLoading: boolean
}

export const SystemCodesPreviewTable = ({ previewData, createdData, isLoading }: Props) => {
    const { formatMessage: fm } = useIntl()
    const columns = usePreviewTableColumns()

    // Combine created (first) and preview data with status indicator
    const tableData = useMemo<PreviewRow[]>(() => {
        const created = createdData.map(item => ({
            ...item,
            isPreview: false,
        }))
        const preview = previewData.map(item => ({
            ...item,
            isPreview: true,
        }))
        return [...created, ...preview]
    }, [createdData, previewData])

    // Show custom empty state when not loading and no data
    if (!isLoading && tableData.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <p className="font-medium">
                        {fm({ id: message.controlSystems.preview.emptyTitle })}
                    </p>
                    <p className="text-sm">
                        {fm({ id: message.controlSystems.preview.emptyDescription })}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Table
            columns={columns}
            data={tableData.length > 0 ? tableData : undefined}
            loading={isLoading}
            enablePagination
            defaultPageSize={100}
            getRowProps={row => ({
                className: cn({
                    'opacity-60': row.isPreview,
                }),
            })}
        />
    )
}
