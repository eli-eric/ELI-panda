import { createContext, useState } from 'react'

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
  const [cataloguePath, setCataloguePath] = useState('')

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
