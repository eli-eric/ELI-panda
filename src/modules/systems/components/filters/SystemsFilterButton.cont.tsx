import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'

import { SystemsFilterForm } from './form/SystemsFilter.form'

export const SystemFilterButtonContainer = () => {
  const [open, setOpen] = useState(false)

  const [columnFilters, setColumnFilters] = useFilters('systems', true)

  const formMethods = useForm()
  const { reset } = formMethods

  /*   useEffect(() => {
    reset(
      columnFilters.reduce((acc, curr) => {
        acc[curr.id] = curr.value
        return acc
      }, {})
    )
  }, [columnFilters, reset])
 */
  const onSubmit = (data: any) => {
    setColumnFilters(() => {
      const newFilters: ColumnFiltersState = []
      Object.keys(data).forEach(key => {
        if (data[key]) {
          newFilters.push({
            id: key,
            value: data[key]
          })
        }
      })
      return newFilters
    })
    reset(data)
  }

  const onClear = () => {
    reset(
      {
        name: '',
        systemLevel: null,
        systemCode: '',
        systemAlias: '',
        systemType: null,
        zone: null,
        location: null,
        responsible: null,
        description: '',
        importance: null,
        itemUsage: null,
        eun: '',
        serialNumber: '',
        catalogueName: '',
        catalogueNumber: '',
        category: null,
        catalogueDescription: null,
        supplier: null
      },
      { keepValues: false }
    )
  }

  const buttons: SlideOverButtons = {
    goNext: {
      type: 'button',
      className: 'w-full justify-center',
      text: 'Clear filters',
      onClick: () => {
        onClear()
        setColumnFilters([])
      }
    }
  }

  return (
    <Fragment>
      <Button className="mr-1" buttonSize="large" onClick={() => setOpen(true)}>
        {columnFilters.length > 0 ? (
          <FunnelIconFull className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FunnelIconEmpty className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
      <Form formMethods={formMethods}>
        <SlideOver panelTitle="System Filters" open={open} setOpen={setOpen} buttons={buttons}>
          <SystemsFilterForm />
        </SlideOver>
      </Form>
    </Fragment>
  )
}
