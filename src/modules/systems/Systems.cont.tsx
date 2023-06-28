import { Fragment } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { SystemsTable } from './components/table/Systems.table'

export const SystemsContainer = () => (
  <Fragment>
    <TableLayoutContainer>
      <SystemsTable tableId={'systems'} enableQueryURL pageSizeDefault={50} className={'relative overflow-x-auto'} />
    </TableLayoutContainer>
  </Fragment>
)
