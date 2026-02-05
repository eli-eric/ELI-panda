import { Copy } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'

interface CopyCategoryButtonProps {
    handleCopyCategory: (e) => void
}

export const CopyCategoryButton: FC<CopyCategoryButtonProps> = ({ handleCopyCategory }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <DropdownMenuItem
            onClick={handleCopyCategory}
            className="flex items-center gap-2 w-full text-left"
        >
            <Copy className="h-4 w-4 transform transition-transform hover:scale-110 duration-300" />
            <span className="ml-2">{fm({ id: message.catalogue.category.copy })}</span>
        </DropdownMenuItem>
    )
}
