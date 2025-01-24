import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { Pagination } from '../shared/table/Pagination'
import { SearchBar } from '../shared/table/SearchBar'
import { ServiceTypesContainer } from './components/serviceTypes/service-types.cont'
import { ServicesTable } from './components/table/services.table'
import { SERVICES_ID } from './types/constants'

export const ServicesContainer: FC = () => {
  return (
    <TableLayoutContainer>
      <SearchBar tableId={SERVICES_ID} />
      <ServiceTypesContainer />
      <ServicesTable />
      <Pagination tableId={SERVICES_ID} />
    </TableLayoutContainer>
  )
}
