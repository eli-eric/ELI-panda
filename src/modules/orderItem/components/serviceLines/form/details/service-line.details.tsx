import type { ColumnFiltersState } from '@tanstack/react-table'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'

import { ServiceLineGroups } from './service-line.groups'

export const ServiceLineDetails = () => {
  const { watch } = useFormContext()

  const serviceType = watch('serviceType')

  const tableId = 'items-select-table'

  const { data, isLoading, error } = useServiceType(serviceType?.uid)

  const [, setColumnFilters] = useFilters(tableId, false, false)

  useEffect(() => {
    if (data?.category) {
      const filters: ColumnFiltersState = [
        {
          id: 'category',
          value: data?.category
        },
        {
          id: 'itemUsage',
          value: [
            '25c189d0-0564-43a7-90d9-65b7083bea98',
            'a2aae89a-5cbe-4042-a726-44012b158226',
            '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
            '5defcd49-5307-4b21-94b1-870b8f61a919',
            '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
            'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea'
          ],
          name: 'itemUsage'
        }
      ]
      setColumnFilters(filters)
    }
    // eslint-disable-next-line
  }, [data])

  if (error) return <div className="text-red-300">Something went wrong!!</div>

  return (
    <div className="min-h-[320px]">
      <ServiceLineGroups
        category={data?.category}
        allowedDetails={data?.properties}
      />
    </div>
  )
}
