import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

interface Props {
    name: string
    catalogueNumber: string
    onBack: () => void
}

export const CatalogueItemDetailHeader: FC<Props> = ({ name, catalogueNumber, onBack }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border gap-2">
            <div className="flex items-center gap-2 min-w-0">
                <Button variant="ghost" size="icon" onClick={onBack} aria-label="back">
                    <ArrowLeft className="size-4" />
                </Button>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold truncate">{name}</h2>
                    <code className="text-xs text-muted-foreground">{catalogueNumber}</code>
                </div>
            </div>
            <span className="text-xs text-muted-foreground">
                {fm({ id: message.catalogue.detail.clickToEdit })}
            </span>
        </div>
    )
}
