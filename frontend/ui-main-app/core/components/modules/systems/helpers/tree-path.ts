import { SystemTreeItem } from 'core/types/responses'

// dynamic recursion for find slug path in tree navigation
export const getTreePath = (tree: Array<SystemTreeItem> | undefined, matchItem: SystemTreeItem) => {
  let path: string[] = []
  const searchTree = (tree: Array<SystemTreeItem> | undefined, matchItem: SystemTreeItem) => {
    let results: { path: string[]; match: string } | undefined = undefined
    if (!tree) return undefined
    for (let i = 0; i < tree.length; i++) {
      path.push(tree[i].name)
      if (tree[i].uid === matchItem.uid) {
        results = { path, match: tree[i].name }
        return results
      } else if (tree[i].children) {
        results = searchTree(tree[i].children, matchItem)
        if (results) return results
      }
      path.pop()
    }
    return results
  }
  searchTree(tree, matchItem)
  return path
}
