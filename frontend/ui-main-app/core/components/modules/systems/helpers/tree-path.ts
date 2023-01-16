import { SystemTreeItem } from 'core/types/responses'

// dynamic recursion for find slug path in tree navigation
export const getTreePath = (tree: Array<SystemTreeItem> | undefined, systemCode: string | undefined) => {
  let path: string[] = []
  const searchTree = (tree: Array<SystemTreeItem> | undefined, systemCode: string | undefined) => {
    let results: SystemTreeItem | undefined = undefined
    if (!tree) return undefined
    for (let i = 0; i < tree.length; i++) {
      path.push(tree[i].systemCode)
      if (tree[i].systemCode == systemCode) {
        results = tree[i]
        return results
      } else if (tree[i].children) {
        results = searchTree(tree[i].children, systemCode)
        if (results) return results
      }
      path.pop()
    }
    return results
  }
  const systemItem = searchTree(tree, systemCode)
  return { path: path, systemItem }
}
