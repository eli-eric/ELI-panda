import { useMemo } from 'react'

const getEndpoints = (uid?: string, path?: string, itemUid?: string, query?: string) => {
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item${uid ? '/' + uid : ''}`,
    catalogueItemImage: `/catalogue/item/${uid}/image`,
    catalogueCategoryEdit: `/catalogue/category${uid ? '/' + uid : ''}`,
    catalogueCategoryProperties: `/catalogue/category/${uid}/properties`,
    system: `/system${uid ? '/' + uid : ''}`,
    systemImage: `/system/${uid}/image`,
    catalogueCategoryCopy: `/catalogue/category/${uid}/copy`,
    systemDetail: `/system/${uid}`,
    systemItemAdd: `/system/${uid}/item`,
    systemsDetails: `/systems${uid ? '/' + uid : ''}`,
    systemRelationships: `/system/${uid}/relationships`,
    systemRelationship: `/system/relationship${uid ? '/' + uid : ''}`,
    systemsForRelationship: `/systems/for-relationship${query}`,
    codebook: `/codebook/${path}${query}`,
    systemSubsystems: `/system/subsystems${uid ? '/' + uid : ''}`,
    systemsList: `/systems${query}`,
    systemCode: `/system/systemCode${query}`,
    orders: `/orders${query}`,
    order: `/order${uid ? '/' + uid : ''}`,
    orderLineDelivery: `/order/${uid}/orderline/${itemUid}/delivery`,
    eunforPrint: `/orders/eun-for-print/${uid}${query}`
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
  const queryString = '?' + new URLSearchParams(query as Record<string, string>).toString()
  return useMemo(() => getEndpoints(uid, path, itemUid, queryString), [uid, path, itemUid, queryString])
}
