import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import { useCategory } from './useCategory'
import type { CategoryFormType } from '../components/categoryEditForm/types'

export const useCategoryDetail = (uid?: string) => {
  const { catalogueCategoryEdit } = useEndpoint({ uid })
  const { catalogueCategory } = useCategory()

  const { response } = useFetch<CategoryFormType>({
    url: uid ? catalogueCategoryEdit : null,
    format: data =>
      data?.groups && data.groups.length !== 0
        ? {
            ...data,
            groups: data.groups?.map(group => ({
              ...group,
              properties: group.properties.map(property => ({
                ...property,
                listOfValues: property.listOfValues?.map(value => ({
                  value: value
                }))
              }))
            })),
            physicalItemProperties: data.physicalItemProperties?.map(
              property => ({
                ...property,
                listOfValues: property.listOfValues?.map(value => ({
                  value: value
                }))
              })
            )
          }
        : { ...data },
    onError: () => {}
  })

  return { categoryDetail: response, parentCategory: catalogueCategory }
}
