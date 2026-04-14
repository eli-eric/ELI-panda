import React, { startTransition, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface Props {
    children: React.ReactNode

    deps?: any[]
    className?: string
}

// useLayoutEffect is used to avoid flickering
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export const TableLayoutContainer = ({ children, deps, className }: Props) => {
    const [height, setHeight] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useIsomorphicLayoutEffect(
        () => {
            const handleResize = () => {
                const searchBarInContainer = containerRef.current?.querySelector<HTMLElement>(
                    '[data-layout-slot="search-bar"]',
                )
                const searchBar =
                    searchBarInContainer?.clientHeight ||
                    document.querySelector<HTMLElement>('[data-layout-slot="search-bar"]')
                        ?.clientHeight ||
                    0
                const tableHeading = document.getElementById('table-heading')?.clientHeight || 0
                const pageHead = document.getElementById('page-head')?.clientHeight || 0
                const emptyResults = document.getElementById('empty-results')?.clientHeight || 0
                const columnHiding = document.getElementById('column-hiding')?.clientHeight || 0
                const categoryList = document.getElementById('category-list')?.clientHeight || 0
                const navBar = document.getElementById('nav-bar')?.clientHeight || 0
                const catalogueBreadcrump = document.getElementById('breadcrump')?.clientHeight || 0
                const cataloguePaging = document.getElementById('paging')?.clientHeight || 0
                const height =
                    searchBar +
                    tableHeading +
                    pageHead +
                    columnHiding +
                    categoryList +
                    cataloguePaging +
                    catalogueBreadcrump +
                    navBar -
                    emptyResults

                // REVIEW LAYOUT HEIGHT + 3  // TODO
                setHeight(height + 1)
            }

            // Set up ResizeObserver to watch for changes in specific elements
            const resizeObserver = new ResizeObserver(() => {
                handleResize()
            })

            // Observe category-list element for size changes
            const categoryListElement = document.getElementById('category-list')
            if (categoryListElement) {
                resizeObserver.observe(categoryListElement)
            }

            startTransition(() => {
                // Handler to call on window resize
                // Add event listener
                window.addEventListener('resize', handleResize)
                // Call handler right away so state gets updated with initial window size
                handleResize()
            })

            // Remove event listeners and observers on cleanup
            return () => {
                window.removeEventListener('resize', handleResize)
                resizeObserver.disconnect()
            }
        },
        deps ? [...deps] : [],
    )

    return (
        <div
            ref={containerRef}
            style={{
                height: `calc(100vh - ${height}px)`,
            }}
            className={cn('flex-col', className)}
        >
            {children}
        </div>
    )
}
