import type { CodebookType } from '@/hooks/fetch/useCodebook'

export type UserCreateFormType = {
  email: string
  facility: CodebookType
  firstName: string
  isEnabled: boolean
  lastName: string
  password: string
  employee: CodebookType
  confirmPassword: string
  roles: CodebookType[]
}

export type UserUpdateFormType = {
  email: string
  facility: CodebookType
  firstName: string
  isEnabled: boolean
  employee?: CodebookType
  lastName: string
  password?: string
  confirmPassword?: string
}
