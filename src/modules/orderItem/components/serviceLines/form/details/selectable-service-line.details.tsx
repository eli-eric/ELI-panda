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

  // Initialize all properties as selected when service type changes

  if (error) return <div className="text-red-300">Something went wrong!!</div>

  return (
    <div className="flex flex-col">
      <div className="min-h-[320px]">
        <SelectableServiceLineGroups
          category={data?.category}
          allowedDetails={data?.properties}
        />
      </div>
    </div>
  )
}
