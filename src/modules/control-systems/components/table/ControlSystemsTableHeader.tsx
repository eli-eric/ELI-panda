import type { Table } from '@tanstack/react-table'
import { CircleHelp, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { FilterBadges } from '@/modules/shared/form/FilterBadges'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { ColumnVisibilityDropdown } from '@/modules/shared/table/ColumnVisibilityDropdown.comp'
import { SearchBarWrapper } from '@/modules/shared/table/SearchBarWrapper'
import { CODEBOOK } from '@/types/constants/codebook'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

import { ONLY_ROOT_ZONES } from '../../types/constants'
import { detectSearchPattern, hasAsteriskPattern } from '../../utils/searchPattern'
import { SearchPatternBadge } from './SearchPatternBadge'
import { StyledSearchOverlay } from './StyledSearchOverlay'

type ControlSystemsFilterType = {
    search: string
    zone: CodebookType | null
    systemType: CodebookType | null
}

interface Props {
    tableId: string
    enableQueryURL?: boolean
    table?: Table<any>
}

export const ControlSystemsTableHeader = ({
    tableId,
    enableQueryURL = true,
    table: tableInstance,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const canCreate = usePermission([ROLE.CONTROL_SYSTEMS_EDIT])

    // Local state for immediate UI responsiveness
    const [localSearchValue, setLocalSearchValue] = useState('')

    // Deferred value for non-blocking filter updates
    const deferredSearchValue = useDeferredValue(localSearchValue)

    const defaultValues = useMemo<ControlSystemsFilterType>(
        () => ({
            search: '',
            zone: null,
            systemType: null,
        }),
        [],
    )

    const formMethods = useFormFilter<ControlSystemsFilterType>({
        tableId,
        defValues: defaultValues,
        enableQueryURL,
    })

    const { setFilter } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    // Watch form state for external changes (e.g., FilterBadges clear)
    const formSearchValue = useWatch({
        control: formMethods.control,
        name: 'search',
    })

    // Sync form state to local state when changed externally
    useEffect(() => {
        if (formSearchValue !== localSearchValue) {
            setLocalSearchValue(formSearchValue || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSearchValue])

    // Detect search pattern from local value for instant visual feedback
    const searchPattern = detectSearchPattern(localSearchValue)
    const hasPattern = hasAsteriskPattern(localSearchValue)

    // Update filter only when deferred value changes (non-blocking)
    useEffect(() => {
        formMethods.setValue('search', deferredSearchValue)
        setFilter('search')(deferredSearchValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deferredSearchValue])

    return (
        <Form formMethods={formMethods}>
            <SearchBarWrapper>
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    {/* Search field with help icon */}
                    <div className="flex items-start gap-1 shrink-0">
                        {/* Search input - wider with shadow badge inside */}
                        <div className="w-80 relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />

                            {/* Styled overlay for asterisk visualization - only when asterisks present */}
                            {hasPattern && <StyledSearchOverlay value={localSearchValue} />}

                            {/* Shadow badge + Clear button - positioned at end */}
                            {localSearchValue && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1">
                                    {/* Shadow badge */}
                                    {searchPattern && (
                                        <SearchPatternBadge
                                            pattern={searchPattern}
                                            variant="shadow"
                                        />
                                    )}

                                    {/* Custom clear button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLocalSearchValue('')
                                            formMethods.setValue('search', '')
                                            setFilter('search')('')
                                        }}
                                        className="flex items-center justify-center h-5 w-5 rounded-full hover:bg-muted/50 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </div>
                            )}

                            {/* Native input with transparent text only when overlay is visible */}
                            <Input
                                name="search"
                                value={localSearchValue}
                                onChange={e => setLocalSearchValue(e.target.value)}
                                placeholder={fm({ id: message.common.ui.search })}
                                className={cn(
                                    'pl-10 h-9',
                                    // Hide native search clear button (X) using WebKit pseudo-element
                                    '[&::-webkit-search-cancel-button]:hidden',
                                    localSearchValue ? 'pr-32' : 'pr-3',
                                    hasPattern && 'ring-1 ring-lime-500/30 border-lime-500/50',
                                    hasPattern && 'text-transparent caret-foreground',
                                )}
                                type="search"
                            />
                        </div>

                        {/* Help icon with tooltip - close to input, aligned to top */}
                        <Tooltip
                            content={fm({ id: message.controlSystems.form.searchHelpTooltip })}
                            maxWidth="max-w-md"
                        >
                            <button
                                type="button"
                                className="flex items-center justify-center h-9 w-6 shrink-0"
                                aria-label="Search pattern help"
                            >
                                <CircleHelp className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                            </button>
                        </Tooltip>
                    </div>

                    {/* Zone filter */}
                    <div className="w-56 shrink-0">
                        <Combobox
                            name="zone"
                            filter={ONLY_ROOT_ZONES}
                            codebook={CODEBOOK.ZONE}
                            label=""
                            placeholder={fm({ id: message.controlSystems.form.zone })}
                            onSelect={setFilter('zone')}
                            isFilter={true}
                        />
                    </div>

                    {/* System Type filter */}
                    <div className="w-56 shrink-0">
                        <SystemTypeComboBox
                            systemTypeField={{
                                name: 'systemType',
                                placeholder: fm({ id: message.controlSystems.form.systemType }),
                                disabled: false,
                            }}
                            onChange={setFilter('systemType')}
                            isFilter={true}
                        />
                    </div>

                    {/* Filter badges */}
                    <div className="flex-shrink-0">
                        <FilterBadges tableId={tableId} enableQueryURL={enableQueryURL} />
                    </div>

                    {/* Spacer to push buttons to the right */}
                    <div className="flex-1" />

                    {/* Column visibility */}
                    {tableInstance && <ColumnVisibilityDropdown table={tableInstance} />}

                    {/* Create button */}
                    {canCreate && (
                        <Button asChild size="sm">
                            <Link href={PATH.CONTROL_SYSTEMS_CREATE}>
                                <Plus className="mr-2 h-4 w-4" />
                                {fm({ id: message.controlSystems.buttons.create })}
                            </Link>
                        </Button>
                    )}
                </div>
            </SearchBarWrapper>
        </Form>
    )
}
