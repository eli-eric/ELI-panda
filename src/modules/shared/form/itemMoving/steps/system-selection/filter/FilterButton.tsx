import { Filter } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'
import type { CodebookType } from '@/types/responses/codebook'

import { FilterForm } from './FilterForm'

type SystemFilterType = {
    name: string
    systemCode: string
    zone: CodebookType | null
    location: CodebookType | null
    parentSystem: CodebookType | null
}
interface Props {
    tableId?: string
    enableQueryURL?: boolean
    panelSlide?: 'left' | 'right'
}
export const FilterButton = ({
    panelSlide,
    tableId = 'destionation-systems',
    enableQueryURL = false,
}: Props) => {
    const [open, setOpen] = useState(false)

    const defValues = useMemo<SystemFilterType>(
        () => ({
            name: '',
            systemLevel: [],
            systemCode: '',
            zone: null,
            location: null,
            parentSystem: null,
        }),
        [],
    )
    const formMethods = useFormFilter<SystemFilterType>({
        tableId,
        defValues,
        enableQueryURL: enableQueryURL,
    })

    const { storeFilters, setColumnFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })
    const { reset } = formMethods

    //set custom field to delete from state and form

    const buttons: SlideOverButtons = {
        goNext: {
            type: 'button',
            className: 'w-full justify-center',
            text: 'Clear filters',
            onClick: () => {
                reset(defValues, { keepValues: false })
                setColumnFilters([])
            },
        },
    }

    return (
        <Fragment>
            <Button className="mr-1" onClick={() => setOpen(true)}>
                <Filter
                    className={`h-4 w-4 ${storeFilters.length > 0 ? 'fill-current' : ''}`}
                    aria-hidden="true"
                />
            </Button>
            <SlideOver
                className="z-40"
                RenderSettings={
                    <FilterSaveSettings
                        tableId={tableId}
                        enableQueryURL={enableQueryURL}
                        resetForm={formMethods.reset}
                        defaultFormValues={defValues}
                    />
                }
                panelTitle="System Filters"
                panelSlide={panelSlide}
                open={open}
                setOpen={setOpen}
                buttons={buttons}
            >
                <Form className="flex flex-col h-full justify-between" formMethods={formMethods}>
                    <FilterForm tableId={tableId} enableQueryUrl={false} />
                </Form>
            </SlideOver>
        </Fragment>
    )
}
