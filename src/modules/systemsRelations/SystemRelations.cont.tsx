import { memo, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import useQueryManager from '@/hooks/useQueryManager'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { RelationshipType } from '@/modules/systemHierarchy/types/graph'
import {
    RELATIONSHIP_TYPE_LABELS,
    RELATIONSHIP_TYPES,
} from '@/modules/systemHierarchy/types/graph'
import type { SystemDetail } from '@/types/responses/systems'

import { FilterBadges } from '../shared/form/FilterBadges'
import { PaginationV2 as Pagination } from '../shared/table/PaginationV2'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { useRowSelection } from '../shared/table/pandaTable/hooks/useRowSelection'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { getColorBySystemLevel, getFontBySystemLevel } from '../systemItem/utils'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '../systems/hooks/useSystems'
import { useAssignRelations } from './hooks/useAssignRelations'
import { useRelationsStore } from './store/useRelationsStore'
import { useSystemsRelationsColumns } from './SystemRelations.columns'

const FilterMemoized = memo(SystemFilterButtonContainer)

const ASSIGNABLE_RELATIONSHIP_TYPES: RelationshipType[] = [
    RELATIONSHIP_TYPES.IS_SPARE_FOR,
    RELATIONSHIP_TYPES.IS_COOLED_BY,
    RELATIONSHIP_TYPES.IS_POWERED_BY,
    RELATIONSHIP_TYPES.IS_CONTROLLED_BY,
]

export const SystemRelationsContainer = () => {
    const { formatMessage: fm } = useIntl()
    const tableId1 = 'spare-parts'
    const tableId2 = 'for-system'

    const { selectedUidForSystem, setSelectedUidForSystem, selectedRelationshipType, setSelectedRelationshipType } = useRelationsStore()

    const [relationshipType, setRelationshipType] = useState<RelationshipType>(
        selectedRelationshipType ?? RELATIONSHIP_TYPES.IS_SPARE_FOR,
    )

    const sysetms1 = useSystems(tableId1)
    const sysetms2 = useSystems(tableId2)

    const [table1SelectedUids, setTable1SelectedUids] = useState<string[]>([])
    const [table2SelectedUids, setTable2SelectedUids] = useState<string[]>([])

    const {
        query: { search },
    } = useQueryManager(tableId2)

    const [, setRowSelection] = useRowSelection(tableId2)

    const columns1 = useSystemsRelationsColumns({
        tableId: tableId1,
        setSelectedUids: setTable1SelectedUids,
    })
    const columns2 = useSystemsRelationsColumns({
        tableId: tableId2,
        setSelectedUids: setTable2SelectedUids,
    })

    const tableSettings: PandaTableSettings<SystemDetail> = useMemo(
        () => ({
            enableMultiRowSelection: true,
            enableColumnHiding: true,
            enableColumnReordering: false,
            enableQueryURL: false,
        }),
        [],
    )

    const table = usePandaTable<SystemDetail>({
        tableId: tableId1,
        data: sysetms1.systems?.data,
        columns: columns1.columns,
        settings: {
            enableRowSelection: row => !table2SelectedUids?.some(uid => row.original.uid === uid),
            ...tableSettings,
        },
        getSubRows: row => row.subSystems || [],
    })

    const table2 = usePandaTable<SystemDetail>({
        tableId: tableId2,
        data: sysetms2.systems?.data,
        columns: columns2.columns,
        settings: {
            enableRowSelection: row => !table1SelectedUids?.some(uid => row.original.uid === uid),
            ...tableSettings,
        },
        getSubRows: row => row.subSystems || [],
    })

    useEffect(() => {
        table.setColumnOrder(['icon', 'select'])
        table2.setColumnOrder(['icon', 'select'])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getSelectedRowModel } = table
    const { getSelectedRowModel: getSelectedRowModel2 } = table2

    const withWarningModal = useWarningModal(
        'Are you sure you want to continue? The system types do not match.',
    )
    const { assignRelations, loading } = useAssignRelations()

    const saveRelations = () => {
        if (loading) {
            return
        }

        assignRelations(
            {
                sourceUids: table1SelectedUids,
                targetUids: table2SelectedUids,
                relationshipType,
            },
            {
                onSuccess: () => {
                    table.resetRowSelection()
                    table2.resetRowSelection()
                    setTable1SelectedUids([])
                    setTable2SelectedUids([])
                },
            },
        )
    }

    const handleAssignRelations = () => {
        if (loading) {
            return
        }

        // Only validate system type / part number for IS_SPARE_FOR
        if (relationshipType !== RELATIONSHIP_TYPES.IS_SPARE_FOR) {
            saveRelations()
            return
        }

        const isSameSystemType =
            getSelectedRowModel().flatRows.every(
                system =>
                    system.original.systemType !== undefined &&
                    getSelectedRowModel2().flatRows.some(
                        system2 =>
                            system2.original.systemType !== undefined &&
                            system.original.systemType?.uid === system2.original.systemType?.uid,
                    ),
            ) &&
            getSelectedRowModel().flatRows.some(
                system => system.original.systemType !== undefined,
            ) &&
            getSelectedRowModel2().flatRows.some(
                system2 => system2.original.systemType !== undefined,
            )

        const isSamePartNumber =
            getSelectedRowModel().flatRows.every(
                system =>
                    system.original.physicalItem?.catalogueItem?.catalogueNumber !== undefined &&
                    getSelectedRowModel2().flatRows.some(
                        system2 =>
                            system2.original.physicalItem?.catalogueItem?.catalogueNumber !==
                                undefined &&
                            system.original.physicalItem?.catalogueItem?.catalogueNumber ===
                                system2.original.physicalItem?.catalogueItem?.catalogueNumber,
                    ),
            ) &&
            getSelectedRowModel().flatRows.some(
                system =>
                    system.original.physicalItem?.catalogueItem?.catalogueNumber !== undefined,
            ) &&
            getSelectedRowModel2().flatRows.some(
                system2 =>
                    system2.original.physicalItem?.catalogueItem?.catalogueNumber !== undefined,
            )

        if (!isSamePartNumber && !isSameSystemType) {
            withWarningModal(
                saveRelations,
                ' Are you sure you want to continue? The Part Numbers and System Types do not match.',
            )()
            return
        }
        if (!isSamePartNumber) {
            withWarningModal(
                saveRelations,
                "'Are you sure you want to continue? The Part Numbers do not match.",
            )()
            return
        }
        if (!isSameSystemType) {
            withWarningModal(saveRelations)()
            return
        }

        saveRelations()
    }

    useEffect(() => {
        if (selectedUidForSystem && selectedUidForSystem === search) {
            setTable2SelectedUids([selectedUidForSystem])
            setRowSelection({ 0: true })
        } else {
            setTable2SelectedUids([])
            setRowSelection({})
            setSelectedUidForSystem(undefined)
        }
        return () => {
            setSelectedUidForSystem(undefined)
            setSelectedRelationshipType(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cn('grid grid-cols-2')}>
            <TableLayoutContainer deps={[sysetms1.systems]} className="border-r-4 border-gray-400">
                <SearchBar
                    tableId={tableId1}
                    useQuery={false}
                    left={<FilterMemoized tableId={tableId1} enableQueryURL={false} />}
                    right={<FilterBadges enableQueryURL={false} tableId={tableId1} />}
                    onChange={() => table.resetExpanded()}
                />
                <PandaTableV2
                    data={sysetms1.systems?.data}
                    tableHeading="Source Systems"
                    tableId={tableId1}
                    table={table}
                    loading={sysetms1.loading || columns1.pending}
                    className={'relative overflow-scroll scrollbar-style'}
                    settings={tableSettings}
                    getRowProps={({ original }) => ({
                        className: cn(
                            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                            getColorBySystemLevel(original?.systemLevel),
                            getFontBySystemLevel(original?.systemLevel),
                            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                            original?.statistics?.sp_coverage != null &&
                                original.statistics.sp_coverage < 1 &&
                                'text-red-500 dark:text-red-500 font-bold',
                        ),
                    })}
                />
                <Pagination
                    tableId={tableId1}
                    settings={{
                        enableQueryURL: false,
                        total: sysetms1.systems?.totalCount,
                    }}
                />
            </TableLayoutContainer>
            <TableLayoutContainer deps={[sysetms2.systems]}>
                <SearchBar
                    tableId={tableId2}
                    useQuery={false}
                    left={
                        <FilterMemoized
                            panelSlide="right"
                            tableId={tableId2}
                            enableQueryURL={false}
                        />
                    }
                    right={
                        <div className="flex items-center gap-2">
                            <FilterBadges enableQueryURL={false} tableId={tableId2} />
                            <Select
                                value={relationshipType}
                                onValueChange={v => setRelationshipType(v as RelationshipType)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        placeholder={fm({
                                            id: message.common.systemsRelations
                                                .selectRelationshipType,
                                        })}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {ASSIGNABLE_RELATIONSHIP_TYPES.map(type => (
                                        <SelectItem key={type} value={type}>
                                            {RELATIONSHIP_TYPE_LABELS[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                disabled={
                                    table1SelectedUids.length === 0 ||
                                    table2SelectedUids.length === 0
                                }
                                loading={loading}
                                onClick={handleAssignRelations}
                            >
                                {fm({ id: message.common.systemsRelations.assignRelation })}
                            </Button>
                        </div>
                    }
                    onChange={() => table.resetExpanded()}
                />
                <PandaTableV2
                    data={sysetms2.systems?.data}
                    tableHeading="Target Systems"
                    tableId={tableId2}
                    table={table2}
                    loading={sysetms2.loading || columns2.pending}
                    className={'relative overflow-scroll scrollbar-style'}
                    settings={tableSettings}
                    getRowProps={({ original }) => ({
                        className: cn(
                            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                            getColorBySystemLevel(original?.systemLevel),
                            getFontBySystemLevel(original?.systemLevel),
                            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
                            original?.statistics?.sp_coverage != null &&
                                original.statistics.sp_coverage < 1 &&
                                'text-red-500 dark:text-red-500 font-bold',
                        ),
                    })}
                />
                <Pagination
                    tableId={tableId2}
                    settings={{
                        enableQueryURL: false,
                        total: sysetms2.systems?.totalCount,
                    }}
                />
            </TableLayoutContainer>
        </div>
    )
}

export default SystemRelationsContainer
