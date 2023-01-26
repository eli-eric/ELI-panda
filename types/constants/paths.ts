export enum PATH {
  ROOT = '/',
  DASHBOARD = '/dashboard',
  CATALOGUE = '/catalogue',
  SYSTEMS = '/systems',
  SYSTEMS_OVERVIEW = '/systems/overview',

  REPORTS = '/reports'
}

export const PROTECTED_PATHS = [PATH.DASHBOARD, PATH.CATALOGUE, PATH.SYSTEMS, PATH.SYSTEMS_OVERVIEW]
