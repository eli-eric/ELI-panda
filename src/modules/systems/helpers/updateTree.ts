import { SystemTreeItem } from 'src/types/responses'

//  recursion for set open param for tree view
export const updateTree = (tree: Array<SystemTreeItem> | undefined, uid: string): Array<SystemTreeItem> | undefined => {
  if (!tree || !uid) return undefined
  const duplicateTree = (tree, uid) => {
    const copiedTree = [...tree]
    let results
    const recAddOpen = (uid: string) => (obj: SystemTreeItem) => {
      obj.open = true
      if (obj.uid === uid) {
        results = true
        return results
      }
      if (obj.children) {
        results = obj.children.find(recAddOpen(uid))
        if (results) return results
      }
      obj.open = false
    }
    tree.find(recAddOpen(uid))
    return copiedTree
  }
  const duplicatedTree = duplicateTree(tree, uid)
  return duplicatedTree
}
