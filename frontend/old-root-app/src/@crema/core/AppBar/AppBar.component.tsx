import { AppBar, Button, Divider, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import AppSearchBar from '@crema/core/AppSearchBar'
import Typography from '@mui/material/Typography'

import React from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  onSearch: () => void
  onClick: () => void
  defaultFilter: string
  title: string
  buttonLabel: string
}

const AppBarComponent = ({ onSearch, onClick, defaultFilter, title, buttonLabel }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button variant="contained" color="primary" onClick={onClick}>
            <FormattedMessage id={buttonLabel} />
          </Button>

          <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 4, mr: 4 }} />

          <AppSearchBar
            iconPosition="right"
            startSearchMode="onChange"
            placeholder="Search auto after 600ms"
            searchInitValue={defaultFilter}
            onSearch={onSearch}
          />

          <AppSearchBar
            iconPosition="right"
            startSearchMode="onEnter"
            placeholder="Search after you hit ENTER"
            searchInitValue={defaultFilter}
            onSearch={onSearch}
          />

          <Box sx={{ flexGrow: 1 }} />
          <Typography
            color="GrayText"
            variant="h1"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '10px' }}
          >
            <FormattedMessage id={title} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarComponent
