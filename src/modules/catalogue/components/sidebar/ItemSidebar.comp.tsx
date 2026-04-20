import type { FC } from 'react'

import { MetadataSection } from '@/modules/systemHierarchy/components/sidebar/MetadataSection.comp'

export interface ItemSidebarData {
    uid: string
    name: string
    createdAt?: string | null
    createdBy?: { fullName?: string | null } | null
    modifiedAt?: string | null
    modifiedBy?: { fullName?: string | null } | null
    catalogueCategory?: {
        uid: string
        name: string
        parentPath?: Array<{ uid: string; name: string }> | null
    } | null
    physicalItemsCount?: number
    ordersCount?: number
    relatedItemsCount?: number
}

interface ItemSidebarProps {
    item: ItemSidebarData
    onSelectCategory: (uid: string) => void
    onViewRelated: () => void
}

const formatDate = (s?: string | null): string | null => {
    if (!s) return null
    try {
        return new Date(s).toLocaleDateString()
    } catch {
        return s
    }
}

export const ItemSidebar: FC<ItemSidebarProps> = ({ item, onSelectCategory, onViewRelated }) => {
    const path = item.catalogueCategory
        ? [
              ...(item.catalogueCategory.parentPath ?? []),
              {
                  uid: item.catalogueCategory.uid,
                  name: item.catalogueCategory.name,
              },
          ]
        : []

    return (
        <div className="p-4 space-y-4">
            {path.length > 0 && (
                <div data-testid="item-sidebar-breadcrumb">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Category
                    </h3>
                    <nav className="flex flex-wrap gap-1 text-xs">
                        {path.map((p, i) => (
                            <span key={p.uid} className="flex items-center gap-1">
                                <button
                                    type="button"
                                    className="underline underline-offset-2 hover:text-primary"
                                    onClick={() => onSelectCategory(p.uid)}
                                    data-testid={`item-sidebar-breadcrumb-${p.uid}`}
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
                title="Metadata"
                items={[
                    { label: 'Created', value: formatDate(item.createdAt) },
                    { label: 'Created by', value: item.createdBy?.fullName ?? null },
                    { label: 'Modified', value: formatDate(item.modifiedAt) },
                    { label: 'Modified by', value: item.modifiedBy?.fullName ?? null },
                ]}
            />

            <MetadataSection
                title="Statistics"
                items={[
                    { label: 'Physical Items', value: item.physicalItemsCount ?? 0 },
                    { label: 'Orders', value: item.ordersCount ?? 0 },
                    { label: 'Related Items', value: item.relatedItemsCount ?? 0 },
                ]}
            />

            {(item.relatedItemsCount ?? 0) > 0 && (
                <button
                    type="button"
                    className="text-xs text-primary underline underline-offset-2"
                    onClick={onViewRelated}
                    data-testid="item-sidebar-view-related"
                >
                    View related items
                </button>
            )}
        </div>
    )
}
