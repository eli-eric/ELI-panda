'use client'

import { Search } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useGlobalSearchShortcut, useOpenGlobalSearch } from '@/modules/shared/globalSearch'

export function SidebarSearch() {
    const { formatMessage: fm } = useIntl()
    const openGlobalSearch = useOpenGlobalSearch()
    const { shortcutDisplay } = useGlobalSearchShortcut({
        onToggle: () => {},
        enabled: false,
    })

    return (
        <SidebarGroup className="py-0">
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={openGlobalSearch}
                            className={cn(
                                'group-data-[collapsible=icon]:justify-center',
                                'hover:bg-transparent hover:ring-2 hover:ring-primary/20',
                                'transition-all duration-200',
                                'hover:scale-[1.02]',
                            )}
                            tooltip={fm({ id: message.common.globalSearch.title })}
                        >
                            <Search className="size-4" />
                            <span className="flex-1 group-data-[collapsible=icon]:hidden">
                                {fm({ id: message.common.globalSearch.search })}
                            </span>
                            <Badge
                                variant="outline"
                                className="font-mono text-xs group-data-[collapsible=icon]:hidden"
                            >
                                {shortcutDisplay}
                            </Badge>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
