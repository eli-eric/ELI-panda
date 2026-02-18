import { ArrowRightLeft, Box, CircleDot, type LucideIcon, Repeat } from 'lucide-react'

import { HISTORY_TYPE } from '@/modules/systemItem/types/constants'

interface HistoryTypeVisual {
    badgeClassName: string
    icon: LucideIcon
    iconClassName: string
}

const DEFAULT_VISUAL: HistoryTypeVisual = {
    badgeClassName: 'border-border bg-muted text-muted-foreground',
    icon: CircleDot,
    iconClassName: 'text-muted-foreground',
}

const HISTORY_TYPE_VISUALS: Record<HISTORY_TYPE, HistoryTypeVisual> = {
    [HISTORY_TYPE.GENERAL]: {
        badgeClassName: 'border-border bg-muted text-muted-foreground',
        icon: CircleDot,
        iconClassName: 'text-muted-foreground',
    },
    [HISTORY_TYPE.ITEM]: {
        badgeClassName:
            'border-emerald-200/70 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400',
        icon: Box,
        iconClassName: 'text-emerald-600 dark:text-emerald-400',
    },
    [HISTORY_TYPE.MOVE]: {
        badgeClassName:
            'border-amber-200/70 bg-amber-500/10 text-amber-700 dark:border-amber-800 dark:text-amber-400',
        icon: ArrowRightLeft,
        iconClassName: 'text-amber-600 dark:text-amber-400',
    },
    [HISTORY_TYPE.ITEM_MOVE]: {
        badgeClassName:
            'border-indigo-200/70 bg-indigo-500/10 text-indigo-700 dark:border-indigo-800 dark:text-indigo-400',
        icon: Repeat,
        iconClassName: 'text-indigo-600 dark:text-indigo-400',
    },
}

export const getHistoryTypeVisual = (historyType: HISTORY_TYPE): HistoryTypeVisual => {
    return HISTORY_TYPE_VISUALS[historyType] ?? DEFAULT_VISUAL
}
