import { Fragment, useState } from 'react'

import { StatsButton } from '@/components/Buttons'
import { Modal } from '@/components/modal/modal.comp'

import { CatalogueStatisticsContainer } from './CatalogueStatistics.cont'

export const ModalStatisticsButtonLarge = () => {
  const [openStats, setOpenStats] = useState(false)

  return (
    <Fragment>
      <StatsButton className="mr-1" buttonSize="large" onClick={() => setOpenStats(true)} />
      <Modal open={openStats} setOpen={setOpenStats}>
        <CatalogueStatisticsContainer />
      </Modal>
    </Fragment>
  )
}
