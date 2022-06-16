import React from 'react'
import Box from '@mui/material/Box'
import AuthWrapper from '../AuthWrapper'
import AppLogo from '@crema/core/AppLayout/components/AppLogo'
import SigninComponent from './Signin.comp'

const SigninContainer = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AppLogo />
          </Box>
        </Box>

        <SigninComponent />
      </Box>
    </AuthWrapper>
  )
}

export default SigninContainer
