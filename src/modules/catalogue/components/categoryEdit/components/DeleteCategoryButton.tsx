import { Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

interface EditCategoryProps {
    handleDelete: (e) => void
}

export const DeleteCategoryButton: FC<EditCategoryProps> = ({ handleDelete }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <DropdownMenuItem asChild>
            <button
                onClick={handleDelete}
                className={cn(
                    'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
                    'flex items-center gap-2 w-full text-left text-destructive',
                )}
            >
                <Trash2
                    className="h-4 w-4 hover:text-destructive transform transition-transform hover:scale-110 duration-300"
                    aria-hidden="true"
                />
                <span className="ml-2">{fm({ id: message.catalogue.category.delete })}</span>
            </button>
        </DropdownMenuItem>
    )
}
