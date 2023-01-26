import { PATH } from './paths'

export enum Role {
  CATALOGUE_VIEW = 'catalogue-view',
  SYSTEMS_VIEW = 'systems-view',
  REPORTS_VIEW = 'reports-view',
  BASICS = 'basics'
}

export const ROLES_CONFIG: Record<Role, PATH> = {
  [Role.BASICS]: PATH.DASHBOARD,
  [Role.CATALOGUE_VIEW]: PATH.CATALOGUE,
  [Role.SYSTEMS_VIEW]: PATH.SYSTEMS,
  [Role.REPORTS_VIEW]: PATH.REPORTS
}
