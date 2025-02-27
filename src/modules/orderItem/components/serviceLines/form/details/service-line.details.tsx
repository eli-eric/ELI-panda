import { useFormContext } from 'react-hook-form'

import { useServiceType } from '@/modules/services/hooks/useServiceType'

import { ServiceLineGroups } from './service-line.groups'

export const ServiceLineDetails = () => {
  const { watch } = useFormContext()

  const serviceTypeForm = watch('serviceType')

  const { data, error } = useServiceType(serviceTypeForm?.uid)

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
