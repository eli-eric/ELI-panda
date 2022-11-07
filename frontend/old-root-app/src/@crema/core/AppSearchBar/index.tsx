import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { SearchIconBox, SearchIconWrapper, SearchInputBase, SearchWrapper, ClearIconWrapper } from './index.style'
import { SxProps } from '@mui/system/styleFunctionSx'
import { Theme } from '@mui/material'

interface AppSearchProps {
  iconPosition?: string
  align?: string
  placeholder?: string
  overlap?: boolean
  borderLight?: boolean
  className?: string
  onlyIcon?: boolean
  disableFocus?: boolean
  startSearchMode?: string //onCahnge, onEnter
  iconStyle?: SxProps<Theme>
  searchInitValue?: string
  onSearch?: (searchText?: string | null) => void
  sx?: SxProps<Theme>

  [x: string]: any
}

const AppSearch: React.FC<AppSearchProps> = ({
  placeholder,
  onSearch,
  startSearchMode = 'onEnter',
  searchInitValue,
  iconPosition = 'left',
  align = 'left',
  overlap = true,
  onlyIcon = false,
  disableFocus,
  iconStyle = {
    color: 'grey'
  },
  sx,
  ...rest
}) => {
  let searchTimer: any = undefined
  let firstInit = false
  const inputEl = useRef<HTMLInputElement>(null)

  const handleChangeInput = () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      fireSearch()
    }, 600)
  }

  const fireSearch = () => {
    if (inputEl && inputEl.current) if (onSearch) onSearch(inputEl.current.value)
  }

  const clearSearchtext = () => {
    if (inputEl && inputEl.current) inputEl.current.value = ''
    setTimeout(() => {
      if (onSearch) onSearch('')
    }, 10)
  }

  useEffect(() => {
    if (inputEl && inputEl.current && !firstInit) {
      firstInit = true
      inputEl.current.value = searchInitValue ? searchInitValue : ''
    }
  }, [])

  return (
    <SearchWrapper sx={sx} iconPosition={iconPosition}>
      <SearchIconBox
        align={align}
        className={clsx(
          'searchRoot',
          { 'hs-search': overlap },
          { 'hs-disableFocus': disableFocus },
          { searchIconBox: onlyIcon }
        )}
      >
        <ClearIconWrapper
          className={clsx({
            right: iconPosition === 'right'
          })}
          sx={{ color: 'silver' }}
        >
          <div onClick={clearSearchtext} style={{ cursor: 'pointer' }}>
            <ClearIcon />
          </div>
        </ClearIconWrapper>
        <SearchIconWrapper
          className={clsx({
            right: iconPosition === 'right'
          })}
          sx={iconStyle}
        >
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputBase
          {...rest}
          onChange={e => {
            if (startSearchMode === 'onChange') {
              handleChangeInput()
            }
          }}
          onKeyDown={e => {
            if (startSearchMode === 'onEnter') {
              if (e.key === 'Enter') fireSearch()
            }
          }}
          inputRef={inputEl}
          onFocus={event => {
            event.target.select()
          }}
          placeholder={placeholder || 'Search…'}
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchIconBox>
    </SearchWrapper>
  )
}

export default AppSearch
