import type { CategoryFormType } from '../components/categoryEdit/types'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'
import { useMemo } from 'react'

export const useCategoryDetail = (uid?: string) => {
  const { data, isLoading } = useQuery<CategoryFormType>({
    queryKey: ['categoryDetail', { uid }],
    queryFn: queryFetcher('catalogueCategoryEdit')
  })

  const categoryDetail = useMemo(() => {
    return data?.groups && data.groups.length !== 0
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
      : { ...data }
  }, [data])

  return { categoryDetail, isLoading }
}
