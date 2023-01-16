import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getTreePath } from '../tree-path'

// useSelectedSystem hook for managing tree component a write correct url slug
export const useSelectedSystem = (selectedSystemCode?: string, systemsList?: Array<SystemTreeItem>) => {
  const [selectedSystem, setSelectedSystem] = useState<SystemTreeItem>()
  const [copiedTree, setCopiedTree] = useState<Array<SystemTreeItem>>()
  const [searchSystemName, setSearchSystemName] = useState<string | undefined>(selectedSystemCode)

  const router = useRouter()

  // use effect for set selected system with url redirect
  useEffect(() => {
    if (router.query.slug) {
      if (typeof router.query.slug === 'object') {
        const slugLength = router.query.slug.length
        if (slugLength > 0) {
          const lastSlug = router.query.slug[slugLength - 1]
          setSearchSystemName(lastSlug)
        } else {
        }
      }
    }
  }, [systemsList]) //eslint-disable-line

  useEffect(() => {
    if (!router.query.slug) {
      setSelectedSystem(undefined)
    }
  }, [router])

  // main useEffect for calling recursion for find correct tree element and setting correct url
  useEffect(() => {
    const pathItem = getTreePath(systemsList, selectedSystemCode || searchSystemName)
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
      setCopiedTree(pathItem.copiedTree)
    }
  }, [systemsList, searchSystemName, selectedSystemCode]) //eslint-disable-line

  return {
    selectedSystem: selectedSystem,
    copiedTree: copiedTree
  }
}
