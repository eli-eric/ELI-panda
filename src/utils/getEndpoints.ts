import type { CODEBOOK } from '@/types/constants/codebook'

import { makeQuery } from './formatters'

export interface EndpointProps {
  uid?: string | null
  path?: string | null

  itemUid?: string | null
  query?: Record<string, string | number | boolean | null> | null
  codebook?: CODEBOOK | null | string
}

export const getEndpoints = ({
  uid = '',
  path = '',
  itemUid = '',
  query: q,
  codebook
}: EndpointProps) => {
  const query = q ? makeQuery(q) : ''
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item${uid ? '/' + uid : ''}`,
    catalogueItemStatistics: `/catalogue/item/${uid}/statistics`,
    catalogueItemsStatistics: `/catalogue/items/statistics`,
    catalogueItemImage: `/catalogue/item/${uid}/image`,
    catalogueCategoryEdit: `/catalogue/category${uid ? '/' + uid : ''}`,
    catalogueCategoryProperties: `/catalogue/category/${uid}/properties${query}`,
    cataloguePhysicalItemProperties: `/catalogue/category/${uid}/physical-item-properties`,
    catalogueOrders: `/catalogue/${uid}/orders`,
    system: `/system${uid ? '/' + uid : ''}`,
    systemCodeGenerate: `/system/systemCode${query}`,
    systemImage: `/system/${uid}/image`,
    catalogueCategoryCopy: `/catalogue/category/${uid}/copy`,
    systemDetail: `/system/${uid}`,
    systemItemAdd: `/system/${uid}/item`,
    systemsDetails: `/systems${uid ? '/' + uid : ''}`,
    systemRelationships: `/system/${uid}/relationships`,
    systemRelationship: `/system/relationship${uid ? '/' + uid : ''}`,
    systemsForRelationship: `/systems/for-relationship${query}`,
    systemSubsystemsForRelationship: `/system/${uid}/subsystems/for-relationship`,
    systemSubsystems: uid ? `/system/${uid}/subsystems` : null,
    systemsList: `/systems${query}`,
    systemCode: `/system/systemCode${query}`,
    orders: `/orders${query}`,
    ordersMinMaxPrice: `/orders/order-lines/min-max-prices`,
    order: `/order${uid ? '/' + uid : ''}`,
    orderLineDelivery: `/order/${uid}/orderline/${itemUid}/delivery`,
    orderLinesDeliverAll: `/order/${uid}/orderlines/delivery`,
    eunforPrint: `/orders/eun-for-print/${uid}${query}`,
    codebook: `/codebook/${path}${query}`,
    codebooks: `/codebooks${query}`,
    links: `/files/links/${uid}`,
    link: `/files/link/${uid}`,
    history: `/system/${uid}/history`,
    systemTypeGroupTypes: `/system/system-type-group/${uid}/system-types`,
    systemTypeGroups: `/system/system-type-groups`,
    codebookTree: `/codebook/${codebook}/tree${query}`,
    generalGraph: `/general/${uid}/graph`,
    recalculateSpareParts: '/systems/recalculate-spare-parts',
    systemsReload: '/systems/reload',
    physicalItemMove: `/physical-item/move`,
    physicalItemReplace: `/physical-item/replace`,
    systemFilesCopy: `/api/system/images/copy`,
    systemsMove: `/systems/move`,
    publication: `/publication${uid ? '/' + uid : ''}`,
    publications: `/publications${query}`,
    generateUUID: '/uuid/v4'
  }
  return endpoints
}
