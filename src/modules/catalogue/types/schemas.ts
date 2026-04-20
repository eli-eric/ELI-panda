import { z } from 'zod'

export const codebookRefSchema = z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string().optional().nullable(),
})

export const employeeRefSchema = z.object({
    uid: z.string(),
    fullName: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
})

const parentPathItemSchema = z.object({
    uid: z.string(),
    name: z.string(),
})

export const catalogueCategoryFlatSchema = z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string(),
    miniImageUrl: z.string().optional().nullable(),
    systemType: codebookRefSchema.optional().nullable(),
    parentCategory: z.object({ uid: z.string() }).optional().nullable(),
    itemCount: z.number().optional().nullable(),
})

export type CatalogueCategoryFlat = z.infer<typeof catalogueCategoryFlatSchema>

export interface CatalogueCategoryTreeNode extends CatalogueCategoryFlat {
    children: CatalogueCategoryTreeNode[]
}

export const catalogueCategoryTreeNodeSchema: z.ZodType<CatalogueCategoryTreeNode> = z.lazy(() =>
    catalogueCategoryFlatSchema.extend({
        children: z.array(catalogueCategoryTreeNodeSchema),
    }),
)

export const catalogueCategoriesFlatResponseSchema = z.array(catalogueCategoryFlatSchema)

export const catalogueItemMetadataSchema = z.object({
    createdAt: z.string().optional().nullable(),
    createdBy: employeeRefSchema.optional().nullable(),
    modifiedAt: z.string().optional().nullable(),
    modifiedBy: employeeRefSchema.optional().nullable(),
})

export const catalogueItemDetailSchema = z.object({
    uid: z.string(),
    name: z.string(),
    catalogueNumber: z.string(),
    description: z.string().optional().nullable(),
    manufacturerUrl: z.string().optional().nullable(),
    miniImageUrl: z.string().optional().nullable(),
    catalogueCategory: codebookRefSchema
        .extend({
            parentPath: z.array(parentPathItemSchema).optional().nullable(),
        })
        .optional()
        .nullable(),
    supplier: codebookRefSchema.optional().nullable(),
    physicalItemsCount: z.number().optional().nullable(),
    ordersCount: z.number().optional().nullable(),
    relatedItemsCount: z.number().optional().nullable(),
    metadata: catalogueItemMetadataSchema.optional().nullable(),
})

export type CatalogueItemDetail = z.infer<typeof catalogueItemDetailSchema>

export const catalogueCategoryPropertySchema = z.object({
    uid: z.string(),
    name: z.string(),
    type: codebookRefSchema.optional().nullable(),
    unit: codebookRefSchema.optional().nullable(),
    defaultValue: z.string().optional().nullable(),
    listOfValues: z.array(z.string()).optional().nullable(),
})

export type CatalogueCategoryProperty = z.infer<typeof catalogueCategoryPropertySchema>

export const catalogueCategoryPropertyGroupSchema = z.object({
    uid: z.string(),
    name: z.string(),
    properties: z.array(catalogueCategoryPropertySchema),
})

export type CatalogueCategoryPropertyGroup = z.infer<typeof catalogueCategoryPropertyGroupSchema>

export const catalogueCategoryDetailSchema = z.object({
    uid: z.string(),
    name: z.string(),
    code: z.string(),
    miniImageUrl: z.string().optional().nullable(),
    systemType: codebookRefSchema.optional().nullable(),
    parentPath: z.array(parentPathItemSchema).optional().nullable(),
    propertyGroups: z.array(catalogueCategoryPropertyGroupSchema).optional().nullable(),
    physicalItemProperties: z.array(catalogueCategoryPropertySchema).optional().nullable(),
    subCategoriesCount: z.number().optional().nullable(),
    itemsCount: z.number().optional().nullable(),
    metadata: catalogueItemMetadataSchema.optional().nullable(),
})

export type CatalogueCategoryDetail = z.infer<typeof catalogueCategoryDetailSchema>

export type CodebookRef = z.infer<typeof codebookRefSchema>
export type EmployeeRef = z.infer<typeof employeeRefSchema>
export type CatalogueItemMetadata = z.infer<typeof catalogueItemMetadataSchema>
