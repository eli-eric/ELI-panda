import { CatalogueCategoryResponse, CatalogueItemsResponse } from 'core/types/responses'
import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  catalogueItems?: CatalogueItemsResponse
  categoryList?: Array<CatalogueCategoryResponse>
}

const CatalogLayoutContainer = ({ children, catalogueItems, categoryList }: Props) => {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const searchBar = document.getElementById('layout-search-bar')?.clientHeight || 0
      const catalogueList = document.getElementById('catalogue-nav')?.clientHeight || 0
      const cataloguePaging = document.getElementById('catalogue-paging')?.clientHeight || 0
      const height = searchBar + catalogueList + cataloguePaging

      setHeight(height)
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [catalogueItems, categoryList]) // Empty array ensures that effect is only run on mount

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

export default CatalogLayoutContainer
