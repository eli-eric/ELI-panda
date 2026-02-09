import { MoreVertical, Move, Package, Wrench } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'

interface ActionsDropdownProps {
    uid: string
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({ uid }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid={`actions-${uid}`}>
                <DropdownMenuItem className="cursor-pointer">
                    <Move className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.moveItem })}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Wrench className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.assignSpares })}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.assignItem })}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
