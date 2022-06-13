import React from 'react'

export const catalogPagesConfigs = [
  {
    path: '/catalog/catalog-list',
    component: React.lazy(() => import('./catalog-list/CatalogList.cont'))
  },
  {
    path: '/catalog/catalog-list/edit/:id',
    component: React.lazy(() => import('./catalog-list/edit'))
  },
  {
    path: '/catalog/catalog-list/edit',
    component: React.lazy(() => import('./catalog-list/edit'))
  },
  {
    path: '/catalog/catalog-category',
    component: React.lazy(() => import('./catalog-category'))
  }
]
