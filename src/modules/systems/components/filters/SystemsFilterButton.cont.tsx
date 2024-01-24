import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { useQueryState } from 'next-usequerystate'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIsFirstRender } from 'usehooks-ts'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

import { useMinMaxPrice } from '../../hooks/useMinMaxPrice'
import { SystemsFilterForm } from './form/SystemsFilter.form'

export const SystemFilterButtonContainer = () => {
  const [open, setOpen] = useState(false)

  const [storeFilters, setColumnFilters] = useFilters('systems', true, false)
  const { minMaxPrice } = useMinMaxPrice()

  const [filterQuery] = useQueryState('filter', { history: 'replace' })
  const columnFilters = useMemo(() => JSON.parse(filterQuery || '[]'), [filterQuery])

  const defValues = useMemo(
    () => ({
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
      supplier: null,
      price: [minMaxPrice?.min, minMaxPrice?.max]
    }),
    [minMaxPrice]
  )

  const formMethods = useForm<any>({
    defaultValues: defValues
  })

  const { reset, setValue } = formMethods

  const isFirstRender = useIsFirstRender()
  const { instances, clear } = useFormControlStore()

  const fieldToSync = useMemo(() => instances?.systemsFilter, [instances])

  useEffect(() => {
    if (fieldToSync) {
      fieldToSync.forEach((fieldId: string) => {
        setValue(fieldId, defValues[fieldId])
      })
      clear('systemsFilter')
    }
  }, [fieldToSync, setValue, clear, defValues])

  useEffect(() => {
    if (isFirstRender) {
      if (!storeFilters.length) {
        reset(
          columnFilters.reduce((acc, curr) => {
            if (curr.id === 'systemLevel') {
              acc[curr.id] = { uid: curr.value, name: curr.value }
            }
            acc[curr.id] = curr.value
            return acc
          }, {})
        )
      }
      if (storeFilters.length) {
        reset(
          storeFilters.reduce((acc, curr) => {
            acc[curr.id] = curr.value
            return acc
          }, {})
        )
      }
    }
  }, [storeFilters, isFirstRender, reset, columnFilters])

  /*   const onSubmit = (data: any) => {
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
  } */

  const onClear = () => {
    reset(defValues, { keepValues: false })
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
        {storeFilters.length > 0 ? (
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
