import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from 'lucide-react'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'
import type { PageItem, PageSizeOption, UsePaginationReturn } from '@/types/pagination'
import { generatePageNumbers, PAGE_SIZE_OPTIONS } from '@/types/pagination'

const paginationMessages = message.cataloguePage.pagination

// Maximum number of page slots to prevent layout shift
const MAX_PAGE_SLOTS = 9 // 1 + ellipsis + 3 + current + 3 + ellipsis + last

interface PaginationV2Props extends UsePaginationReturn {
    total: number
    pageSizeOptions?: readonly PageSizeOption[]
    showPageSizeSelector?: boolean
}

export function PaginationV2({
    pagination,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    totalPages,
    isFirstPage,
    isLastPage,
    setPageSize,
    total,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    showPageSizeSelector = true,
}: PaginationV2Props) {
    const noResults = total === 0

    // Generate page numbers with ellipsis
    const pageNumbers = useMemo(
        () => generatePageNumbers(pagination.page, totalPages, 3),
        [pagination.page, totalPages],
    )

    // Pad array to fixed length to prevent layout shift
    const paddedPageNumbers = useMemo(() => {
        const result: (PageItem | null)[] = [...pageNumbers]
        // Pad to MAX_PAGE_SLOTS to maintain consistent width
        while (result.length < MAX_PAGE_SLOTS) {
            result.push(null)
        }
        return result
    }, [pageNumbers])

    return (
        <nav
            data-testid="pagination"
            className="flex items-center justify-between border-t border-border bg-background px-3 py-2 sm:px-6 sticky bottom-0 z-10"
            aria-label="Pagination"
        >
            {/* Left side: Navigation buttons with page numbers */}
            <div className="flex items-center gap-1">
                {/* First page button */}
                <Button
                    disabled={isFirstPage || noResults}
                    onClick={() => goToPage(1)}
                    size="sm"
                    variant="outline"
                    aria-label="First page"
                    className="hidden sm:flex transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous page button */}
                <Button
                    disabled={isFirstPage || noResults}
                    onClick={goToPreviousPage}
                    size="sm"
                    variant="outline"
                    aria-label="Previous page"
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers (desktop only) - fixed width container */}
                <div className="hidden sm:flex items-center justify-center">
                    {paddedPageNumbers.map((item, index) => (
                        <PageItemButton
                            key={index}
                            item={item}
                            currentPage={pagination.page}
                            onPageClick={goToPage}
                            disabled={noResults}
                        />
                    ))}
                </div>

                {/* Mobile: Page X of Y */}
                <span className="sm:hidden text-sm text-muted-foreground px-2 tabular-nums">
                    <FormattedMessage
                        id={paginationMessages.pageOf}
                        values={{ page: pagination.page, total: totalPages }}
                    />
                </span>

                {/* Next page button */}
                <Button
                    disabled={isLastPage || noResults}
                    onClick={goToNextPage}
                    size="sm"
                    variant="outline"
                    aria-label="Next page"
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last page button */}
                <Button
                    disabled={isLastPage || noResults}
                    onClick={() => goToPage(totalPages)}
                    size="sm"
                    variant="outline"
                    aria-label="Last page"
                    className="hidden sm:flex transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Right side: Total count + Page size selector */}
            <div className="flex items-center gap-4">
                {/* Total results count */}
                <span className="hidden sm:block text-sm text-muted-foreground tabular-nums">
                    <FormattedMessage
                        id={paginationMessages.totalResults}
                        defaultMessage="{count} results"
                        values={{ count: total }}
                    />
                </span>

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
            </div>
        </nav>
    )
}

interface PageItemButtonProps {
    item: PageItem | null
    currentPage: number
    onPageClick: (page: number) => void
    disabled: boolean
}

function PageItemButton({ item, currentPage, onPageClick, disabled }: PageItemButtonProps) {
    // Empty slot - invisible placeholder to maintain layout
    if (item === null) {
        return <div className="w-8 h-8" aria-hidden="true" />
    }

    if (item === 'ellipsis') {
        return (
            <span
                className="flex h-8 w-8 items-center justify-center text-muted-foreground"
                aria-hidden="true"
            >
                <MoreHorizontal className="h-4 w-4" />
            </span>
        )
    }

    const isCurrentPage = item === currentPage

    return (
        <Button
            size="sm"
            variant={isCurrentPage ? 'default' : 'ghost'}
            onClick={() => onPageClick(item)}
            disabled={disabled}
            aria-label={`Go to page ${item}`}
            aria-current={isCurrentPage ? 'page' : undefined}
            className="h-8 w-8 p-0 tabular-nums transition-all duration-150 hover:scale-105 active:scale-95"
        >
            <span className="transition-opacity duration-150">{item}</span>
        </Button>
    )
}
