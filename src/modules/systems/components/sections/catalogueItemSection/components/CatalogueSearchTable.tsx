import { Fragment, Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSearch } from '@/hooks/table/useSearch'
import type { CatalogueItem } from '@/types/responses'

import CatalogueItemsTable from './CatalogueItemsTable'

interface Props {
  itemName?: string
  setItem: React.Dispatch<React.SetStateAction<CatalogueItem | undefined>>
}

const CatalogueSearchTable = ({ setItem, itemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  const { renderSearchBar } = useSearch({ useQuery: false, onSuccess: setSearchValue })

  useEffect(() => {
    if (searchValue === '') setItem(undefined)
    setItem(undefined)
  }, [searchValue, setItem])

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
