import { FormProvider, useForm } from 'react-hook-form'

import SearchBarComponent from '@/components/ui/SearchBar.comp'

const SearchItem = ({ setItemUid, setSearchValue }) => {
  const searchFormMethods = useForm()

  const onSearchSubmit = data => {
    setItemUid(undefined)
    setSearchValue(data.search)
  }
  return (
    <FormProvider {...searchFormMethods}>
      <SearchBarComponent onSubmit={onSearchSubmit} />
    </FormProvider>
  )
}

export default SearchItem
