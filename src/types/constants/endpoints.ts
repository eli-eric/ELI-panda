import { BASE_URL } from '@/types/constants/common'
export const ENDPOINTS = {
  catalogueCategories: '/catalogue/categories',
  catalogueCategoryImage: BASE_URL + '/catalogue/category',
  catalogueCategory: '/catalogue/category',
  catalogueItems: '/catalogue/items',
  catalogueItemImage: BASE_URL + '/catalogue/item',
  catalogueItem: '/catalogue/item',
  systemDetail: '/system',
  systemTree: '/systems/tree',
  systems: '/systems',
  systemsForRel: '/systems/for-relationship',
}

export enum AxiosMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type AxiosMethodTypes = keyof typeof AxiosMethodType
