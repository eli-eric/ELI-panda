'use client'

import { BadgeCheck, ChevronsUpDown, CircleHelp } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useIntl } from 'react-intl'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'
import { PATH, SUPPORT } from '@/types/constants/paths'

import { DarkModeSwitch } from './darkmode-switch'
import { LogoutButton } from './logout-button'

export function NavUser() {
    const { data: session } = useSession()
    const { isMobile } = useSidebar()
    const { formatMessage: fm } = useIntl()
    const user = session?.user

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.image || undefined} alt={user?.fullName} />
                                <AvatarFallback className="rounded-lg">
                                    {user?.name?.substring(0, 2).toUpperCase() || 'CN'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.name}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg !bg-popover !text-popover-foreground !border-border"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.image || undefined}
                                        alt={user?.fullName}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {user?.name?.substring(0, 2).toUpperCase() || 'CN'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DarkModeSwitch />
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href={SUPPORT} target="_blank">
                                    <CircleHelp />
                                    {fm({ id: message.layout.support })}
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href={PATH.PROFILE_GENERAL}>
                                    <BadgeCheck />
                                    {fm({ id: message.layout.userMenu.profile })}
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
