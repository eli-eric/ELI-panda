import type { CodebookType } from '@/hooks/fetch/useCodebook'

export type UserCreateFormType = {
  email: string
  facility: CodebookType
  firstName: string
  isEnabled: boolean
  lastName: string
  password: string
  employee?: CodebookType | null
  confirmPassword: string
  roles: CodebookType[]
}

export type UserUpdateFormType = {
  email: string
  facility: CodebookType
  firstName: string
  isEnabled: boolean
  employee?: CodebookType | null
  lastName: string
  password?: string
  confirmPassword?: string
}
