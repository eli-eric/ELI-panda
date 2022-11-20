import React from 'react'
import { Redirect } from 'react-router-dom'
import { initialUrl } from '../../shared/constants/AppConst'

export const errorPagesConfigs = [
  {
    path: '/error-pages/error-401',
    component: React.lazy(() => import('./Error401'))
  },
  {
    path: '/error-pages/error-403',
    component: React.lazy(() => import('./Error403'))
  },
  {
    path: '/error-pages/error-404',
    component: React.lazy(() => import('./Error404'))
  },
  {
    path: '/error-pages/error-500',
    component: React.lazy(() => import('./Error500'))
  },
  {
    path: '/error-pages/error-503',
    component: React.lazy(() => import('./Error503'))
  },
  {
    path: '/error-pages/coming-soon',
    component: React.lazy(() => import('./ComingSoon'))
  },
  {
    path: '/error-pages/maintenance',
    component: React.lazy(() => import('./Maintenance'))
  },
  {
    path: '/',
    exact: true,
    component: () => {
      return <Redirect to={initialUrl} />
    }
  }
]
