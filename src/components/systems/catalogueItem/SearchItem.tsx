import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import SearchBarComponent from '@/components/ui/SearchBar.comp'

const SearchItem = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [selectedSystem, setItem] = useState<{
    name: string
    uid: string
  }>()
  const searchFormMethods = useForm()

  const onSearchSubmit = data => {
    setItem(undefined)
    setSearchValue(data.search)
    console.log(data)
  }
  return (
    <FormProvider {...searchFormMethods}>
      <SearchBarComponent onSubmit={onSearchSubmit} />
    </FormProvider>
  )
}

export default SearchItem
