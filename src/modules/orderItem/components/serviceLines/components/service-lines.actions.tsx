import { Fragment } from 'react'

import {
  TableButtonsWrapper,
  TableDeleteButton,
  TableEditButton
} from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'

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
        <TableEditButton
          onClick={() => {
            console.log('Edit button clicked')
          }}
        />
        <TableDeleteButton
          onClick={() => {
            withWarning(deleteServiceLine)(serviceLine)
          }}
        />
      </TableButtonsWrapper>
    </Fragment>
  )
}
