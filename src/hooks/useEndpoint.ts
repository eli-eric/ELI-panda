import { BASE_URL } from '@/types/constants/common'

const getEndpoints = (uid?: string, path?: string, query?: string) => {
  const endpoints = {
    catalogueCategories: BASE_URL + `/catalogue/categories${path}`,
    catalogueCategoryImage: BASE_URL + `/catalogue/category/${uid}/image`,
    catalogueItems: BASE_URL + `/catalogue/items${query}`,
    catalogueItem: BASE_URL + `/catalogue/item/${uid}`,
    systemDetail: BASE_URL + `/system/${uid}`,
    systemTree: BASE_URL + '/systems/tree',
    systems: BASE_URL + '/systems',
    systemRelationship: BASE_URL + `/system/${uid}/relationship`,
    systemsForRel: BASE_URL + `/systems/for-relationship${query}`
  }
  return endpoints
}
interface useEndpointsProps {
  uid?: string
  query?: Object
  path?: string
}
export const useEndpoints = ({ uid, query, path }: useEndpointsProps) => {
  const queryString = '?' + new URLSearchParams(query as Record<string, string>).toString()
  return getEndpoints(uid, path, queryString)
}
