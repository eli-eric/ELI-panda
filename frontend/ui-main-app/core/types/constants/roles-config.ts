import { PATHS } from './paths'
import { ROLES } from './roles'

/* The rights matrix for each page according to the user's role must be maintained 1:1 with beckend */

export const ROLES_CONFIG: Record<ROLES, PATHS> = {
  [ROLES.BASICS]: PATHS.DASHBOARD,
  [ROLES.CATALOGUE_VIEW]: PATHS.CATALOGUE,
  [ROLES.SYSTEMS_VIEW]: PATHS.SYSTEMS,
  [ROLES.REPORTS_VIEW]: PATHS.REPORTS
}
