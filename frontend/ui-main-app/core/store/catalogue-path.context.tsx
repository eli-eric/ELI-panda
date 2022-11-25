import { createContext, useEffect, useState } from 'react'

/*
context for store path for fetching catalogue items
 */
interface CataloguePathContext {
  cataloguePath: string
  setCataloguePath: (_path: string) => void
}

const CataloguePathContext = createContext({
  cataloguePath: '',
  setCataloguePath: _path => {}
} as CataloguePathContext)

interface Props {
  children: React.ReactNode
}

export const CataloguePathContextProvider = ({ children }: Props) => {
  const [cataloguePath, setCataloguePath] = useState<string>('')

  useEffect(() => {}, [cataloguePath, setCataloguePath])

  const setCataloguePathHandler = (cataloguePath: string) => {
    setCataloguePath(cataloguePath)
  }

  const context = {
    cataloguePath: cataloguePath,
    setCataloguePath: setCataloguePathHandler
  }

  return <CataloguePathContext.Provider value={context}>{children}</CataloguePathContext.Provider>
}
export default CataloguePathContext
