import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'

import CatalogueItemsTable from './CatalogueItemsTable'
import SearchBar from './SearchBar'

interface Props {
  itemName?: string
  setItem: React.Dispatch<React.SetStateAction<{ name?: string; uid?: string }>>
}

const CatalogueSearchTable = ({ setItem, itemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  return (
    <Fragment>
      <SearchBar setSearchValue={setSearchValue} setItem={setItem} />
      <div className="flex flex-col min-h-[535px] justify-between">
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<LoaderComponent />}>
            <CatalogueItemsTable setItem={setItem} searchValue={searchValue} itemName={itemName} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Fragment>
  )
}

export default CatalogueSearchTable
