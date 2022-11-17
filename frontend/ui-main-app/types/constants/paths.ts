export enum PATHS {
  ROOT = '/',
  AUTH = '/auth',
  DASHBOARD = '/dashboard',
  CATALOGUE = '/catalogue',
  SYSTEMS = '/systems',
  REPORTS = '/reports'
}
export const RESTRICTED_PATHS = [PATHS.DASHBOARD, PATHS.CATALOGUE, PATHS.REPORTS, PATHS.SYSTEMS]
