import { Fragment } from 'react'

import { StatsButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useModal } from '@/hooks/useModal'

import { CatalogueStatisticsContainer } from './CatalogueStatistics.cont'

export const ModalStatisticsButtonLarge = () => {
  const setOpenStats = useModal(<CatalogueStatisticsContainer />)

  return (
    <Fragment>
      <Tooltip content="Statistics">
        <StatsButton onClick={() => setOpenStats()()} />
      </Tooltip>
    </Fragment>
  )
}
