import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { ShortCell } from '@/components/table/short-cell'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { ServiceTypeResponse } from '../../types/responses'
import { DeleteServiceButton } from './DeleteService.btn'

interface ServiceListProps {
    services: ServiceTypeResponse[]
}

export function ServiceList({ services }: ServiceListProps) {
    const hasEditRole = usePermission([ROLE.SERVICE_EDIT])
    const columnHelper = createColumnHelper<ServiceTypeResponse>()

    const columns = useMemo<ColumnDef<ServiceTypeResponse, any>[]>(() => {
        const baseColumns: ColumnDef<ServiceTypeResponse, any>[] = [
            columnHelper.accessor('name', {
                header: 'Name',
                size: 200,
                cell: info => (
                    <Link href={PATH.SERVICE + '/' + info.row.original.uid}>
                        <span className="text-primary font-medium hover:underline">
                            {info.getValue()}
                        </span>
                    </Link>
                ),
            }),
            columnHelper.accessor(row => row.category?.name, {
                id: 'category',
                header: 'Category',
                size: 200,
                cell: info => (
                    <Link
                        href={
                            PATH.CATALOGUE +
                            '?category=' +
                            `{"uid":"${info.row.original.category?.uid}", "name":"${info.row.original.category?.name}"}`
                        }
                        className="text-primary font-medium hover:underline"
                    >
                        {info.getValue()}
                    </Link>
                ),
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                size: 200,
                cell: info => <ShortCell value={info.getValue()} numberOfChars={100} />,
            }),
        ]

        if (hasEditRole) {
            baseColumns.push(
                columnHelper.display({
                    id: 'actions',
                    header: 'Action',
                    size: 50,
                    cell: info => (
                        <div className="flex justify-end">
                            <DeleteServiceButton
                                uid={info.row.original.uid}
                                name={info.row.original.name}
                            />
                        </div>
                    ),
                }) as ColumnDef<ServiceTypeResponse, any>,
            )
        }

        return baseColumns
    }, [columnHelper, hasEditRole])

    return (
        <Table
            columns={columns}
            data={services}
            enableFiltering={true}
            enablePagination={true}
            defaultPageSize={100}
            className="shadow-md w-full"
            enableSorting={true}
        />
    )
}
