import { PATHS } from 'types/constants/paths'
import { ROLES } from 'types/constants/roles'
export const ROLES_CONFIG: Record<ROLES, PATHS> = {
  [ROLES.BASICS]: PATHS.DASHBOARD,
  [ROLES.CATALOGUE_VIEW]: PATHS.CATALOGUE,
  [ROLES.SYSTEMS_VIEW]: PATHS.SYSTEMS,
  [ROLES.REPORTS_VIEW]: PATHS.REPORTS
}
