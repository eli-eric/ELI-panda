import { BASE_URL } from '@/types/constants/common'
export const ENDPOINTS = {
  catalogueCategories: '/catalogue/categories',
  catalogueCategory: BASE_URL + '/catalogue/category',
  catalogueItems: '/catalogue/items',
  catalogueItem: BASE_URL + '/catalogue/item',
  systemDetail: '/system',
  systemTree: '/systems/tree',
  systems: '/systems',
  systemsForRel: '/systems/for-relationship'
}

export enum AxiosMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export type AxiosMethodTypes = keyof typeof AxiosMethodType
