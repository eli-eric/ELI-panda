import { BASE_URL } from './common'
export const ENDPOINTS = {
  catalogueCategories: BASE_URL + '/catalogue/categories',
  catalogueCategory: BASE_URL + '/catalogue/category',
  catalogueItems: BASE_URL + '/catalogue/items',
  catalogueItem: BASE_URL + '/catalogue/item',
  systemDetail: BASE_URL + '/system',
  systemTree: BASE_URL + '/systems/tree',
}

export enum AxiosMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type AxiosMethodTypes = keyof typeof AxiosMethodType
