import { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import ItemDetailComponent from '@/components/catalogueItem/item-detail.comp'
import { Button } from '@/components/ui/Buttons'
import { message } from '@/i18n/src/messages'

import CatalogueItemModal from './CatalogueItemModal'

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
