import { CatalogueCategoryResponse, CatalogueItemResponse } from 'core/types/responses'
import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  catalogueItems?: CatalogueItemResponse
  categoryList?: Array<CatalogueCategoryResponse>
}

/*
TODO: potřeba odladit pro malé obrazovky kdy se kategorie vyskládají pod sebe
*/

const CatalogLayoutContainer = ({ children, catalogueItems, categoryList }: Props) => {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const searchBar = document.getElementById('lyaout-search-bar')?.clientHeight || 0
      const catalogueList = document.getElementById('catalogue-nav')?.clientHeight || 0
      const cataloguePaging = document.getElementById('catalogue-paging')?.clientHeight || 0
      const height = searchBar + catalogueList + cataloguePaging
      console.log(searchBar, catalogueList, cataloguePaging)
      console.log(height)

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
      className={` flex-col ${
        categoryList
          ? categoryList.length === 0
            ? `h-[calc(100vh-${height + 1}px)]`
            : catalogueItems
            ? `h-[calc(100vh-${height - 1}px)]`
            : ''
          : `h-[calc(100vh-${height - 1}px)]`
      }`}
    >
      {children}
    </div>
  )
}

export default CatalogLayoutContainer
