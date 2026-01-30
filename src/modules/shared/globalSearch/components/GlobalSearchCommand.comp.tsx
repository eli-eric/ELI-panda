import { Loader2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { GlobalSearchItem } from '../types'
import { getNodeTypeConfig } from '../utils/getNodeTypeConfig'
import type { QuickNavItem } from '../utils/mapNavBarToQuickNav'

interface GlobalSearchCommandProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    searchValue: string
    onSearchChange: (value: string) => void
    onClear: () => void
    results: GlobalSearchItem[]
    isLoading: boolean
    isFetching: boolean
    onSelect: (item: GlobalSearchItem) => void
    quickNavItems: QuickNavItem[]
    onQuickNavSelect: (url: string) => void
    error?: Error | null
}

/**
 * Pure UI component for global search command palette
 * Displays search results with color-coded badges and icons
 */
export const GlobalSearchCommand = ({
    open,
    onOpenChange,
    searchValue,
    onSearchChange,
    onClear,
    results,
    isLoading,
    isFetching,
    onSelect,
    quickNavItems,
    onQuickNavSelect,
    error,
}: GlobalSearchCommandProps) => {
    const { formatMessage: fm } = useIntl()

    // Group results by nodeType
    const groupedResults = results.reduce(
        (acc, item) => {
            if (!acc[item.nodeType]) {
                acc[item.nodeType] = []
            }
            acc[item.nodeType].push(item)
            return acc
        },
        {} as Record<string, GlobalSearchItem[]>,
    )

    const showLoading = isLoading && searchValue.length >= 2
    const showEmpty = !isLoading && searchValue.length >= 2 && results.length === 0
    const showMinChars = searchValue.length > 0 && searchValue.length < 2
    const showQuickNav = searchValue.length < 2 && quickNavItems.length > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader className="sr-only">
                <DialogTitle>{fm({ id: message.common.globalSearch.title })}</DialogTitle>
                <DialogDescription>
                    {fm({ id: message.common.globalSearch.description })}
                </DialogDescription>
            </DialogHeader>
            <DialogContent className="overflow-hidden p-0" showCloseButton={false} position="top">
                <Command shouldFilter={false}>
                    <CommandInput
                        value={searchValue}
                        onValueChange={onSearchChange}
                        onClear={onClear}
                        placeholder={fm({ id: message.common.globalSearch.placeholder })}
                    />
                    <CommandList className="max-h-[400px]">
                        {showMinChars && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                {fm({ id: message.common.globalSearch.minChars })}
                            </div>
                        )}

                        {showLoading && (
                            <div className="space-y-2 p-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="size-10 rounded" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="py-6 text-center text-sm text-destructive">
                                {fm({ id: message.common.globalSearch.error })}
                            </div>
                        )}

                        {showQuickNav && (
                            <CommandGroup heading="Quick Navigation">
                                {quickNavItems.map(item => {
                                    const Icon = item.icon

                                    return (
                                        <CommandItem
                                            key={item.url}
                                            value={item.url}
                                            onSelect={() => onQuickNavSelect(item.url)}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                                <Icon className="size-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{item.title}</p>
                                                {item.category && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.category}
                                                    </p>
                                                )}
                                            </div>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )}

                        {showEmpty && !error && (
                            <CommandEmpty>
                                {fm({ id: message.common.globalSearch.noResults })}
                            </CommandEmpty>
                        )}

                        {!showLoading &&
                            !showMinChars &&
                            searchValue.length >= 2 &&
                            Object.entries(groupedResults).map(([nodeType, items]) => {
                                const config = getNodeTypeConfig(nodeType as any)
                                const Icon = config.icon

                                return (
                                    <CommandGroup key={nodeType} heading={config.label}>
                                        {items.map(item => (
                                            <CommandItem
                                                key={item.uid}
                                                value={item.uid}
                                                onSelect={() => onSelect(item)}
                                                className="cursor-pointer"
                                            >
                                                <div
                                                    className={cn(
                                                        'flex size-8 shrink-0 items-center justify-center rounded-md',
                                                        config.bgColor,
                                                    )}
                                                >
                                                    <Icon className={cn('size-4', config.color)} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="font-medium truncate">
                                                            {item.name}
                                                        </p>
                                                        <Badge
                                                            variant={config.badgeVariant}
                                                            className="shrink-0 text-xs"
                                                        >
                                                            {config.label}
                                                        </Badge>
                                                    </div>
                                                    {item.description && (
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )
                            })}

                        {isFetching && !isLoading && (
                            <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
                                <Loader2 className="size-4 animate-spin" />
                                {fm({ id: message.common.globalSearch.updating })}
                            </div>
                        )}
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    )
}
