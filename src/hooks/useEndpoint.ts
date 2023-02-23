import { BASE_URL } from './../types/constants/common'
const getEndpoints = (uid?: string, path?: string, query?: string) => {
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item/${uid}`,
    catalogueItemImage: BASE_URL + `/catalogue/item/${uid}/image`,
    catalogueCategoryEdit: `/catalogue/category${uid ? '/' + uid : ''}`,
    systemDetail: `/system/${uid}`,
    systemTree: '/systems/tree',
    systems: '/systems',
    systemRelationships: `/system/${uid}/relationships`,
    systemRelationship: '/system/relationship',
    systemsForRelationship: `/systems/for-relationship${query}`,
  }
  return endpoints
}
interface useEndpointsProps {
  uid?: string
  query?: Object
  path?: string
}
export const useEndpoint = ({ uid, query, path }: useEndpointsProps) => {
  const queryString =
    '?' + new URLSearchParams(query as Record<string, string>).toString()
  return getEndpoints(uid, path, queryString)
}
