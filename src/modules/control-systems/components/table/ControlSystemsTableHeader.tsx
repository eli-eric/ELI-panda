import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { FilterBadges } from '@/modules/shared/form/FilterBadges'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { SearchBarWrapper } from '@/modules/shared/table/SearchBarWrapper'
import { CODEBOOK } from '@/types/constants/codebook'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

import { ONLY_ROOT_ZONES } from '../../types/constants'

type ControlSystemsFilterType = {
    search: string
    zone: CodebookType | null
    systemType: CodebookType | null
}

interface Props {
    tableId: string
    enableQueryURL?: boolean
}

export const ControlSystemsTableHeader = ({ tableId, enableQueryURL = true }: Props) => {
    const { formatMessage: fm } = useIntl()
    const canCreate = usePermission([ROLE.CONTROL_SYSTEMS_EDIT])

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

    return (
        <Form formMethods={formMethods}>
            <SearchBarWrapper>
                {/* Search field */}
                <div className="w-64 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            {...formMethods.register('search')}
                            onChange={e => {
                                formMethods.setValue('search', e.target.value)
                                setFilter('search')(e.target.value)
                            }}
                            placeholder={fm({ id: message.common.ui.search })}
                            className="pl-10 h-9"
                            type="search"
                        />
                    </div>
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

                {/* Spacer to push button to the right */}
                <div className="flex-1" />

                {/* Create button */}
                {canCreate && (
                    <Button asChild size="sm">
                        <Link href={PATH.CONTROL_SYSTEMS_CREATE}>
                            <Plus className="mr-2 h-4 w-4" />
                            {fm({ id: message.controlSystems.buttons.create })}
                        </Link>
                    </Button>
                )}
            </SearchBarWrapper>
        </Form>
    )
}
