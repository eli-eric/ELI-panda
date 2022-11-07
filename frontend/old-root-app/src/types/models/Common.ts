export interface Common {
  error: string
  loading: boolean
  isAppDrawerOpen: boolean
  updatingContent: boolean
  message: string
}

export type CatalogItem = {
  id: number
  Name: string
  Category: string
  Manufacturer: string
  Availability: string
  Facility: string
  EstimatedPrice: string
  Note: string
  TypicalAvailableInDays: number
  SupportedToDate: string
}
