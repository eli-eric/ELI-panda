import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import type { CodebookType } from '@/types/responses/codebook'

import { SelectableServiceLineGroups } from './selectable-service-line.groups'

interface Props {
  serviceType?: CodebookType
}

export const SelectableServiceLineDetails = ({ serviceType }: Props) => {
  const { watch } = useFormContext()

  const serviceTypeForm = watch('serviceType')

  const { data, error } = useServiceType(
    serviceType ? serviceType.uid : serviceTypeForm?.uid
  )

  // Stabilize allowedDetails to prevent infinite re-renders
  const allowedDetails = useMemo(() => {
    return data?.properties || []
  }, [data?.properties])

  // Stabilize category reference
  const category = useMemo(() => {
    return data?.category
  }, [data?.category])

  if (error) return <div className="text-red-300">Something went wrong!!</div>

  return (
    <div className="flex flex-col">
      <div className="min-h-[320px]">
        <SelectableServiceLineGroups
          category={category}
          allowedDetails={allowedDetails}
        />
      </div>
    </div>
  )
}
