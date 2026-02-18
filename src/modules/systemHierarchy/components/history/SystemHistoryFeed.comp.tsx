import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import type { IntlShape } from 'react-intl'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { HISTORY_TYPE } from '@/modules/systemItem/types/constants'
import type { HistoryResponse } from '@/modules/systemItem/types/responses'
import { PATH } from '@/types/constants/paths'
import { formatDate } from '@/utils/formatters'

import { getHistoryTypeVisual } from './historyFeed.visuals'

interface SystemHistoryFeedProps {
    className?: string
    history?: HistoryResponse[]
}

export const SystemHistoryFeed: FC<SystemHistoryFeedProps> = ({ className, history }) => {
    const { formatMessage: fm } = useIntl()

    if (!history?.length) {
        return (
            <p className="text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.history.noHistory })}
            </p>
        )
    }

    return (
        <ul
            className={cn(
                'overflow-hidden rounded-lg border border-border/70 bg-card/40',
                className,
            )}
        >
            {history.map(historyItem => (
                <HistoryFeedRow key={historyItem.uid} historyItem={historyItem} />
            ))}
        </ul>
    )
}

interface HistoryFeedRowProps {
    historyItem: HistoryResponse
}

const HistoryFeedRow: FC<HistoryFeedRowProps> = ({ historyItem }) => {
    const { formatMessage: fm } = useIntl()
    const visual = getHistoryTypeVisual(historyItem.historyType)
    const Icon = visual.icon

    return (
        <li className="grid grid-cols-[auto_1fr_auto] gap-3 border-b border-border/60 px-3 py-2.5 last:border-b-0 hover:bg-accent/25">
            <div className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-muted/70">
                <Icon className={cn('size-3.5', visual.iconClassName)} />
            </div>

            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium leading-5 text-foreground">
                        {historyItem.changedBy}
                    </span>
                    <Badge
                        variant="outline"
                        className={cn(
                            'h-5 rounded px-1.5 text-[10px] font-medium tracking-wide uppercase',
                            visual.badgeClassName,
                        )}
                    >
                        {getHistoryTypeLabel(historyItem.historyType, fm)}
                    </Badge>
                </div>

                <p className="mt-0.5 break-words pr-2 text-sm leading-5 text-muted-foreground">
                    {renderHistoryMessage(historyItem, fm)}
                </p>
            </div>

            <time
                dateTime={historyItem.changedAt}
                className="pt-0.5 text-right text-xs leading-5 text-muted-foreground whitespace-nowrap"
            >
                {formatDate(historyItem.changedAt)}
            </time>
        </li>
    )
}

const getHistoryTypeLabel = (historyType: HISTORY_TYPE, fm: IntlShape['formatMessage']) => {
    switch (historyType) {
        case HISTORY_TYPE.GENERAL:
            return fm({ id: message.systemHierarchy.history.filters.general })
        case HISTORY_TYPE.ITEM:
            return fm({ id: message.systemHierarchy.history.filters.itemChanges })
        case HISTORY_TYPE.MOVE:
            return fm({ id: message.systemHierarchy.history.filters.moves })
        case HISTORY_TYPE.ITEM_MOVE:
            return fm({ id: message.systemHierarchy.history.filters.itemMoves })
        default:
            return fm({ id: message.systemHierarchy.history.filters.all })
    }
}

const renderHistoryMessage = (
    historyItem: HistoryResponse,
    fm: IntlShape['formatMessage'],
): ReactNode => {
    const { action, detail, historyType } = historyItem

    switch (historyType) {
        case HISTORY_TYPE.GENERAL:
            return `made ${action}`
        case HISTORY_TYPE.ITEM:
            return (
                <>
                    {fm({ id: message.common.systemItem.movedItemTo })}{' '}
                    <SystemLink detail={detail} />
                </>
            )
        case HISTORY_TYPE.MOVE:
            if (detail.direction === 'IN') {
                return (
                    <>
                        {fm({ id: message.common.systemItem.movedThe })}{' '}
                        <SystemLink detail={detail} />{' '}
                        {fm({ id: message.common.systemItem.fromUnderThatSystem })}
                    </>
                )
            }

            return (
                <>
                    {fm({ id: message.common.systemItem.thisSystemWasMovedFrom })}{' '}
                    <SystemLink detail={detail} />
                </>
            )
        case HISTORY_TYPE.ITEM_MOVE:
            return (
                <>
                    {detail.direction === 'IN'
                        ? fm({ id: message.common.systemItem.movedItemFrom })
                        : fm({ id: message.common.systemItem.movedItemTo })}{' '}
                    <SystemLink detail={detail} />
                </>
            )
        default:
            return null
    }
}

interface SystemLinkProps {
    detail: HistoryResponse['detail']
}

const SystemLink: FC<SystemLinkProps> = ({ detail }) => {
    return (
        <Link
            href={`${PATH.SYSTEM}/${detail.systemUid}`}
            target="_blank"
            className="font-medium text-primary underline-offset-2 hover:underline"
        >
            {detail.systemName}
        </Link>
    )
}
