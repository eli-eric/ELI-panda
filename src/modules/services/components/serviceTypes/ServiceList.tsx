import type { ServiceTypeResponse } from '../../types/responses'
import { ServiceItem } from './ServiceItem'

interface ServiceListProps {
  services: ServiceTypeResponse[]
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden dark:shadow-black sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {services.map(service => (
          <ServiceItem key={service.uid} service={service} />
        ))}
      </ul>
    </div>
  )
}
