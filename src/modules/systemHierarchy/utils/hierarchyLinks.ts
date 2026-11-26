import { PATH } from '@/types/constants/paths'

/**
 * Builds a deep link to the Systems Explorer with the given system
 * opened in detail view. The `tab` param is omitted (the user's last tab is used) and
 * `parent` is resolved client-side by useHierarchyDeepLinkResolver.
 */
export const getSystemHierarchyDetailPath = (uid: string): string =>
    `${PATH.SYSTEMS_EXPLORER}?leaf=${encodeURIComponent(uid)}`
