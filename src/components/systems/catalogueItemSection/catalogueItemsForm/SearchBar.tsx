import { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import SearchBarComponent from '@/components/ui/SearchBar.comp'

interface Props {
  setItem: Dispatch<SetStateAction<{ name?: string; uid?: string }>>
  setSearchValue: Dispatch<SetStateAction<string | undefined>>
}
const SearchBar = ({ setItem, setSearchValue }: Props) => {
  const searchFormMethods = useForm()

  const onSearchSubmit = data => {
    setItem({ name: undefined, uid: undefined })
    setSearchValue(data.search)
  }
  return (
    <FormProvider {...searchFormMethods}>
      <SearchBarComponent onSubmit={onSearchSubmit} />
    </FormProvider>
  )
}

export default SearchBar
