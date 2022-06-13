import React from 'react'
import { Box } from '@mui/material'
import EliLogo from '../../../../../assets/icon/eli-logo-small.png'

interface AppLogoProps {
  color?: string
  height?: number
}

const AppLogo = ({ color, height = 50 }: AppLogoProps) => {
  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 45 }
        }
      }}
      className="app-logo"
    >
      {/* <Logo fill={theme.palette.primary.main} /> */}
      <Box
        sx={{
          mt: 1,
          '& svg': {
            height: { xs: 25, sm: 30 }
          }
        }}
      >
        {/* <LogoText fill={alpha(theme.palette.text.primary, 0.8)} /> */}

        <img src={EliLogo} alt="Logo" style={{ height: height }} />
      </Box>
    </Box>
  )
}

export default AppLogo
