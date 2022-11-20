import React from 'react'

export const authRouteConfig = [
  {
    path: '/signin',
    component: React.lazy(() => import('./Signin/Signin.cont'))
  }
]
