import { Fragment, Suspense, useState } from 'react'

import LoaderComponent from '@/components/ui/loader.comp'

import CatalogueItemsTable from './CatalogueItemsTable'
import SearchItem from './SearchBar'

interface Props {
  itemName?: string
  setItem: React.Dispatch<React.SetStateAction<{ name?: string; uid?: string }>>
}

const CatalogueItemsForm = ({ setItem, itemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  return (
    <Fragment>
      <SearchItem setSearchValue={setSearchValue} setItem={setItem} />
      <div className="flex flex-col min-h-[535px] justify-between">
        <Suspense fallback={<LoaderComponent />}>
          <CatalogueItemsTable
            setItem={setItem}
            searchValue={searchValue}
            itemName={itemName}
          />
        </Suspense>
      </div>
    </Fragment>
  )
}

export default CatalogueItemsForm
