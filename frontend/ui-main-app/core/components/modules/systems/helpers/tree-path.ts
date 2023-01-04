import { SystemTreeItem } from 'core/types/responses'

// dynamic recursion for find slug path in tree navigation
export const getTreePath = (tree: Array<SystemTreeItem> | undefined, systemName: string | undefined) => {
  let path: string[] = []
  const searchTree = (tree: Array<SystemTreeItem> | undefined, systemName: string | undefined) => {
    let results: SystemTreeItem | undefined = undefined
    if (!tree) return undefined
    for (let i = 0; i < tree.length; i++) {
      path.push(tree[i].name)
      if (tree[i].name == systemName) {
        results = tree[i]
        return results
      } else if (tree[i].children) {
        results = searchTree(tree[i].children, systemName)
        if (results) return results
      }
      path.pop()
    }
    return results
  }
  const systemItem = searchTree(tree, systemName)
  return { path: path, systemItem }
}
