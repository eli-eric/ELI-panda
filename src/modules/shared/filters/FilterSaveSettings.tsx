import { Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { SaveFilterModalContent } from './components/SaveFilterModalContent'
import { useFilterOperations } from './hooks/useFilterOperations'
import type { FilterSaveSettingsProps } from './types'

export const FilterSaveSettings = (props: FilterSaveSettingsProps) => {
    const { formatMessage: fm } = useIntl()
    const { openModal } = useDynamicModalStore()

    const {
        filters,
        savedFilter,
        formMethods,
        applyFilter,
        updateFilter,
        deleteFilter,
        createFilter,
        canUpdate,
        canSaveNew,
    } = useFilterOperations(props)

    const openSaveFilterModal = () => {
        openModal('dialog', {
            id: 'filter-save-settings',
            component: SaveFilterModalContent,
            props: {
                title: 'Save Filter',
                size: 'm',
            },
            onSubmit: createFilter,
        })
    }

    return (
        <Form formMethods={formMethods} className="flex w-full gap-2">
            <Button onClick={deleteFilter} disabled={!savedFilter} className="pb-2">
                <Trash2 className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Listbox
                name="savedFilter"
                codebookResponse={filters}
                position="top"
                onChange={applyFilter}
            />

            <Button onClick={updateFilter} disabled={!canUpdate} className="pb-2">
                {fm({ id: message.common.filters.update })}
            </Button>

            <Button
                onClick={openSaveFilterModal}
                disabled={!canSaveNew}
                className="pb-2 whitespace-nowrap"
            >
                {fm({ id: message.common.filters.saveNew })}
            </Button>
        </Form>
    )
}
