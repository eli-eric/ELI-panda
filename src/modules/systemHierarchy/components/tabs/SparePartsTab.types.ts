import type { SystemDetailFragment } from '@/types/gql/graphql'

export type SparePartEdge = SystemDetailFragment['sparePartsConnection']['edges'][number]
