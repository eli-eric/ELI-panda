import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { Location } from '@/types/gql/graphql'

export const updateLocationWithSublocation = (locations: Codebooktree[], subLocations: Location[], uid) =>
  locations.map(location => {
    if (location.uid === uid) {
      return {
        ...location,
        children: subLocations.map(subLocation => ({
          name: subLocation.name,
          code: subLocation.code,
          uid: subLocation.uid,
          isExpandable: subLocation.subLocations.length > 0
        }))
      }
    }
    if (location.children) {
      return {
        ...location,
        children: updateLocationWithSublocation(location.children, subLocations, uid)
      }
    }
    return location
  })
