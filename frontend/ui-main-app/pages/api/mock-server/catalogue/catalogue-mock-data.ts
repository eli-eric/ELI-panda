import items_with_details from './data/items-all-props.json'
import categories from './data/categories.json'

export interface CategoryResponse {
    uid: string;
    name: string;
    code: string;
    parentPath: string;
}

export interface CatalogueItemDetail {
    propertyName: string;
    propertyGroup: string;
    value: string | null;
    unit: string | null;
}
export interface CatalogueItemResponse {
    uid: string;
    name: string;
    description: string;
    categoryPath: string;
    categoryName: string;
    manufacturer: string;
    manufacturerUrl: string;
    manufacturerNumber: string;
    details?: CatalogueItemDetail[];
}

export interface CatalogueItemPagingResponse {
    totalCount: number;
    data: CatalogueItemResponse[]
}

export const CatalogueItems: Array<CatalogueItemResponse> = items_with_details;

export const CatalogueCategories: Array<CategoryResponse> = categories

