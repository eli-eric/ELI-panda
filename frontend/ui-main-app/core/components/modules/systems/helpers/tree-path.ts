import { SystemTreeItem } from 'core/types/responses'

// dynamic recursion for find slug path in tree navigation
export const getTreePath = (tree: Array<SystemTreeItem> | undefined, systemCode: string | undefined) => {
  if (!tree) return
  const copiedTree = JSON.parse(JSON.stringify(tree))

  let path: string[] = []
  const searchTree = (treeObj: Array<SystemTreeItem> | undefined, systemCode: string | undefined) => {
    let results: SystemTreeItem | undefined = undefined
    if (!treeObj) return undefined
    for (let i = 0; i < treeObj.length; i++) {
      path.push(treeObj[i].systemCode)
      treeObj[i].open = true
      if (treeObj[i].systemCode == systemCode) {
        results = treeObj[i]
        return results
      } else if (treeObj[i].children) {
        results = searchTree(treeObj[i].children, systemCode)
        if (results) return results
      }
      path.pop()
      treeObj[i].open = false
    }
    return results
  }
  const systemItem = searchTree(copiedTree, systemCode)
  console.log(copiedTree)

  return { path: path, systemItem, copiedTree }
}
