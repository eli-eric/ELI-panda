export type SystemDetailResponse = {
  uid: string
  name: string
  systemCode?: string
  systemAlias?: string
  subSystems?: SystemDetailResponse[]
}

export type SystemsResponse = {
  data: SystemDetailResponse[]
  totalCount: number
}
