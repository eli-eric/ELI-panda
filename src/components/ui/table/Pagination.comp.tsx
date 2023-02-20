import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { MouseEventHandler } from 'react'
import { FormattedMessage } from 'react-intl'
import { createMessageValues } from 'src/helpers/formatters'
import { message } from 'src/i18n/src/messages'

import { Button } from '@/components/ui/Buttons'

const text = message.cataloguePage.pagination.text

interface Props {
  itemsTotalCount?: number
  page: number
  pageSize: number
  pageNumbers?: number

  previousPageHandler: MouseEventHandler<HTMLButtonElement>
  nextPageHandler: MouseEventHandler<HTMLButtonElement>
}

export default function PaginationComponent({
  itemsTotalCount,
  page,
  pageSize,
  pageNumbers,
  previousPageHandler,
  nextPageHandler,
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
              resultsCount: itemsTotalCount,
            })}
          />
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <Button
          disabled={previousIsDisabled}
          onClickAction={previousPageHandler}
        >
          <ChevronLeftIcon className="h-6 w-6 flex-shrink-0" />
        </Button>

        <Button
          disabled={nextIsDisabled}
          onClickAction={nextPageHandler}
          customClass="ml-3"
        >
          <ChevronRightIcon className="h-6 w-6 flex-shrink-0" />
        </Button>
      </div>
    </nav>
  )
}
