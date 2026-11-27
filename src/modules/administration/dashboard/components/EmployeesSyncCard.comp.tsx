import { RefreshCw } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { CronJobHistory, CronJobStatus } from '../types/cron.types'

const labels = message.adminPage.employeesSync

const STATUS_BADGE_VARIANT: Record<CronJobStatus, BadgeProps['variant']> = {
    SUCCESS: 'secondary',
    ERROR: 'destructive',
    RUNNING: 'outline',
    PENDING: 'outline',
}

interface Props {
    lastRun?: CronJobHistory
    isHistoryLoading?: boolean
    isHistoryError?: boolean
    isSyncing?: boolean
    onRun: () => void
}

const LastRun = ({ lastRun }: { lastRun: CronJobHistory }) => {
    const { formatMessage: fm, formatDate } = useIntl()

    return (
        <div className="flex flex-wrap items-center gap-2" data-testid="employees-sync-last-run">
            <Badge variant={STATUS_BADGE_VARIANT[lastRun.jobStatus] ?? 'outline'}>
                {fm({ id: labels.status[lastRun.jobStatus] ?? lastRun.jobStatus })}
            </Badge>
            <span>
                {formatDate(lastRun.startTime, { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
            {lastRun.jobMessage && (
                <span className="text-muted-foreground">{lastRun.jobMessage}</span>
            )}
        </div>
    )
}

const LastRunInfo = ({ lastRun, isHistoryLoading, isHistoryError }: Omit<Props, 'onRun'>) => {
    const { formatMessage: fm } = useIntl()

    if (isHistoryLoading) return <Skeleton className="h-5 w-64" />
    if (isHistoryError)
        return <span className="text-destructive">{fm({ id: labels.historyFailed })}</span>
    if (!lastRun)
        return <span className="text-muted-foreground">{fm({ id: labels.neverRun })}</span>

    return <LastRun lastRun={lastRun} />
}

export const EmployeesSyncCard = ({ onRun, isSyncing = false, ...lastRunProps }: Props) => {
    const { formatMessage: fm } = useIntl()

    return (
        <Card data-testid="employees-sync-card">
            <CardHeader>
                <CardTitle>{fm({ id: labels.title })}</CardTitle>
                <CardDescription>{fm({ id: labels.description })}</CardDescription>
                <CardAction>
                    <Button onClick={onRun} disabled={isSyncing} data-testid="employees-sync-run">
                        <RefreshCw className={cn(isSyncing && 'animate-spin')} />
                        {fm({ id: isSyncing ? labels.running : labels.run })}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="grid gap-1 text-sm">
                <span className="font-medium">{fm({ id: labels.lastRun })}</span>
                <LastRunInfo {...lastRunProps} />
            </CardContent>
        </Card>
    )
}
