import { MoreVertical, Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'

interface Props {
    onDelete: () => void
}

export const CodebookValueActions = ({ onDelete }: Props) => {
    const { formatMessage: fm } = useIntl()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">
                        {fm({ id: message.codebooksPage.actions.label })}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {fm({ id: message.codebooksPage.actions.delete })}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
