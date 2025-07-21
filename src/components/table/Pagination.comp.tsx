import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Button } from '@/components/Buttons'
import { createMessageValues } from '@/utils/formatters'

const text = message.cataloguePage.pagination.text

interface Props {
  itemsTotalCount?: number
  page: number
  pageSize: number
  pageNumbers?: number

  previousPageHandler: () => void
  nextPageHandler: () => void
}

export default function PaginationComponent({
  itemsTotalCount,
  page,
  pageSize,
  pageNumbers,
  previousPageHandler,
  nextPageHandler
}: Props) {
  const noResults = itemsTotalCount === 0
  const nextIsDisabled =
    noResults || pageNumbers === page || !pageNumbers || !itemsTotalCount
  const previousIsDisabled = noResults || page === 1
  const from = noResults ? 0 : 1 + (page - 1) * pageSize
  const to = noResults
    ? 0
    : pageNumbers === page
      ? itemsTotalCount
      : page * pageSize
  return (
    <nav
      data-testid="paging"
      id="paging"
      className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 px-3 py-2 sm:px-6 sticky bottom-0 z-10"
      aria-label="Pagination"
    >
      <div className="hidden sm:block pr-2">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <FormattedMessage
            id={text}
            values={createMessageValues({
              from: from,
              to: to,
              resultsCount: itemsTotalCount || 'N/A'
            })}
          />
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <Button
          disabled={previousIsDisabled}
          onClick={previousPageHandler}
          size="sm"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          disabled={nextIsDisabled}
          onClick={nextPageHandler}
          className="ml-3"
          size="sm"
          variant="outline"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
