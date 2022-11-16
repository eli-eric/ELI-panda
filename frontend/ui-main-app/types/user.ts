import { ROLES } from './constants/roles'

export interface User {
  uid: string
  username: string
  email: string
  facility: string
  roles: Array<ROLES>
  apiAccessToken: string
}
