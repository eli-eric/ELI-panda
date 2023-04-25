import { Fragment, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSearch } from '@/hooks/useSearch'

import CatalogueItemsTable from './CatalogueItemsTable'

interface Props {
  itemName?: string
  setItem: React.Dispatch<React.SetStateAction<{ name?: string; uid?: string }>>
}

const CatalogueSearchTable = ({ setItem, itemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  const { renderSearchBar } = useSearch({ useQuery: false, onSuccess: setSearchValue })

  return (
    <Fragment>
      {renderSearchBar()}
      <div className="flex flex-col min-h-[324px] pb-3 justify-between">
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<ProgressBarComponent />}>
            <CatalogueItemsTable setItem={setItem} searchValue={searchValue} itemName={itemName} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Fragment>
  )
}

export default CatalogueSearchTable
