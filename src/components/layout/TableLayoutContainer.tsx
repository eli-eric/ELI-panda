import React, { useEffect, useLayoutEffect, useState } from 'react'

import type { CatalogueCategoryResponse, CatalogueItemsResponse } from '@/types/responses'

interface Props {
  children: React.ReactNode
  catalogueItems?: CatalogueItemsResponse
  categoryList?: Array<CatalogueCategoryResponse>
}

// useLayoutEffect is used to avoid flickering
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export const TableLayoutContainer = ({ children, catalogueItems, categoryList }: Props) => {
  const [height, setHeight] = useState<number>(0)

  useIsomorphicLayoutEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const searchBar = document.getElementById('search-bar')?.clientHeight || 0
      const navHeader = document.getElementById('nav-bar')?.clientHeight || 0
      const emptyResults = document.getElementById('empty-results')?.clientHeight || 0

      const categoryList = document.getElementById('category-list')?.clientHeight || 0
      const catalogueBreadcrump = document.getElementById('breadcrump')?.clientHeight || 0
      const cataloguePaging = document.getElementById('paging')?.clientHeight || 0
      const height = searchBar + categoryList + cataloguePaging + catalogueBreadcrump + navHeader - emptyResults

      // REVIEW LAYOUT HEIGHT +1  // TODO
      setHeight(height + 1)
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [catalogueItems, categoryList])

  return (
    <div
      style={{
        height: `calc(100vh - ${height}px)`
      }}
      className="flex-col"
    >
      {children}
    </div>
  )
}
