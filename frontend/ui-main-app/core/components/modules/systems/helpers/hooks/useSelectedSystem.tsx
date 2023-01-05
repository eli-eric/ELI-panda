import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getTreePath } from '../tree-path'

// useSelectedSystem hook for managing tree component a write correct url slug
export const useSelectedSystem = (selectedSystemName?: string, systemsList?: Array<SystemTreeItem>) => {
  const [selectedSystem, setSelectedSystem] = useState<SystemTreeItem>()
  const [openTree, setOpenTree] = useState<boolean>(false)
  const [searchSystemName, setSearchSystemName] = useState<string | undefined>(selectedSystemName)

  const router = useRouter()

  // use effect for set selected system with url redirect
  useEffect(() => {
    if (router.query.slug) {
      if (typeof router.query.slug === 'object') {
        const slugLength = router.query.slug.length
        if (slugLength > 0) {
          const lastSlug = router.query.slug[slugLength - 1]
          setSearchSystemName(lastSlug)
          setOpenTree(true)
        } else {
          setOpenTree(false)
        }
      }
    }
  }, [systemsList]) //eslint-disable-line

  // main useEffect for calling recursion for find correct tree element and setting correct url
  useEffect(() => {
    const pathItem = getTreePath(systemsList, selectedSystemName || searchSystemName)
    if (pathItem) {
      if (!router.query.slug) {
        router.push({
          pathname: router.pathname,
          query: { slug: pathItem.path }
        })
      }
      if (typeof router.query.slug === 'object') {
        router.push({
          pathname: router.pathname,
          query: { slug: pathItem.path }
        })
      }
      setSelectedSystem(pathItem.systemItem)
    }
  }, [systemsList, searchSystemName, selectedSystemName]) //eslint-disable-line

  return {
    selectedSystem: selectedSystem,
    openTree: openTree
  }
}
