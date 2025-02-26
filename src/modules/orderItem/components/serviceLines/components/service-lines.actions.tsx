import { Fragment } from 'react'

import { TableButtonsWrapper, TableDeleteButton } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'

import { ServiceLineEdit } from './service-line.edit'

export const ServiceLineActionButtons = ({
  serviceLine
}: {
  serviceLine: ServiceLine
}) => {
  const { deleteServiceLine } = useServiceLine()
  const withWarning = useWarningModal()

  return (
    <Fragment>
      <TableButtonsWrapper>
        <ServiceLineEdit serviceLine={serviceLine} />
        <TableDeleteButton
          onClick={() => {
            withWarning(deleteServiceLine)(serviceLine.uuid)
          }}
        />
      </TableButtonsWrapper>
    </Fragment>
  )
}
