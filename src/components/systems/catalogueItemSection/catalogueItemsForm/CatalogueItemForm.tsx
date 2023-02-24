import { Fragment, Suspense, useState } from 'react'

import LoaderComponent from '@/components/ui/loader.comp'

import CatalogueItemsTable from './CatalogueItemsTable'
import SearchItem from './SearchBar'

const CatalogueItemsForm = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [itemUid, setItemUid] = useState<string>()
  return (
    <Fragment>
      <SearchItem setSearchValue={setSearchValue} setItemUid={setItemUid} />
      <Suspense fallback={<LoaderComponent />}>
        <CatalogueItemsTable
          setItemUid={setItemUid}
          searchValue={searchValue}
        />
      </Suspense>
    </Fragment>
  )
}

export default CatalogueItemsForm
