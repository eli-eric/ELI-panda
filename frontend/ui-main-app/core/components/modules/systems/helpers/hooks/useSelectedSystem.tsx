import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getTreePath } from '../tree-path'

export const useSelectedSystem = (selectedSystemName?: string, systemsList?: Array<SystemTreeItem>) => {
  const [selectedSystem, setSelectedSystem] = useState<SystemTreeItem>()
  const [openTree, setOpenTree] = useState<boolean>()
  const [searchSystemName, setSearchSystemName] = useState<string | undefined>(selectedSystemName)

  const router = useRouter()

  useEffect(() => {
    if (router.query.slug) {
      if (typeof router.query.slug === 'object') {
        const slugLength = router.query.slug.length
        console.log(router.query.slug.length)
        if (slugLength > 0) {
          const lastSlug = router.query.slug[slugLength - 1]
          console.log('useEffectSlug', lastSlug)
          setSearchSystemName(lastSlug)
          setOpenTree(true)
        } else {
          setOpenTree(false)
        }
      }
    }
  }, [systemsList]) //eslint-disable-line

  useEffect(() => {
    console.log(systemsList, searchSystemName, selectedSystemName)

    const pathItem = getTreePath(systemsList, searchSystemName || selectedSystemName)

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

  useEffect(() => {}, [selectedSystemName])

  return {
    selectedSystem: selectedSystem,
    openTree: openTree
  }
}
