import { Fragment } from 'react'

import { StatsButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { CatalogueStatisticsContainer } from './CatalogueStatistics.cont'

export const ModalStatisticsButtonLarge = () => {
  const openModal = useModalGlobalStore(state => state.openModal)

  return (
    <Fragment>
      <Tooltip content="Statistics">
        <StatsButton
          onClick={() =>
            openModal('dialog1', {
              component: CatalogueStatisticsContainer,
              props: {
                size: 'l',
                title: 'Statistics: Physical Items Inventory'
              }
            })
          }
        />
      </Tooltip>
    </Fragment>
  )
}
