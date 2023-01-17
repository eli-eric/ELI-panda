import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//  recursion for set open param for tree view
export const useTreeUpdate = (tree: Array<SystemTreeItem> | undefined): Array<SystemTreeItem> | undefined => {
  const [copiedTree, setCopiedTree] = useState<Array<SystemTreeItem>>()
  const router = useRouter()

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

  useEffect(() => {
    if (tree) {
      const duplicatedTree = duplicateTree(tree, router.query.uid)
      setCopiedTree(duplicatedTree)
    }
  }, [tree])

  return copiedTree
}
