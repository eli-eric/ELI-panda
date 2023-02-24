import { Fragment, Suspense, useState } from 'react'

import LoaderComponent from '@/components/ui/loader.comp'

import CatalogueItemsTable from './CatalogueItemsTable'
import SearchItem from './SearchBar'

interface Props {
  setItemUid: React.Dispatch<React.SetStateAction<string | undefined>>
}

const CatalogueItemsForm = ({ setItemUid }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

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
