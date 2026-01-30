'use client'

import { useIntl } from 'react-intl'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'
import type { NavigationItem } from '@/lib/navigation/types'

import { NavItem } from './nav-item'

interface NavMainProps {
    items: NavigationItem[]
}

export function NavMain({ items }: NavMainProps) {
    const { formatMessage: fm } = useIntl()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{fm({ id: message.common.navigation.modules })}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map(item => (
                    <NavItem key={item.url} item={item} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
