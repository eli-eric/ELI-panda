import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { TextArea } from '@/components/form/inputs'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'

import { useCategory } from '../catalogue/hooks/useCategory'
import FileManager from '../shared/fileManager/FileManager'
import { ImageGalleryV2 } from '../shared/imageManager/v2'
import useCatalogueFormFields from './components/form/CatalogueForm.fields'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import { type CatalogueItemFormData, catalogueItemSchema } from './components/form/ItemForm.schema'
import { CatalogueOrders } from './components/orders/CatalogueOrders'
import { RelatedItemsContainer } from './components/related-items/RelatedItems.cont'
import { CatalogueStatisticsContainer } from './components/statistics/CatalogueStatistics.cont'
import { useCatalogueItem } from './hooks/useItem'
import { useItemSubmit } from './hooks/useItemSubmit'
import type { CatalogueItem } from './types/responses'

const MemoizedGalleryV2 = memo(ImageGalleryV2)

interface CatalogueItemContainerProps {
    uid?: string
    catalogueCategoryUid?: string
}

const CatalogueItemContainer = ({ uid, catalogueCategoryUid }: CatalogueItemContainerProps) => {
    const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])
    const { item } = useCatalogueItem()
    const fields = useCatalogueFormFields()
    const [saveAndExit, setSaveAndExit] = useState(false)

    const { catalogueCategory } = useCategory(catalogueCategoryUid)

    // Convert details array to object structure for form
    // Form expects: { [propertyUid]: detail }
    // API returns: [{ property: { uid, ... }, value, ... }]
    // useMemo ensures this recalculates when item changes
    const detailsObject = useMemo(() => {
        return (
            item?.details?.reduce(
                (acc, detail) => {
                    if (detail.property?.uid) {
                        acc[detail.property.uid] = detail
                    }
                    return acc
                },
                {} as Record<string, any>,
            ) || {}
        )
    }, [item])

    const formMethods = useForm<z.input<typeof catalogueItemSchema>, unknown, CatalogueItemFormData>({
        resolver: zodResolver(catalogueItemSchema),
        defaultValues: {
            ...item,
            details: detailsObject,
        },
    })
    const { reset, setValue } = formMethods
    const { submit, loading } = useItemSubmit({
        setvalue: setValue,
        saveAndExit,
        reset,
    })

    // Sync item data from React Query cache to form
    // This ensures form is updated when item changes (e.g., after save)
    useEffect(() => {
        if (item) {
            reset({
                ...item,
                details: detailsObject,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, detailsObject])

    // Sync catalogueCategory when creating new item from category page
    useEffect(() => {
        if (catalogueCategory) {
            reset({
                category: {
                    uid: catalogueCategory.uid,
                    name: catalogueCategory.name,
                },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogueCategory])

    const onSubmit = (catalogueItem: CatalogueItemFormData) => {
        // Convert details object with UID keys back to details array for API
        // Form structure: { [propertyUid]: detail }
        // API expects: [{ property, value, propertyGroup }]
        const details = catalogueItem.details ? Object.values(catalogueItem.details) : []

        const finalData = { ...catalogueItem, details }

        setSaveAndExit(false)
        submit(finalData as CatalogueItem)
    }
    const onSubmitAndExit = (catalogueItem: CatalogueItemFormData) => {
        // Convert details object with UID keys back to details array for API
        // Form structure: { [propertyUid]: detail }
        // API expects: [{ property, value, propertyGroup }]
        const details = catalogueItem.details ? Object.values(catalogueItem.details) : []

        const finalData = { ...catalogueItem, details }
        setSaveAndExit(true)
        submit(finalData as CatalogueItem)
    }

    return (
        <Form
            className="h-screen overflow-auto"
            formMethods={formMethods}
            enableLeaveWarning={true}
        >
            <HeaderWithButtons
                loading={loading}
                editRole={ROLE.CATALOGUE_EDIT}
                onSubmit={formMethods.handleSubmit(data => {
                    onSubmit(data)
                })}
                onSubmitAndExit={formMethods.handleSubmit(data => {
                    onSubmitAndExit(data)
                })}
            />
            <Card className="flex flex-col justify-between pb-5">
                <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
                    <MemoizedGalleryV2
                        itemType={FILE_TYPE.CATALOGUE}
                        itemId={uid}
                        hasEditRole={!disabledEdit}
                    />
                    <div className="col-span-2">
                        <DefaultItemForm />
                    </div>
                </div>
                <TextArea {...fields.description} className={'px-4 py-5 sm:px-6'} />
                <Groups />
                {uid && <RelatedItemsContainer />}
                {uid && <CatalogueOrders />}
                {uid && (
                    <CatalogueStatisticsContainer
                        catalogueItemUid={uid}
                        variant="page"
                        className="mt-6"
                    />
                )}
                {uid && (
                    <ErrorBoundary fallback={<ErrorPage />}>
                        <Suspense>
                            <FileManager
                                itemType={FILE_TYPE.CATALOGUE}
                                uid={uid}
                                hasEditRole={!disabledEdit}
                            />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </Card>
        </Form>
    )
}

export default CatalogueItemContainer
