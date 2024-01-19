import type { FieldValues } from 'react-hook-form'

export interface RelationFormType extends FieldValues {
  systemFromUid: string
  relationTypeCode: string
  systemToUid: string
}
