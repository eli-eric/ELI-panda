import { useFormContext } from 'react-hook-form'

import LoaderComponent from '@/components/loader.comp'
import { useServiceType } from '@/modules/services/hooks/useServiceType'

import { ServiceLineGroups } from './service-line.groups'

export const ServiceLineDetails = () => {
  const { watch } = useFormContext()
  const serviceType = watch('serviceType')

  const { data, isLoading, error } = useServiceType(serviceType?.uid)

  if (isLoading) return <LoaderComponent />
  if (error) return <div className="text-red-300">Something went wrong!!</div>

  return (
    <div>
      {data && (
        <ServiceLineGroups
          category={data?.category}
          allowedDetails={data?.properties}
        />
      )}
    </div>
  )
}
