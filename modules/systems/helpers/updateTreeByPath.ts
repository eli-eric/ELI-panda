import { SystemTreeItem } from 'types/responses'

type UpdateFn = (arg0: SystemTreeItem) => SystemTreeItem

const openNode: UpdateFn = obj => ({ ...obj, open: true })

const updateByPath = (fn: UpdateFn) => (node: SystemTreeItem, path: SystemTreeItem['uid'][]) => {
  const [current, ...rest] = path
  const [target, others] = node?.children?.reduce(
    (acc, scope) => (scope.uid === current ? [scope, acc[1]] : [acc[0], [...acc[1], scope]]),
    [<SystemTreeItem>{}, <SystemTreeItem[]>[]]
  ) ?? [<SystemTreeItem>{}, []]
  const updated = fn(target)
  return {
    ...node,
    children: [...others, rest.length > 0 ? updateByPath(fn)(updated, rest) : updated]
  }
}

export default updateByPath

export const expandByPath = updateByPath(openNode)
