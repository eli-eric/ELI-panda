import type { FC } from 'react'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGalleryV2 } from '@/modules/shared/imageManager/v2/ImageGalleryV2'
import { MetadataSection } from '@/modules/systemHierarchy/components/sidebar/MetadataSection.comp'
import { ROLE } from '@/types/constants/roles'

import { formatPropertyValue } from '../../utils/formatPropertyValue'

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
    details?: CatalogueItemDetail[]
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
    const { formatMessage: fm } = useIntl()
    const canEdit = !!usePermission([ROLE.CATALOGUE_EDIT])
    const path = item.catalogueCategory
        ? [
              ...(item.catalogueCategory.parentPath ?? []),
              {
                  uid: item.catalogueCategory.uid,
                  name: item.catalogueCategory.name,
              },
          ]
        : []

    const labels = useMemo(
        () => ({
            yes: fm({ id: message.catalogue.sidebar.yes }),
            no: fm({ id: message.catalogue.sidebar.no }),
            emDash: fm({ id: message.catalogue.sidebar.emDash }),
        }),
        [fm],
    )

    const parameterGroups = useMemo(() => {
        const details = item.details ?? []
        const map = new Map<string, CatalogueItemDetail[]>()
        details.forEach(d => {
            const key = d.propertyGroup || 'Other'
            if (!map.has(key)) map.set(key, [])
            map.get(key)!.push(d)
        })
        return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
    }, [item.details])

    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-style">
            <div className="p-4 space-y-4">
                <ImageGalleryV2
                    itemType={FILE_TYPE.CATALOGUE}
                    itemId={item.uid}
                    hasEditRole={canEdit}
                    allowMultipleImages
                />
                {path.length > 0 && (
                    <div data-testid="item-sidebar-breadcrumb">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {fm({ id: message.catalogue.sidebar.category })}
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
                    title={fm({ id: message.catalogue.sidebar.metadata })}
                    items={[
                        {
                            label: fm({ id: message.catalogue.sidebar.createdAt }),
                            value: formatDate(item.createdAt),
                        },
                        {
                            label: fm({ id: message.catalogue.sidebar.createdBy }),
                            value: item.createdBy?.fullName ?? null,
                        },
                        {
                            label: fm({ id: message.catalogue.sidebar.modifiedAt }),
                            value: formatDate(item.modifiedAt),
                        },
                        {
                            label: fm({ id: message.catalogue.sidebar.modifiedBy }),
                            value: item.modifiedBy?.fullName ?? null,
                        },
                    ]}
                />

                {parameterGroups.length > 0 && (
                    <div
                        className="space-y-3"
                        data-testid="item-sidebar-parameters"
                    >
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {fm({ id: message.catalogue.sidebar.parameters })}
                        </h3>
                        {parameterGroups.map(([groupName, details]) => (
                            <MetadataSection
                                key={groupName}
                                title={groupName}
                                items={details.map(d => {
                                    const unit = d.property.unit?.name
                                    const label = unit
                                        ? `${d.property.name} [${unit}]`
                                        : d.property.name
                                    return {
                                        label,
                                        value: formatPropertyValue(d, labels),
                                    }
                                })}
                            />
                        ))}
                    </div>
                )}

                <MetadataSection
                    title={fm({ id: message.catalogue.sidebar.statistics })}
                    items={[
                        {
                            label: fm({ id: message.catalogue.sidebar.physicalItems }),
                            value: item.physicalItemsCount ?? 0,
                        },
                        {
                            label: fm({ id: message.catalogue.sidebar.ordersCount }),
                            value: item.ordersCount ?? 0,
                        },
                        {
                            label: fm({ id: message.catalogue.sidebar.relatedCount }),
                            value: item.relatedItemsCount ?? 0,
                        },
                    ]}
                />

                {(item.relatedItemsCount ?? 0) > 0 && (
                    <button
                        type="button"
                        className="text-xs text-primary underline underline-offset-2"
                        onClick={onViewRelated}
                        data-testid="item-sidebar-view-related"
                    >
                        {fm({ id: message.catalogue.sidebar.viewRelatedItems })}
                    </button>
                )}
            </div>
        </div>
    )
}
