import { useState, useEffect } from 'react'
import moment from 'moment'
import { useLocation, useHistory } from 'react-router-dom'
import { GridSortModel } from '@mui/x-data-grid-pro'
import CatalogComponent from './CatalogList.comp'
import { CatalogItem } from 'types/models/Common'

const CatalogContainer = () => {
  const { search } = useLocation()
  const location = useLocation()
  const navigation = useHistory()
  const mom = moment()
  mom.locale(moment.locales()['en-US'])

  let defaultParams = new URLSearchParams(search)
  let defaultPageNumberP = defaultParams.get('pageNumber')
  let defaultPageSizeP = defaultParams.get('pageSize')
  let defaultFilterP = defaultParams.get('filter')
  let defaultPageNumber: number = defaultPageNumberP ? parseInt(defaultPageNumberP) : 0
  let defaultPageSize: number = defaultPageSizeP ? parseInt(defaultPageSizeP) : 20
  let defaultFilter: string = defaultFilterP ? defaultFilterP : ''

  const [totalCount, setTotalCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(defaultPageNumber)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchPattern, setSearchPattern] = useState<string | undefined | null>(defaultFilter)

  const [rowsData, setRowsData] = useState<CatalogItem[]>([])
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [oneTimeRemove, setOneTimeRemove] = useState(true)

  useEffect(() => {
    let active = true

    // (async () => {
    //   setLoading(true);
    //   let orderByName = resolveOrderBy("Name", sortModel);
    //   const newRows = await jwtAxios.get(
    //     `/catalog-items/?pageSize=${pageSize}&pageNumber=${pageNumber}&orderByName=${orderByName}&searchPattern=${searchPattern}`
    //   );

    //   if (!active) {
    //     return;
    //   }
    //   setRowsData(newRows.data.Data);
    //   setTotalCount(newRows.data.TotalCount);
    //   setLoading(false);
    // })();

    return () => {
      active = false
    }
  }, [pageNumber, pageSize, sortModel, searchPattern])

  const resolveOrderBy = (fieldName: string, sortModel: GridSortModel): string => {
    let result = '0' //default no sorting

    if (sortModel && sortModel.length > 0) {
      sortModel.forEach(f => {
        if (f.field === fieldName) result = f.sort === 'asc' ? '1' : f.sort === 'desc' ? '2' : '0'
      })
    }

    return result
  }

  const setUrlParams = (name: string, value: string | null | undefined) => {
    setTimeout(() => {
      let params = new URLSearchParams(search)
      //eslint-disable-next-line
      if (value != null && value != '') params.set(name, value)
      else params.delete(name)
      navigation.push({ pathname: location.pathname, search: params.toString() })
    }, 1)
  }

  const handleSearchChange = (searchText?: string | null) => {
    setSearchPattern(searchText)
    setUrlParams('filter', searchText)
  }

  const addNewCatalogItem = () => {
    navigation.push({
      pathname: '/catalog/catalog-list/edit'
    })
  }

  const editCatalogItem = (id: any) => {
    navigation.push({
      pathname: '/catalog/catalog-list/edit/' + id.toString()
    })
  }

  const deleteCatalogItem = (id: any) => {}

  return (
    <CatalogComponent
      addNewCatalogItem={addNewCatalogItem}
      handleSearchChange={handleSearchChange}
      defaultFilter={defaultFilter}
      editCatalogItem={editCatalogItem}
      deleteCatalogItem={deleteCatalogItem}
      setPageNumber={setPageNumber}
      setUrlParams={setUrlParams}
      setPageSize={setPageSize}
      isLoading={loading}
      rowsData={rowsData}
      setSortModel={setSortModel}
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalCount={totalCount}
      sortModel={sortModel}
    />
  )
}

export default CatalogContainer
