import { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import ItemDetailComponent from '@/modules/catalogueItem/item-detail.comp'

import CatalogueItemModal from './componenets/CatalogueItemModal'

const { addButton } = message.systemsPage.catalogueItem

const CatalogueItemSection = ({ uid }: { uid?: string }) => {
  const [openAddItem, setOpenAddItem] = useState(false)

  return (
    <Fragment>
      {uid ? (
        <ItemDetailComponent uid={uid} />
      ) : (
        <Button
          primary
          onClick={() => {
            setOpenAddItem(true)
          }}
        >
          <FormattedMessage id={addButton} />
        </Button>
      )}
      <CatalogueItemModal open={openAddItem} setOpen={setOpenAddItem} />
    </Fragment>
  )
}

export default CatalogueItemSection
