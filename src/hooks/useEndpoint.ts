const getEndpoints = (uid?: string, path?: string, query?: string) => {
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item/${uid}`,
    systemDetail: `/system/${uid}`,
    systemTree: '/systems/tree',
    systems: '/systems',
    systemRelationship: `/system/${uid}/relationship`,
    systemsForRel: `/systems/for-relationship${query}`
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
