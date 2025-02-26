import { useFormContext } from 'react-hook-form'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import type { CodebookType } from '@/types/responses/codebook'

import { ServiceLineGroups } from './service-line.groups'

export const ServiceLineDetails = ({
  serviceType
}: {
  serviceType?: CodebookType
}) => {
  const { watch } = useFormContext()

  const disabled = !!serviceType

  const serviceTypeForm = watch('serviceType')

  const { data, error } = useServiceType(
    serviceTypeForm?.uid || serviceType?.uid
  )

  if (error) return <div className="text-red-300">Something went wrong!!</div>

  if (!data) return <div>Loading...</div>

  return (
    <div className="min-h-[320px]">
      <ServiceLineGroups
        category={data?.category}
        allowedDetails={data?.properties}
      />
    </div>
  )
}
