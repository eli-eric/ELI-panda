import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { useCategoryContextActions } from '../../hooks/useCategoryContextActions'

interface Props {
    categoryName?: string | null
    categoryUid?: string | null
}

export const CatalogueItemsPanelHeader: FC<Props> = ({ categoryName, categoryUid }) => {
    const { formatMessage: fm } = useIntl()
    const canEditItem = !!usePermission([ROLE.CATALOGUE_EDIT])
    const { openCategoryDetail } = useCatalogueNavigation()
    const { handleCreateItem } = useCategoryContextActions()

    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">{categoryName ?? 'All catalogue items'}</h2>
            </div>
            <div className="flex items-center gap-2">
                {categoryUid && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCategoryDetail(categoryUid)}
                    >
                        {fm({ id: message.catalogue.detail.viewCategoryDetail })}
                    </Button>
                )}
                {canEditItem && categoryUid && (
                    <Button
                        size="sm"
                        onClick={() => handleCreateItem(categoryUid, categoryName ?? undefined)}
                    >
                        <Plus className="size-3.5" />
                        {fm({ id: message.catalogue.detail.newItem })}
                    </Button>
                )}
            </div>
        </div>
    )
}
