export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PANDA_API_GW_URL
    : 'http://localhost:5001/api/mock-server'

export const ENDPOINTS = {
  categoryList: '/catalogue/categories',
  catalogueCategory: '/catalogue/category/'
}
