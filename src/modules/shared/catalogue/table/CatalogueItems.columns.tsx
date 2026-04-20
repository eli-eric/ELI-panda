import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { FormattedDate, FormattedTime, useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { message } from '@/i18n/src/messages'
import { cn, truncateString } from '@/lib/utils'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { FALLBACK_IMAGE } from '@/types/constants/common'
import type { CatalogueItem, CatalogueItemsResponse } from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'

import { CategoryName } from './cells/CategoryNameCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ManufacturerUrl } from './cells/ManufacturerUrlCell'
import { NameCell } from './cells/NameCell'

const messages = message.cataloguePage.itemList.header

type Props = {
    tableId: string
    hideButtons?: boolean
    catalogueItems?: CatalogueItemsResponse
    setCategoryFilter?: (value: CodebookType) => void
    onSelectItem?: (uid: string) => void
}

export const useCatalogueItemsColumns = ({
    tableId,
    hideButtons,
    catalogueItems,
    setCategoryFilter,
    onSelectItem,
}: Props) => {
    const intl = useIntl()
    const uid = useCategoryUid()
    const { catalogueCategoryProperties } = useCategoryProperties(uid)

    const columns: ColumnDef<CatalogueItem, any>[] = useMemo(() => {
        const columns: ColumnDef<CatalogueItem, any>[] = [
            {
                id: 'miniImageUrl',
                size: 57,
                header: '',
                enableColumnFilter: false,
                meta: {
                    sticky: true,
                },
                accessorFn: row => row?.miniImageUrl?.[0],
                cell: ({ getValue, row: { original } }) => {
                    return (
                        <Avatar className="w-8 h-8 min-w-8">
                            <AvatarImage
                                src={getValue() || FALLBACK_IMAGE.url}
                                alt={original.name}
                            />
                            <AvatarFallback>{original.name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                    )
                },
            },
            {
                header: intl.formatMessage({ id: messages.name }),
                accessorFn: row => row.name,
                id: 'name',
                cell: props => (
                    <NameCell
                        {...props}
                        hideButtons={hideButtons}
                        tableId={tableId}
                        onSelectItem={onSelectItem}
                    />
                ),
                size: 440,
                meta: {
                    sticky: hideButtons ? false : true,
                },
            },
            {
                header: intl.formatMessage({ id: messages.description }),
                accessorFn: row => row.description,
                id: 'description',
                cell: DescriptionCell,
                size: 90,
            },
            {
                header: intl.formatMessage({ id: messages.partNumber }),
                size: 250,
                accessorFn: row => row.catalogueNumber,
                id: 'partNumber',
                cell: ({ getValue }) => {
                    const value = truncateString(getValue(), 30)
                    return (
                        <Tooltip content={getValue()}>
                            <div>{value}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: intl.formatMessage({ id: messages.categoryName }),
                accessorFn: row => row.category,
                id: 'categoryName',
                size: 200,
                cell: props => <CategoryName {...props} setCategoryFilter={setCategoryFilter} />,
            },
            {
                header: intl.formatMessage({ id: messages.supplier }),
                accessorFn: row => row.supplier?.name ?? '',
                id: 'supplier',
                size: 200,
            },
            {
                header: intl.formatMessage({ id: messages.supplierUrl }),
                accessorFn: row => row.manufacturerUrl ?? '',
                id: 'manufacturerUrl',
                size: 250,
                cell: ManufacturerUrl,
            },
        ]
        const updateColumns: ColumnDef<CatalogueItem, any>[] = [
            {
                id: 'lastUpdateTime',
                header: intl.formatMessage({ id: messages.lastUpdatedTime }),
                accessorFn: row => row.lastUpdateTime,
                meta: { className: 'justify-end' },
                size: 240,
                cell: ({ getValue }: CellContext<CatalogueItem, any>) => {
                    return (
                        <div className="flex gap-2">
                            <span>
                                <FormattedDate
                                    value={getValue()}
                                    day="2-digit"
                                    month="long"
                                    year="numeric"
                                />
                            </span>
                            <span>
                                <FormattedTime value={getValue()} />
                            </span>
                        </div>
                    )
                },
            },
            {
                id: 'lastUpdateBy',
                size: 200,
                header: intl.formatMessage({ id: messages.lastUpdatedBy }),
                accessorFn: row => row.lastUpdateBy,
            },
        ]
        if (
            catalogueCategoryProperties &&
            catalogueItems?.data[0]?.details &&
            catalogueItems?.data[0]?.details?.length > 0
        ) {
            const detailsColumns: ColumnDef<CatalogueItem, any>[] =
                catalogueCategoryProperties?.map(detail => ({
                    header: () => {
                        const name =
                            detail?.property?.name.length > 10
                                ? detail?.property?.name.slice(0, 10) + '...'
                                : detail?.property?.name
                        return (
                            <Tooltip content={detail?.property?.name}>
                                <div>
                                    <span>{name}</span>
                                </div>
                            </Tooltip>
                        )
                    },
                    id: detail.property.uid,
                    size: 150,
                    accessorFn: row =>
                        row.details?.find(
                            originDetail => originDetail?.property.name === detail?.property.name,
                        )?.value,
                    cell: ({ row: { original } }: CellContext<CatalogueItem, any>) => {
                        const value = original.details?.find(
                            originDetail => originDetail?.property.uid === detail?.property.uid,
                        )?.value
                        const unit = detail?.property?.unit?.name
                        if (!value) return null
                        if (detail?.property?.type.uid === PROPERTY_TYPE.RANGE) {
                            let valObject = value
                            if (typeof valObject === 'string') {
                                valObject = JSON.parse(valObject)
                            }
                            return (
                                <div>
                                    <span>{valObject?.min}</span>
                                    <span> - </span>
                                    <span>{valObject?.max}</span>
                                    {unit && <span> {unit}</span>}
                                </div>
                            )
                        }
                        return (
                            <div>
                                <span className={cn(unit && 'font-bold')}>{value}</span>
                                {unit && <span> {unit}</span>}
                            </div>
                        )
                    },
                }))
            if (detailsColumns) {
                const categoryNameIndex = columns.findIndex(column => column.id === 'categoryName')
                columns.splice(categoryNameIndex, 0, ...detailsColumns)
            }
        }

        return [...columns, ...updateColumns]
        // eslint-disable-next-line
    }, [
        intl,
        catalogueItems,
        tableId,
        catalogueCategoryProperties,
        hideButtons,
        onSelectItem,
        setCategoryFilter,
    ])

    return columns
}
