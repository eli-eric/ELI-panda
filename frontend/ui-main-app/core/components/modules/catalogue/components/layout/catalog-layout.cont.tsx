import { CatalogueCategoryResponse, CatalogueItemResponse } from 'core/types/responses'
import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  catalogueItems?: CatalogueItemResponse
  categoryList?: Array<CatalogueCategoryResponse>
}

const CatalogLayoutContainer = ({ children, catalogueItems, categoryList }: Props) => {
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const searchBar = document.getElementById('lyaout-search-bar')?.clientHeight || 0
      const catalogueBreadCrump = document.getElementById('catalogue-breadcrump')?.clientHeight || 0
      const catalogueList = document.getElementById('catalogue-list')?.clientHeight || 0
      const cataloguePaging = document.getElementById('catalogue-paging')?.clientHeight || 0
      const height = searchBar + catalogueBreadCrump + catalogueList + cataloguePaging

      setHeight(height)
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [catalogueItems, categoryList])

  return (
    <div className={`flex-col h-[calc(100vh-${height}px)]`}>{children}</div>
    /* <div
      className={` flex-col ${
        categoryList
          ? categoryList.length === 0
            ? `h-[calc(100vh-${176}px)]`
            : catalogueItems
            ? `h-[calc(100vh-${304}px)]`
            : ''
          : `h-[calc(100vh-${304}px)]`
      }`}
    >
      {children}
    </div> */
  )
}

export default CatalogLayoutContainer
