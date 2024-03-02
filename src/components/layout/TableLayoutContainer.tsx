import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useState } from 'react'

interface Props {
  children: React.ReactNode

  deps?: any[]
  className?: string
}

// useLayoutEffect is used to avoid flickering
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export const TableLayoutContainer = ({ children, deps, className }: Props) => {
  const [height, setHeight] = useState<number>(0)

  useIsomorphicLayoutEffect(
    () => {
      // Handler to call on window resize
      const handleResize = () => {
        const searchBar = document.getElementById('search-bar')?.clientHeight || 0
        const tableHeading = document.getElementById('table-heading')?.clientHeight || 0
        const emptyResults = document.getElementById('empty-results')?.clientHeight || 0
        const columnHiding = document.getElementById('column-hiding')?.clientHeight || 0
        const categoryList = document.getElementById('category-list')?.clientHeight || 0
        const navBar = document.getElementById('nav-bar')?.clientHeight || 0
        const catalogueBreadcrump = document.getElementById('breadcrump')?.clientHeight || 0
        const cataloguePaging = document.getElementById('paging')?.clientHeight || 0
        const height =
          searchBar +
          tableHeading +
          columnHiding +
          categoryList +
          cataloguePaging +
          catalogueBreadcrump +
          navBar -
          emptyResults

        // REVIEW LAYOUT HEIGHT + 3  // TODO
        setHeight(height + 1)
      }
      // Add event listener
      window.addEventListener('resize', handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    },
    deps ? [...deps] : []
  )

  return (
    <div
      style={{
        height: `calc(100vh - ${height}px)`
      }}
      className={classNames('flex-col', className)}
    >
      {children}
    </div>
  )
}
