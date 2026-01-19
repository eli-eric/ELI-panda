import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'
import type { UsePaginationReturn } from '@/types/pagination'
import { PAGE_SIZE_OPTIONS } from '@/types/pagination'
import { createMessageValues } from '@/utils/formatters'

const paginationMessages = message.cataloguePage.pagination

interface PaginationV2Props extends UsePaginationReturn {
  total: number
  pageSizeOptions?: readonly number[]
  showPageSizeSelector?: boolean
}

export function PaginationV2({
  pagination,
  goToPreviousPage,
  goToNextPage,
  totalPages,
  isFirstPage,
  isLastPage,
  fromItem,
  toItem,
  setPageSize,
  total,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  showPageSizeSelector = true
}: PaginationV2Props) {
  const noResults = total === 0

  return (
    <nav
      data-testid="pagination"
      className="flex items-center justify-between border-t border-border bg-background px-3 py-2 sm:px-6 sticky bottom-0 z-10"
      aria-label="Pagination"
    >
      {/* Left side: Results text (desktop) / Page indicator (mobile) */}
      <div className="flex items-center gap-4">
        {/* Desktop: Full results text */}
        <p className="hidden sm:block text-sm text-muted-foreground">
          <FormattedMessage
            id={paginationMessages.text}
            values={createMessageValues({
              from: fromItem,
              to: toItem,
              resultsCount: total || 'N/A'
            })}
          />
        </p>

        {/* Mobile: Page X of Y */}
        <p className="sm:hidden text-sm text-muted-foreground">
          <FormattedMessage
            id={paginationMessages.pageOf}
            values={{ page: pagination.page, total: totalPages }}
          />
        </p>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-3">
        {/* Page size selector (desktop only) */}
        {showPageSizeSelector && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              <FormattedMessage id={paginationMessages.rowsPerPage} />
            </span>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={value => setPageSize(parseInt(value, 10))}
            >
              <SelectTrigger size="sm" className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map(size => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-1">
          <Button
            disabled={isFirstPage || noResults}
            onClick={goToPreviousPage}
            size="sm"
            variant="outline"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            disabled={isLastPage || noResults}
            onClick={goToNextPage}
            size="sm"
            variant="outline"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
