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
  const sanitizedQueryObj = q
    ? Object.fromEntries(
        Object.entries(q).filter(
          ([, v]) => v !== null && v !== undefined && v !== ''
        )
      )
    : null
  const query = sanitizedQueryObj ? makeQuery(sanitizedQueryObj) : ''
  const uidPart = uid ? '/' + uid : ''
  const endpoints = {
    catalogueCategories: `/catalogue/categories${path}`,
    catalogueCategoryImage: `/catalogue/category/${uid}/image`,
    catalogueItems: `/catalogue/items${query}`,
    catalogueItem: `/catalogue/item${uidPart}`,
    catalogueItemStatistics: `/catalogue/item/${uid}/statistics`,
    catalogueItemsStatistics: `/catalogue/items/statistics`,
    catalogueItemImage: `/catalogue/item/${uid}/image`,
    catalogueCategoryEdit: `/catalogue/category${uidPart}`,
    catalogueCategoryProperties: `/catalogue/category/${uid}/properties${query}`,
    cataloguePhysicalItemProperties: `/catalogue/category/${uid}/physical-item-properties`,
    catalogueOrders: `/catalogue/${uid}/orders`,
    globalSearch: `/global-search${query}`,
    system: `/system${uidPart}`,
    systemCodeGenerate: `/system/systemCode${query}`,
    systemImage: `/system/${uid}/image`,
    catalogueCategoryCopy: `/catalogue/category/${uid}/copy`,
    systemDetail: `/system/${uid}`,
    systemItemAdd: `/system/${uid}/item`,
    systemsDetails: `/systems${uidPart}`,
    systemRelationships: `/system/${uid}/relationships`,
    systemRelationship: `/system/relationship${uidPart}`,
    systemsForRelationship: `/systems/for-relationship${query}`,
    systemSubsystemsForRelationship: `/system/${uid}/subsystems/for-relationship`,
    systemSubsystems: uid ? `/system/${uid}/subsystems` : null,
    systemsList: `/systems${query}`,
    systemCode: `/system/systemCode${query}`,
    orders: `/orders${query}`,
    ordersMinMaxPrice: `/orders/order-lines/min-max-prices`,
    order: `/order${uidPart}`,
    orderLineDelivery: `/order/${uid}/orderline/${itemUid}/delivery`,
    orderLinesDeliverAll: `/order/${uid}/orderlines/delivery`,
    serviceLineDelivery: `/order/${uid}/serviceline/${itemUid}/delivery`,
    serviceLinesDeliverAll: `/order/${uid}/servicelines/delivery`,
    eunforPrint: `/orders/eun-for-print/${uid}${query}`,
    codebook: `/codebook/${path}${query}`,
    codebooks: `/codebooks${query}`,
    links: `/files/links/${uid}`,
    link: `/files/link/${uid}`,
    history: `/system/${uid}/history`,
    systemTypeGroupTypes: `/system/system-type-group/${uid}/system-types`,
    systemTypeGroups: `/system/system-type-groups`,
    systemTypeGroupsTree: `/system/system-type-groups/tree${query}`,
    codebookTree: `/codebook/${codebook}/tree${query}`,
    generalGraph: `/general/${uid}/graph`,
    recalculateSpareParts: '/systems/recalculate-spare-parts',
    systemsReload: '/systems/reload',
    physicalItemMove: `/physical-item/move`,
    physicalItemReplace: `/physical-item/replace`,
    systemFilesCopy: `/api/system/images/copy`,
    systemsMove: `/systems/move`,
    publication: `/publication${uidPart}`,
    publications: `/publications${query}`,
    researcher: `/researcher${uidPart}`,
    researchers: `/researchers${query}`,
    grant: `/grant${uidPart}`,
    grants: `/grants${query}`,
    generateUUID: '/uuid/v4',
    serviceType: `/catalogue/service/type${uidPart}`,
    serviceTypeList: `/catalogue/service/types${query}`,
    sparePartUse: `/system/${uid}/assign-spare`,
    catalogueNumberUniqueCheck: `/catalogue/item/catalogue-number/unique${query}`,
    systemCodes: `/systems/system-codes${query}`,
    systemCodesCreate: `/systems/system-codes`,
    systemCodesPreview: `/systems/system-codes/preview${query}`
  }
  return endpoints
}
