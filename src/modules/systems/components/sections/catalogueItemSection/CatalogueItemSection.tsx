import { Fragment, useState } from 'react'

import { PlusButton } from '@/components/Buttons'
import ItemDetailComponent from '@/modules/catalogueItem/item-detail.comp'

import CatalogueItemModal from './components/CatalogueItemModal'

const CatalogueItemSection = ({ uid }: { uid?: string }) => {
  const [openAddItem, setOpenAddItem] = useState(false)

  return (
    <Fragment>
      {uid ? (
        <ItemDetailComponent uid={uid} />
      ) : (
        <PlusButton
          primary
          buttonSize="large"
          onClick={() => {
            setOpenAddItem(true)
          }}
        />
      )}
      <CatalogueItemModal open={openAddItem} setOpen={setOpenAddItem} />
    </Fragment>
  )
}

export default CatalogueItemSection
