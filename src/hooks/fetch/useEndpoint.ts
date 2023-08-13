import { useMemo } from 'react'

const getEndpoints = (uid?: string, path?: string, itemUid?: string, query?: string) => {
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item${uid ? '/' + uid : ''}`,
    catalogueItemImage: `/catalogue/item/${uid}/image`,
    catalogueCategoryEdit: `/catalogue/category${uid ? '/' + uid : ''}`,
    catalogueCategoryProperties: `/catalogue/category/${uid}/properties${query}`,
    catalogueOrders: `/catalogue/${uid}/orders`,
    system: `/system${uid ? '/' + uid : ''}`,
    systemImage: `/system/${uid}/image`,
    catalogueCategoryCopy: `/catalogue/category/${uid}/copy`,
    systemDetail: `/system/${uid}`,
    systemItemAdd: `/system/${uid}/item`,
    systemsDetails: `/systems${uid ? '/' + uid : ''}`,
    systemRelationships: `/system/${uid}/relationships`,
    systemRelationship: `/system/relationship${uid ? '/' + uid : ''}`,
    systemsForRelationship: `/systems/for-relationship${query}`,
    systemSubsystemsForRelationship: `/system/${uid}/subsystems/for-relationship`,
    systemSubsystems: `/system/${uid}/subsystems`,
    codebook: `/codebook/${path}${query}`,
    systemsList: `/systems${query}`,
    systemCode: `/system/systemCode${query}`,
    orders: `/orders${query}`,
    order: `/order${uid ? '/' + uid : ''}`,
    orderLineDelivery: `/order/${uid}/orderline/${itemUid}/delivery`,
    eunforPrint: `/orders/eun-for-print/${uid}${query}`,
    codebooks: '/codebooks'
  }
  return endpoints
}
interface useEndpointsProps {
  uid?: string
  itemUid?: string
  query?: unknown
  path?: string
}
export const useEndpoint = ({ uid, query, path, itemUid }: useEndpointsProps = {}) => {
  const queryString = query ? '?' + new URLSearchParams(query as Record<string, string>).toString() : ''
  return useMemo(() => getEndpoints(uid, path, itemUid, queryString), [uid, path, itemUid, queryString])
}
