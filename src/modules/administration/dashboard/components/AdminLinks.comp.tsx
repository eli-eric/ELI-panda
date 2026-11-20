import type { LucideIcon } from 'lucide-react'
import { ChevronRight, UserCog, Users } from 'lucide-react'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

const labels = message.adminPage.links

interface AdminLink {
    key: string
    href: PATH
    icon: LucideIcon
    title: string
    description: string
}

const ADMIN_LINKS: AdminLink[] = [
    { key: 'users', href: PATH.ADMIN_USERS, icon: UserCog, ...labels.users },
    { key: 'teams', href: PATH.ADMIN_TEAMS, icon: Users, ...labels.teams },
]

export const AdminLinks = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ADMIN_LINKS.map(({ key, href, icon: Icon, title, description }) => (
                <Link
                    key={key}
                    href={href}
                    className="group block"
                    data-testid={`admin-link-${key}`}
                >
                    <Card className="h-full transition-colors group-hover:bg-accent/40">
                        <CardHeader className="grid-cols-[auto_1fr_auto] items-center gap-4">
                            <Icon className="size-8 text-primary" />
                            <div className="grid gap-1.5">
                                <CardTitle>{fm({ id: title })}</CardTitle>
                                <CardDescription>{fm({ id: description })}</CardDescription>
                            </div>
                            <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
