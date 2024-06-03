import type { CodebookType } from '@/types/responses/codebook'

export type SystemFilterType = {
  name: string
  systemLevel: string[]
  systemCode: string
  systemAlias: string
  systemType: CodebookType | null
  zone: CodebookType | null
  location: CodebookType | null
  responsible: CodebookType | null
  description: string
  importance: CodebookType | null
  itemUsage: string[]
  eun: string
  serialNumber: string
  catalogueName: string
  catalogueNumber: string
  category: CodebookType | null
  catalogueDescription: string
  supplier: CodebookType | null
  price: [number | undefined, number | undefined]
  parentSystem: CodebookType | null
}
