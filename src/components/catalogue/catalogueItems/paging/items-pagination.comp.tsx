import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { MouseEventHandler } from 'react'
import { FormattedMessage } from 'react-intl'
import { createMessageValues } from 'src/helpers/formatters'
import { message } from 'src/i18n/src/messages'

const text = message.cataloguePage.pagination.text

interface Props {
  itemsTotalCount?: number
  page: number
  pageSize: number
  pageNumbers?: number

  previousPageHandler: MouseEventHandler<HTMLButtonElement>
  nextPageHandler: MouseEventHandler<HTMLButtonElement>
}

export default function ItemsPaginationComponent({
  itemsTotalCount,
  page,
  pageSize,
  pageNumbers,
  previousPageHandler,
  nextPageHandler
}: Props) {
  const noResults = itemsTotalCount === 0
  const nextIsDisabled = noResults || pageNumbers === page || !pageNumbers
  const previousIsDisabled = noResults || page === 1
  const from = noResults ? 0 : 1 + (page - 1) * pageSize
  const to = noResults
    ? 0
    : pageNumbers === page
    ? itemsTotalCount
    : page * pageSize
  return (
    <nav
      data-testid="catalogue-paging"
      id="catalogue-paging"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-5 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block pr-2">
        <p className="text-sm text-gray-700">
          <FormattedMessage
            id={text}
            values={createMessageValues({
              from: from,
              to: to,
              resultsCount: itemsTotalCount
            })}
          />
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={previousIsDisabled}
          onClick={previousPageHandler}
          className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 ${
            previousIsDisabled ? 'bg-gray-200' : 'hover:bg-gray-50'
          }`}
        >
          <ChevronLeftIcon className="h-6 w-6 flex-shrink-0" />
        </button>

        <button
          disabled={nextIsDisabled}
          onClick={nextPageHandler}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 ${
            nextIsDisabled ? 'bg-gray-200' : 'hover:bg-gray-50'
          }`}
        >
          <ChevronRightIcon className="h-6 w-6 flex-shrink-0" />
        </button>
      </div>
    </nav>
  )
}
