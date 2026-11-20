import { PATH } from '@/types/constants/paths'

/**
 * Builds a deep link to the system hierarchy explorer with the given system
 * opened in detail view. The `tab` param is omitted (defaults to detail) and
 * `parent` is resolved client-side by useHierarchyDeepLinkResolver.
 */
export const getSystemHierarchyDetailPath = (uid: string): string =>
    `${PATH.SYSTEMS_HIERARCHY}?leaf=${encodeURIComponent(uid)}`
