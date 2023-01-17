import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'

// dynamic recursion for find slug path in tree navigation
export const useTreeUpdate = (tree: Array<SystemTreeItem> | undefined): Array<SystemTreeItem> | undefined => {
  const router = useRouter()
  if (!tree) return
  const copiedTree = JSON.parse(JSON.stringify(tree))

  const searchTree = (treeObj: Array<SystemTreeItem> | undefined, uid: string | undefined) => {
    let results
    if (!treeObj) return undefined
    for (let i = 0; i < treeObj.length; i++) {
      treeObj[i].open = true
      if (treeObj[i].uid == uid) {
        results = true
        return results
      } else if (treeObj[i].children) {
        results = searchTree(treeObj[i].children, uid)
        if (results) return results
      }
      treeObj[i].open = false
    }
    return results
  }
  if (typeof router.query.uid === 'string') {
    const systemItem = searchTree(copiedTree, router.query.uid)
  }

  return copiedTree
}
