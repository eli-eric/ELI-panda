import { Fragment } from 'react'

import { StatsButton } from '@/components/Buttons'
import { useModal } from '@/hooks/useModal'

import { CatalogueStatisticsContainer } from './CatalogueStatistics.cont'

export const ModalStatisticsButtonLarge = () => {
  const setOpenStats = useModal(<CatalogueStatisticsContainer />)

  return (
    <Fragment>
      <StatsButton className="mr-1" onClick={() => setOpenStats()()} />
    </Fragment>
  )
}
