import type { FC } from 'react'

import { ServiceTypeItem } from './service-type-item'

export const ServiceTypesContainer: FC = () => {
  return (
    <div id="category-list" className="h-60 flex items-center pl-4 gap-x-4">
      <ServiceTypeItem />
      <ServiceTypeItem />
      <ServiceTypeItem />
      <ServiceTypeItem />
      <ServiceTypeItem />
    </div>
  )
}
