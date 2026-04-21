import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { MetadataSection } from '@/modules/systemHierarchy/components/sidebar/MetadataSection.comp'

export interface CategorySidebarData {
    uid: string
    name: string
    code: string
    systemType?: { uid: string; name: string } | null
    parentPath?: Array<{ uid: string; name: string }> | null
    itemsCount?: number
    subCategoriesCount?: number
}

interface CategorySidebarProps {
    category: CategorySidebarData
    onSelectCategory: (uid: string) => void
}

export const CategorySidebar: FC<CategorySidebarProps> = ({ category, onSelectCategory }) => {
    const { formatMessage: fm } = useIntl()
    const path = category.parentPath ?? []

    return (
        <div className="p-4 space-y-4">
            {path.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        {fm({ id: message.catalogue.sidebar.path })}
                    </h3>
                    <nav className="flex flex-wrap gap-1 text-xs">
                        {path.map((p, i) => (
                            <span key={p.uid} className="flex items-center gap-1">
                                <button
                                    type="button"
                                    className="underline underline-offset-2 hover:text-primary"
                                    onClick={() => onSelectCategory(p.uid)}
                                >
                                    {p.name}
                                </button>
                                {i < path.length - 1 && (
                                    <span className="text-muted-foreground">/</span>
                                )}
                            </span>
                        ))}
                    </nav>
                </div>
            )}

            <MetadataSection
                title={fm({ id: message.catalogue.sidebar.details })}
                items={[
                    {
                        label: fm({ id: message.catalogue.sidebar.code }),
                        value: category.code,
                    },
                    {
                        label: fm({ id: message.catalogue.sidebar.systemType }),
                        value: category.systemType?.name ?? null,
                    },
                ]}
            />

            <MetadataSection
                title={fm({ id: message.catalogue.sidebar.statistics })}
                items={[
                    {
                        label: fm({ id: message.catalogue.sidebar.itemsCount }),
                        value: category.itemsCount ?? 0,
                    },
                    {
                        label: fm({ id: message.catalogue.sidebar.subCategoriesCount }),
                        value: category.subCategoriesCount ?? 0,
                    },
                ]}
            />
        </div>
    )
}
