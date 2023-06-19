import type { FieldValues } from 'react-hook-form'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

export interface SystemDetailFormType extends FieldValues {
  name: string
  parentUID?: string // @TODO
  description?: string
  systemType?: CodebookType
  systemCode?: string
  systemAlias?: string
  location?: CodebookType
  itemUID?: string // @TODO
  owner?: CodebookType
  importance?: CodebookType
  zone?: CodebookType
}
