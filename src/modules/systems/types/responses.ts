import type { CodebookType } from '@/hooks/fetch/useCodebook'

export type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

export type SystemDetail = {
  uid: string // from router
  name: string // input
  description?: string // textarea
  location?: CodebookType // combobox - CODEBOOK.LOCATION
  zone?: CodebookType // combobox
  systemType?: CodebookType // ListBox
  systemCode?: string // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias?: string // input
  owner?: CodebookType // combobox - CODEBOOK.EMPLOYEE
  importance?: CodebookType // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  hasSubsystems: boolean
  subSystems?: SystemDetail[]
}

export type SystemListResponse = {
  data: SystemDetailResponse[]
  totalCount: number
}
